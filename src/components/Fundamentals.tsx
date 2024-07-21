import React from "react";
import styles from "@/styles/Fundamentals.module.css";

type FundamentalsProps = {
  marketCap: number;
  fullyDilutedValuation: number;
  tradingVolume24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
};

const Fundamentals = ({
  marketCap,
  fullyDilutedValuation,
  tradingVolume24h,
  circulatingSupply,
  totalSupply,
  maxSupply,
}: FundamentalsProps) => {
  return (
    <div className={styles.fundamentals}>
      <h2 className={styles.title}>Fundamentals</h2>
      <div className={styles.grid}>
        <div className={styles.item}>
          <span className={styles.label}>Market Cap</span>
          <span className={styles.value}>${marketCap.toLocaleString()}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Fully Diluted Valuation</span>
          <span className={styles.value}>
            ${fullyDilutedValuation.toLocaleString()}
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>24 Hour Trading Vol</span>
          <span className={styles.value}>
            ${tradingVolume24h.toLocaleString()}
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Circulating Supply</span>
          <span className={styles.value}>
            {circulatingSupply.toLocaleString()}
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Total Supply</span>
          <span className={styles.value}>{totalSupply.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Fundamentals;
