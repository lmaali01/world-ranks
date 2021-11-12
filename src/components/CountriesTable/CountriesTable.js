import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { useState } from 'react';
import styles from './CountriesTable.module.css';
import Link from 'next/Link';

const orderBy = (countries, value, direction) => {
    if (direction === 'asc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1)
    }
    if (direction === 'desc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1)
    }

    return countries;
}

const SortArrow = ({ direction }) => {
    if (!direction) {
        return <></>;
    }
    if (direction === "asc") {
        return <div className={styles.heading_arrow}>
            <KeyboardArrowDown color='inherit' />
        </div>
    } else if (direction === "desc") {
        return <div className={styles.heading_arrow}>
            <KeyboardArrowUp color='inherit' />
        </div>
    }
}

const CountriesTable = ({ countries }) => {
    const [direction, setDirection] = useState();
    const [value, setValue] = useState();

    const switchDirection = () => {
        if (!direction) {
            setDirection("desc");
        } else if (direction === "desc") {
            setDirection("asc");
        } else {
            setDirection(null);
        }
    }

    const setValueAndDirection = (value) => {
        switchDirection();
        setValue(value);
    }

    const orderedCountries = orderBy(countries, value, direction);
    return (
        <div>
            <div className={styles.heading}>
                <button className={styles.heading_name}
                    onClick={() => setValueAndDirection('name')}>
                    <div>Name</div>
                    <SortArrow direction={direction} />
                </button>
                <button className={styles.heading_population}
                    onClick={() => setValueAndDirection('population')}>
                    <div>Population</div>
                    <SortArrow direction={direction} />
                </button>
                <button className={styles.heading_area}
                    onClick={() => setValueAndDirection('area')}>
                    <div>Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)</div>
                    <SortArrow direction={direction} />
                </button>

                <button className={styles.heading_gini}
                    onClick={() => setValueAndDirection('gini')}>
                    <div>Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)</div>
                    <SortArrow direction={direction} />
                </button>
            </div>
            {orderedCountries.map((country) =>
                <Link href={`/country/${country.alpha3Code}`}>
                    <div className={styles.row}>
                        <div className={styles.name}>{country.name}</div>
                        <div className={styles.population}>{country.population}</div>
                    </div>
                </Link>
            )}
        </div>
    );
}

export default CountriesTable;