"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import moment from "moment-jalaali";
import { Spinner } from "react-bootstrap";
import Button from "./Button";
import Image from "next/image";

const CACHE_DURATION = 60 * 1000; // 1 minute
const CACHE_KEY = "coinCache";
const IMAGE_PER_PAGE = 40;
const LOAD_MORE_THRESHOLD = 4; // Show button after 4 pages

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

const Currencies = () => {
  const delay = (ms: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const [coins, setCoins] = useState<Coin[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

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

  const fetchCoins = useCallback(async (pageNum: number): Promise<Coin[]> => {
    const cachedData = getCachedData();
    if (cachedData && pageNum === 1) return cachedData;

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=${IMAGE_PER_PAGE}&page=${pageNum}`,
        { cache: "no-store" }
      );
      const newCoins: Coin[] = await res.json();
      await delay(3000);
      if (pageNum === 1) setCachedData(newCoins);
      return newCoins;
    } catch (error) {
      console.error("Error fetching coins:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
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

      // Show load more button after 4 pages
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

  return (
    <div
      style={{ height: "650px" }}
      className="overflow-y-auto no-scroll d-flex flex-column"
    >
      {coins.map((coin, index) => {
        const isLastElement = coins.length === index + 1;
        return (
          <div
            key={`${coin.id}-${index}`}
            ref={isLastElement ? lastElementRef : null}
            className="fs-7 py-2 d-grid align-items-center pe-3 ps-5 py-4 text-charcoal-blue"
            style={{
              gridTemplateColumns: "71px 1fr 150px 215px",
            }}
          >
            <span className="fw-bold text-steel-gray">{index + 1}</span>
            <span className="fw-semibold d-flex align-items-center gap-2">
              <Image
                src={coin.image}
                alt={coin.name}
                width={32}
                height={32}
                style={{ borderRadius: "50%" }}
              />
              {coin.name}{" "}
              <span className="text-steel-gray">
                {coin.symbol.toUpperCase()}
              </span>
            </span>
            <span className="fw-semibold text-center">
              {coin.current_price.toLocaleString()}
            </span>
            <span className="fw-semibold text-end">
              {toShamsiDate(coin.last_updated)}
            </span>
          </div>
        );
      })}

      <div className="w-100 h-100 d-flex flex-column  align-items-center justify-content-center py-4">
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
