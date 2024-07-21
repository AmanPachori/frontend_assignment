import styles from "@/styles/CryptoGraphRangeSelector.module.css";

type CryptoGraphRangeSelectorProps = {
  onChange?: (val: string) => void;
  range: string[];
  activeRange?: string;
};

const CryptoGraphRangeSelector = ({
  onChange,
  range,
  activeRange,
}: CryptoGraphRangeSelectorProps) => {
  return (
    <div className={styles.container}>
      {range.length > 0 &&
        range.map((val, index) => (
          <button
            className={
              activeRange === val ? styles.filterBtnActive : styles.filterBtn
            }
            key={`${index}-${val}`}
            onClick={() => onChange && onChange(val)}
          >
            {val} D
          </button>
        ))}
    </div>
  );
};

export default CryptoGraphRangeSelector;
