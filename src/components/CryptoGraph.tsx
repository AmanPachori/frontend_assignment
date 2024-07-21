import { CChartLine } from "@coreui/react-chartjs";
import styles from "@/styles/CryptoGraph.module.css";
import { useEffect, useMemo, useState } from "react";
import { timeConversion } from "@/utils/timeCoversion";
import { Graph } from "@/types/Coin";
import CryptoGraphRangeSelector from "./CryptoGraphRangeSelector";
const range = ["1", "30", "60"];

type CryptoGraphPageProps = {
  price: any;
  activeRange?: string;
  changeActiveRange?: (val: string) => void;
};

const CryptoGraph = ({
  price,
  activeRange,
  changeActiveRange,
}: CryptoGraphPageProps) => {
  const xAxes = useMemo(() => {
    let temp = price
      ?.map((val: { date: number }) => timeConversion(val.date, activeRange))
      .slice(0, 30);
    return temp;
  }, [activeRange]);

  const yAxes = useMemo(() => {
    let temp = price?.map((val: { high: any }) => val.high);

    return temp;
  }, [activeRange]);

  return (
    <div className={styles.container}>
      <div className={styles.chartContainer}>
        <CChartLine
          className={styles.chart}
          typeof="line"
          data={{
            labels: xAxes,
            datasets: [
              {
                label: "Stock Prices (High)",
                backgroundColor: "rgba(220, 220, 220, 0.2)",
                borderColor: "rgba(220, 220, 220, 1)",
                pointBackgroundColor: "rgba(220, 220, 220, 1)",
                pointBorderColor: "#fff",
                data: [...(yAxes ?? [])],
              },
            ],
          }}
        />
      </div>
      {activeRange && (
        <div className={styles.rangeSelector}>
          <CryptoGraphRangeSelector
            activeRange={activeRange}
            range={range}
            onChange={changeActiveRange}
          />
        </div>
      )}
    </div>
  );
};

export default CryptoGraph;
