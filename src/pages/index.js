import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import CoutriesTable from '../components/CountriesTable/CountriesTable';
import { useState } from 'react';

export default function Home({ countries }) {

  const [keyWork, setKeyWord] = useState();

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(keyWork) ||
    country.region.toLowerCase().includes(keyWork) ||
    country.subregion.toLowerCase().includes(keyWork))

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyWord(e.target.value.toLowerCase())
  }
  return (
    <div className={styles.container}>
      <Layout children='main'>
        <div className={styles.counts}>Found {countries.length} countries</div>
        <SearchInput placeholder='Filter By Name Region Or SubRegion ' onChange={onInputChange} />
        <CoutriesTable countries={filteredCountries} />
      </Layout>
    </div>
  )
}

// STEP#6
//`getStaticProps` Get all data at the build time. these data will be updated when we build the project.
export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.com/v2/all');
  const countries = await res.json();

  return {
    props: {
      countries,
    }
  }
}