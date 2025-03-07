"use client"; 
import React, { useState, useEffect, useRef, useCallback } from "react";
import moment from "moment-jalaali";
import Image from "next/image";

const CACHE_DURATION = 60 * 1000;

const Currencies = () => {
  const [coins, setCoins] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const cacheRef = useRef<{ data: any[]; timestamp: number } | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const fetchCoins = useCallback(async (pageNum: number) => {
    // Check cache first
    if (
      cacheRef.current &&
      Date.now() - cacheRef.current.timestamp < CACHE_DURATION
    ) {
      return cacheRef.current.data;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=${pageNum}`,
        { cache: "no-store" } // Disable browser caching
      );
      const newCoins = await res.json();

      // Update cache
      cacheRef.current = {
        data: newCoins,
        timestamp: Date.now(),
      };

      return newCoins;
    } catch (error) {
      console.error("Error fetching coins:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch and page load
  useEffect(() => {
    fetchCoins(page).then((newCoins) => {
      setCoins((prev) => [...prev, ...newCoins]);
      setHasMore(newCoins.length === 20); // Assuming 80 is the per_page limit
    });
  }, [page, fetchCoins]);

  // Refresh cache every minute
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      cacheRef.current = null; // Clear cache
      setPage(1); // Reset to first page
      setCoins([]); // Clear current coins
    }, CACHE_DURATION);

    return () => clearInterval(refreshInterval);
  }, []);

  function toShamsiDate(isoDate: string) {
    return moment(isoDate).format("jYYYY/jMM/jDD");
  }

  return (
    <div style={{ maxHeight: "650px" }} className="overflow-y-auto no-scroll">
      {coins.map((coin: any, index: number) => {
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
      {isLoading && <div className="text-center py-4">Loading...</div>}
    </div>
  );
};

export default Currencies;
