import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import styles from "@/styles/PriceStateIndicator.module.css";
type PriceStateIndicatorProps = {
  change?: number;
  increase?: boolean;
  price?: number;
};

const PriceStateIndicator = ({
  change,
  increase,
  price,
}: PriceStateIndicatorProps) => {
  return (
    <div className={styles.container}>
      <p>$ {price}</p>
      {increase === true ? (
        <div className={styles.increasePrice}>
          <span>+{change}</span>
          <FaArrowAltCircleUp />
        </div>
      ) : (
        <div className={styles.decreasePrice}>
          <span>{change}</span>
          <FaArrowAltCircleDown />
        </div>
      )}
    </div>
  );
};

export default PriceStateIndicator;
