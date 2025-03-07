"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import moment from "moment-jalaali";
import { Spinner } from "react-bootstrap";
import Button from "./Button";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Modal from "./Modal"; // Create this component

const CACHE_DURATION = 10 * 60 * 1000;
const CACHE_KEY = "coinCache";
const PAGINATION_CACHE_KEY = "coinPaginationCache";
const IMAGE_PER_PAGE = 40;
const LOAD_MORE_THRESHOLD = 4;

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  last_updated: string;
}

// Cache functions for first page data
const getCachedData = (): Coin[] | null => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp < CACHE_DURATION) return data;
  localStorage.removeItem(CACHE_KEY);
  return null;
};

const setCachedData = (data: Coin[]) => {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ data, timestamp: Date.now() })
  );
};

// Cache functions for pagination data
const getCachedPaginationData = (page: number): Coin[] | null => {
  const cached = localStorage.getItem(`${PAGINATION_CACHE_KEY}_${page}`);
  if (!cached) return null;
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp < CACHE_DURATION) return data;
  localStorage.removeItem(`${PAGINATION_CACHE_KEY}_${page}`);
  return null;
};

const setCachedPaginationData = (page: number, data: Coin[]) => {
  localStorage.setItem(
    `${PAGINATION_CACHE_KEY}_${page}`,
    JSON.stringify({ data, timestamp: Date.now() })
  );
};

const Currencies = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const pathname = usePathname();

  // Check URL for coin symbol on initial load and when URL changes
  useEffect(() => {
    const urlParts = pathname?.split("/") || [];
    const coinSymbol = urlParts[urlParts.length - 1];

    // If we have a coin symbol in the URL and it's not the base path
    if (coinSymbol && coinSymbol !== "currencies") {
      // Find the coin with this symbol
      const matchedCoin = coins.find(
        (c) => c.symbol.toLowerCase() === coinSymbol.toLowerCase()
      );
      if (matchedCoin) {
        setSelectedCoin(matchedCoin);
      }
    } else if (selectedCoin && pathname === "/currencies") {
      // If we're back at the base path, close the modal
      setSelectedCoin(null);
    }
  }, [pathname, coins]);

  const openModal = (coin: Coin) => {
    setSelectedCoin(coin);
    window.history.pushState({}, "", `/currencies/${coin.symbol}`);
  };

  const closeModal = () => {
    setSelectedCoin(null);
    window.history.pushState({}, "", "/currencies");
  };

  // Handle back/forward browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const urlParts = window.location.pathname.split("/");
      const coinSymbol = urlParts[urlParts.length - 1];

      if (coinSymbol && coinSymbol !== "currencies") {
        const matchedCoin = coins.find(
          (c) => c.symbol.toLowerCase() === coinSymbol.toLowerCase()
        );
        if (matchedCoin) {
          setSelectedCoin(matchedCoin);
        }
      } else {
        setSelectedCoin(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [coins]);

  // In-memory cache for API responses
  const apiCache = useRef<Record<string, { data: Coin[]; timestamp: number }>>(
    {}
  );

  // Pending requests tracker to prevent duplicate requests
  const pendingRequests = useRef<Record<string, Promise<Coin[]>>>({});

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || showLoadMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, showLoadMore]
  );

  const fetchFreshData = async (pageNum: number): Promise<Coin[]> => {
    setIsLoading(true);
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${IMAGE_PER_PAGE}&page=${pageNum}`;
    if (url in pendingRequests.current) {
      const result = await pendingRequests.current[url];
      setIsLoading(false);
      return result;
    }
    try {
      if (
        apiCache.current[url] &&
        Date.now() - apiCache.current[url].timestamp < CACHE_DURATION
      ) {
        setIsLoading(false);
        return apiCache.current[url].data;
      }

      pendingRequests.current[url] = fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (pageNum === 1) {
            setCachedData(data);
          } else {
            setCachedPaginationData(pageNum, data);
          }
          apiCache.current[url] = { data, timestamp: Date.now() };

          return data;
        })
        .finally(() => {
          delete pendingRequests.current[url];
        });

      return await pendingRequests.current[url];
    } catch (error) {
      console.error("Error fetching coins:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  const fetchCoins = useCallback(async (pageNum: number): Promise<Coin[]> => {
    if (pageNum === 1) {
      const cachedData = getCachedData();
      if (cachedData) {
        const cacheInfo = localStorage.getItem(CACHE_KEY);
        if (cacheInfo) {
          const { timestamp } = JSON.parse(cacheInfo);
          if (Date.now() - timestamp > CACHE_DURATION * 0.8) {
            fetchFreshData(pageNum).then((newData) => {
              setCachedData(newData);
              setCoins((prev) => {
                const existingIds = new Set(prev.map((coin) => coin.id));
                const filteredNewCoins = newData.filter(
                  (coin) => !existingIds.has(coin.id)
                );

                if (filteredNewCoins.length > 0) {
                  return [
                    ...prev.slice(0, (pageNum - 1) * IMAGE_PER_PAGE),
                    ...newData,
                  ];
                }
                return prev;
              });
            });
          }
        }
        return cachedData;
      }
    } else {
      const cachedPageData = getCachedPaginationData(pageNum);
      if (cachedPageData) {
        return cachedPageData;
      }
    }
    return fetchFreshData(pageNum);
  }, []);

  useEffect(() => {
    fetchCoins(page).then((newCoins) => {
      setCoins((prev) => {
        const existingIds = new Set(prev.map((coin) => coin.id));
        const filteredNewCoins = newCoins.filter(
          (coin) => !existingIds.has(coin.id)
        );
        return [...prev, ...filteredNewCoins];
      });

      setHasMore(newCoins.length === IMAGE_PER_PAGE);

      if (page === LOAD_MORE_THRESHOLD && newCoins.length === IMAGE_PER_PAGE) {
        setShowLoadMore(true);
      }
    });
  }, [page, fetchCoins]);

  const handleLoadMore = () => {
    setShowLoadMore(false);
    setPage((prev) => prev + 1);
  };

  function toShamsiDate(isoDate: string) {
    return moment(isoDate).format("jYYYY/jMM/jDD");
  }
  const memoizedCoinsList = useMemo(() => {
    return coins.map((coin, index) => {
      const isLastElement = coins.length === index + 1;
      return (
        <div
          key={`${coin.id}-${index}`}
          ref={isLastElement ? lastElementRef : null}
          className="fs-7 py-2 d-grid align-items-center pe-3 ps-5 py-4 text-charcoal-blue"
          style={{
            gridTemplateColumns: "71px 1fr 150px 215px",
            cursor: "pointer",
          }}
          onClick={() => openModal(coin)}
        >
          <span className="fw-bold text-steel-gray">{index + 1}</span>
          <span className="fw-semibold d-flex align-items-center gap-2">
            <Image
              src={coin.image}
              alt={coin.name}
              width={32}
              height={32}
              className="rounded-circle"
            />
            {coin.name}{" "}
            <span className="text-steel-gray kos">{coin.symbol.toUpperCase()}</span>
          </span>
          <span className="fw-semibold text-center">
            {coin.current_price.toLocaleString()}
          </span>
          <span className="fw-semibold text-end">
            {toShamsiDate(coin.last_updated)}
          </span>
        </div>
      );
    });
  }, [coins, lastElementRef]);

  return (
    <div
      style={{ height: "650px" }}
      className="overflow-y-auto no-scroll d-flex flex-column"
    >
      {memoizedCoinsList}
      {selectedCoin && <Modal coin={selectedCoin} onClose={closeModal} />}
      <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center py-4">
        {isLoading && <Spinner className="m-auto" />}
        {showLoadMore && !isLoading && (
          <Button className="px-10" onClick={handleLoadMore}>
            Show More
          </Button>
        )}
      </div>
    </div>
  );
};

export default Currencies;
