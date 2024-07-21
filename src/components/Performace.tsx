import React from "react";
import styles from "@/styles/Performance.module.css";
import { IoMdArrowDropup } from "react-icons/io";

type PerformaceProps = {
  lowName: string;
  highName: string;
  lowvalue: number;
  highvalue: number;
  currentValue: number;
};
const Performace = ({
  lowName,
  highName,
  lowvalue,
  highvalue,
  currentValue,
}: PerformaceProps) => {
  const percentage = ((currentValue - lowvalue) / (highvalue - lowvalue)) * 100;

  return (
    <div className={styles.priceLimitContainer}>
      <div className={styles.priceLimit}>
        <p className={styles.priceLabel}>{lowName}</p>
        <p className={styles.pricePoint}>${lowvalue}</p>
      </div>
      <div className={styles.priceIndicator}>
        <div className={styles.indicatorBar}></div>
        <div className={styles.currentPrice} style={{ left: `${percentage}%` }}>
          <IoMdArrowDropup />
        </div>
      </div>
      <div className={styles.priceLimit}>
        <p className={styles.priceLabel}>{highName}</p>
        <p className={styles.pricePoint}>${highvalue}</p>
      </div>
    </div>
  );
};

export default Performace;
