import styles from "@/styles/ErrorMessage.module.css";

type ErrorMessageProps = {
  msg: string;
};

const ErrorMessage = ({ msg }: ErrorMessageProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.msg}>{msg}</p>
    </div>
  );
};

export default ErrorMessage;
