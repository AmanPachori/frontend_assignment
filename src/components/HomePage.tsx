import React from "react";
import CryptoTable from "@/components/CryptoTable";
import CryptoGraph from "@/components/CryptoGraph";
import styles from "@/styles/Homepage.module.css";
import { Droppable } from "@hello-pangea/dnd";
import { cryptoInfo } from "@/types/CoinInfo";
import { Graph } from "@/types/Coin";
import { cryptoHeader, wishlistHeader } from "@/constants/headers";

type HomePageProps = {
  trending: cryptoInfo[];
  wishlist: cryptoInfo[];
  graph: Graph[];
};

const HomePage = ({ trending, wishlist, graph }: HomePageProps) => {
  return (
    <Droppable droppableId="page">
      {(provided, snapshot) => (
        <div
          className={styles.container}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className={styles.leftColumn}>
            <div className={styles.graph}>
              <CryptoGraph price={graph} />
            </div>
            <div className={styles.table}>
              <Droppable droppableId="trending">
                {(provided, snapshot) => (
                  <div
                    className={`${styles.table} ${
                      snapshot.isDraggingOver ? "dragactive" : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <CryptoTable
                      data={trending}
                      headers={cryptoHeader}
                      tablename="Trending"
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.table}>
              <Droppable droppableId="wishlist">
                {(provided, snapshot) => (
                  <div
                    className={`${styles.table} ${
                      snapshot.isDraggingOver ? "dragactive" : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <CryptoTable
                      data={wishlist}
                      headers={wishlistHeader}
                      tablename="Wishlist"
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default HomePage;
