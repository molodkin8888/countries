import { useState } from "react";
import styles from "./CountriesTable.module.css";
import Router from 'next/router'

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  return direction === "desc" ? <span>&#8595;</span> : <span>&#8593;</span>
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  const goToCountryDetails = (code)  => {
    Router.push(`/country/${code}`)
  }

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div className={styles.header_flag_country}></div>

        <button
          className={styles.header_country_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div className={styles.header_column_name}>Name</div>

          {value === "name" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.header_country_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div className={styles.header_column_name}>Population</div>

          {value === "population" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.header_country_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div className={styles.header_column_name}>
            Area (km<sup>2</sup>)
          </div>

          {value === "area" && <SortArrow direction={direction} />}
        </button>
      </div>

      <div className={styles.table_content}>
        {orderedCountries.map((country) => (
            <div onClick={() => goToCountryDetails(country.alpha3Code)} key={country.name}>
                <div className={styles.row}>
                    <div className={styles.country_flag}>
                      <img src={country.flag} alt={country.name} />
                    </div>
                    <div className={styles.country_name}>{country.name}</div>

                    <div className={styles.country_population}>{country.population}</div>

                    <div className={styles.country_area}>{country.area || 0}</div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default CountriesTable;