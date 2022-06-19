import type { NextPage } from 'next'
import Head from 'next/head'
import Search from '../features/search/Search'

import styles from '../styles/Home.module.css'

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Github Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2>SEARCH USER</h2>
        <Search path='/user' />
      </main>
    </div>
  )
}

export default IndexPage
