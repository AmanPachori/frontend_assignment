import React from "react";
import styles from "@/styles/Pagination.module.css";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination}>
      <ul className={styles.pageList}>
        <li className={styles.pageItem}>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.pageLink}
          >
            Prev
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`${styles.pageItem} ${
              currentPage === number ? styles.active : ""
            }`}
          >
            <button
              onClick={() => onPageChange(number)}
              className={styles.pageLink}
            >
              {number}
            </button>
          </li>
        ))}

        <li className={styles.pageItem}>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.pageLink}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
