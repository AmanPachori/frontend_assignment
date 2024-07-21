import React, { useState } from "react";
import CryptoTable from "@/components/CryptoTable";
import styles from "@/styles/ExplorePage.module.css";
import { cryptoInfo } from "@/types/CoinInfo";
import { Droppable } from "@hello-pangea/dnd";
import Pagination from "./Pagination";
import { cryptoHeader, wishlistHeader } from "@/constants/headers";

type ExplorePageProps = {
  explore: cryptoInfo[];
  wishlist: cryptoInfo[];
};

const ExplorePage = ({ explore, wishlist }: ExplorePageProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 15;

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return explore.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(explore.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Droppable droppableId="page">
      {(provided, snapshot) => (
        <div
          className={`${styles.container} scroll-container`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className={styles.leftColumn}>
            <Droppable droppableId="explore">
              {(provided, snapshot) => (
                <div
                  className={`${styles.table} ${
                    snapshot.isDraggingOver ? "dragactive" : ""
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <CryptoTable
                    tablename="explore"
                    data={getPaginatedData()}
                    headers={cryptoHeader}
                    explore
                    startindex={currentPage}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {explore.length > 15 ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            ) : (
              <></>
            )}
          </div>
          <div className={styles.rightColumn}>
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
      )}
    </Droppable>
  );
};

export default ExplorePage;
