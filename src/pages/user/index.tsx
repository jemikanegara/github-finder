import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { wrapper } from '../../app/store'

import Search from '../../features/search/Search'
import UserSearch from '../../features/user-search/UserSearch'
import { getUserSearchKey, userSearchAsync } from '../../features/user-search/userSearchSlice'
import { userDetailsAsync } from '../../features/user/userSlice'
import styles from '../../styles/UserList.module.css'

const UserSearchPage = ({ q, page }: { q : string; page: number }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Search Results</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>    
        <Search path='/user' defaultValues={{ q: Array.isArray(q) ? q[0] : q }} />    
      </header>
      <main className={styles.main}>
        <UserSearch q={q} page={page} />
      </main>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
  const { q , page } = query;

  const args = {
    q: String(q),
    page: page ? Number(page) : 1
  }

  await store.dispatch(userSearchAsync(args));

  // collect user details
  const states = store.getState();
  const userSearch = states.userSearch.value[getUserSearchKey(args)];
  const getUserDetails = userSearch.items.map(async x => {
    return store.dispatch(userDetailsAsync(x.login))
  });
  await Promise.all(getUserDetails);

  return {
      props: {
        ...args
      },
  };
});

export default UserSearchPage
