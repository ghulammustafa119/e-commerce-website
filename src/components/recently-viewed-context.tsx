"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface RecentlyViewedItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  discountPercent: number;
}

interface RecentlyViewedContextType {
  recentlyViewed: RecentlyViewedItem[];
  addToRecentlyViewed: (item: RecentlyViewedItem) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const MAX_ITEMS = 10;

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("recently_viewed");
    if (saved) {
      setRecentlyViewed(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("recently_viewed", JSON.stringify(recentlyViewed));
    }
  }, [recentlyViewed, loaded]);

  const addToRecentlyViewed = (item: RecentlyViewedItem) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      return [item, ...filtered].slice(0, MAX_ITEMS);
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider");
  }
  return context;
}
