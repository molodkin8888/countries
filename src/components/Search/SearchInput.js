import styles from "./SearchInput.module.css";

const SearchInput = ({ ...country }) => {
  return (
    <div className={styles.search_wrapper}>
      <input className={styles.input} {...country} />
    </div>
  );
};

export default SearchInput;