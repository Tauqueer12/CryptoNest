import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function usePortfolio() {
  const [coins, setCoins] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchPortfolio() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          if (!cancelled) setLoading(false);
          return;
        }

        const res = await fetch(
          "https://cryptonest-api.onrender.com/api/user/portfolio",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const json = await res.json();
        const stocks = json.data.stocks;

        let enriched = stocks;

        if (stocks.length > 0) {
          const ids = stocks.map((s) => s.stockId).join(",");
          const { data: marketData } = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${ids}`
          );

          const marketMap = new Map(marketData.map((m) => [m.id, m]));

          enriched = stocks.map((stock) => {
            const market = marketMap.get(stock.stockId);
            return {
              ...stock,
              imagesmall: market?.image?.replace("/large/", "/small/") || "",
              current_market_price: market?.current_price || 0,
            };
          });
        }

        if (!cancelled) {
          setCoins(enriched);
          setBalance(Math.round(json.data.credits));
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          toast.error("Something went wrong");
          setLoading(false);
        }
      }
    }

    fetchPortfolio();
    return () => {
      cancelled = true;
    };
  }, []);

  return { coins, balance, loading };
}