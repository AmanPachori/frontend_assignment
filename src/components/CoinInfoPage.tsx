import React from "react";
import styles from "@/styles/CoinInfoPage.module.css";
import Performance from "./Performace";
import parse from "html-react-parser";
import { CoinInfo, Graph } from "@/types/Coin";
import Image from "next/image";
import CryptoGraph from "./CryptoGraph";
import Fundamentals from "./Fundamentals";

type CoinInfoPageProps = {
  cryptoInfo: CoinInfo;
  graphData: Graph;
  activeRange: string;
  changeActiveRange?: (val: string) => void;
};

const CoinInfoPage = ({
  cryptoInfo,
  graphData,
  activeRange,
  changeActiveRange,
}: CoinInfoPageProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <div className={styles.header}>
          <Image
            src={cryptoInfo?.image.small}
            width={30}
            height={30}
            alt={cryptoInfo.name}
          />
          <div className={styles.coin_info}>
            <p className={styles.coin_name}>{cryptoInfo.name}</p>
            <div className={styles.price_container}>
              <h3 className={styles.current_price}>
                ${cryptoInfo.market_data.current_price.usd.toLocaleString()}
              </h3>
              <p
                className={`${styles.price_change} ${
                  cryptoInfo.market_data.price_change_percentage_24h >= 0
                    ? styles.positive
                    : styles.negative
                }`}
              >
                {cryptoInfo.market_data.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p className={styles.price_change_amount}>
                {cryptoInfo.market_data.price_change_24h}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.graph}>
            <CryptoGraph
              price={graphData}
              activeRange={activeRange}
              changeActiveRange={changeActiveRange}
            />
          </div>
          <div>
            <div className={styles.title}>Performance</div>
            <Performance
              lowName={"24h Low"}
              highName={"24h High"}
              lowvalue={cryptoInfo.market_data.low_24h.usd}
              highvalue={cryptoInfo.market_data.high_24h.usd}
              currentValue={cryptoInfo.market_data.current_price.usd}
            />
          </div>

          <div>
            <p className={styles.title}>About Company</p>
            <span>{parse(cryptoInfo.description.en)}</span>
          </div>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <Fundamentals
          marketCap={cryptoInfo.market_data.market_cap.usd}
          fullyDilutedValuation={
            cryptoInfo.market_data.fully_diluted_valuation.usd
          }
          tradingVolume24h={cryptoInfo.market_data.total_volume.usd}
          circulatingSupply={cryptoInfo.market_data.circulating_supply}
          totalSupply={cryptoInfo.market_data.total_supply}
          maxSupply={cryptoInfo.market_data.max_supply}
        />
      </div>
    </div>
  );
};

export default CoinInfoPage;
