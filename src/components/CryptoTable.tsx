import React, { useState } from "react";
import styles from "@/styles/CryptoTable.module.css";
import { LuArrowDownSquare, LuArrowUpSquare } from "react-icons/lu";
import Image from "next/image";
import { cryptoInfo } from "@/types/CoinInfo";
import { Draggable } from "@hello-pangea/dnd";
import { useRouter } from "next/router";

type CryptoTableProps = {
  data: cryptoInfo[];
  headers: string[];
  tablename: string;
  explore?: boolean;
  startindex?: number;
};

const CryptoTable: React.FC<CryptoTableProps> = ({
  data,
  headers,
  tablename,
  explore = false,
  startindex,
}) => {
  const formatMarketCap = (marketCap: number) => {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  };

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableheader}>
        {explore ? (
          <div className={styles.tabs}></div>
        ) : (
          <>
            <h1>{tablename}</h1>
            <p
              onClick={() => {
                handleClick("/explore");
              }}
            >
              View More Coins{" "}
            </p>
          </>
        )}
      </div>
      <table className={styles.table} aria-label="Crypto table">
        <thead className={styles.header}>
          <tr>
            {headers?.map((res, index) => (
              <th className={`${styles.headerCell}`} key={index}>
                {res}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((crypto: cryptoInfo, index: number) => (
            <Draggable
              key={crypto.id}
              draggableId={crypto?.id.toString().concat(tablename)}
              index={index + (startindex ? (startindex - 1) * 15 : 0)}
            >
              {(provided, snapshot) => (
                <tr
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  className={`${styles.row} ${
                    snapshot.isDragging ? styles.drag : ""
                  }`}
                  onClick={() => {
                    handleClick(`/coins/${crypto.id}`);
                  }}
                >
                  {headers.includes("Token") && (
                    <td className={styles.token}>
                      <Image
                        src={crypto.image}
                        width={16}
                        height={16}
                        alt="Picture of the author"
                      />
                      <span>{crypto.name}</span>
                    </td>
                  )}
                  {headers.includes("Symbol") && (
                    <td className={styles.symbol}>{crypto.symbol}</td>
                  )}

                  {headers.includes("Price") && (
                    <td
                      className={styles.price}
                    >{`$${crypto.current_price.toLocaleString()}`}</td>
                  )}
                  {headers.includes("24H Change") && (
                    <td className={styles.cell}>
                      {crypto.price_change_percentage_24h > 0 ? (
                        <span
                          style={{
                            color: "green",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <LuArrowUpSquare />{" "}
                          {crypto.price_change_percentage_24h}%
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "red",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <LuArrowDownSquare />{" "}
                          {crypto.price_change_percentage_24h}%
                        </span>
                      )}
                    </td>
                  )}
                  {headers.includes("Market Cap") && (
                    <td className={styles.cell}>
                      {formatMarketCap(crypto.market_cap)}
                    </td>
                  )}
                  {headers.includes("24H High") && (
                    <td className={styles.highlow}>{crypto.high_24h}</td>
                  )}
                  {headers.includes("24H Low") && (
                    <td className={styles.highlow}>{crypto.low_24h}</td>
                  )}
                </tr>
              )}
            </Draggable>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
