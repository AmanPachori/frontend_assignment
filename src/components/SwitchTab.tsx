import styles from "@/styles/SwitchTab.module.css";

type SwitchTabProps = {
  tabs: string[];
  activeTab?: string;
  onSwitch?: (val: string) => void;
};

const SwitchTab = ({ tabs, onSwitch, activeTab }: SwitchTabProps) => {
  return (
    <div className={styles.container}>
      {tabs.length > 0 &&
        tabs.map((val, index) => (
          <button
            className={activeTab === val ? styles.activeTab : styles.tabs}
            key={`${index}-${val}`}
            onClick={() => onSwitch && onSwitch(val)}
          >
            {val}
          </button>
        ))}
    </div>
  );
};

export default SwitchTab;
