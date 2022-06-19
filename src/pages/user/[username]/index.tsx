import Head from 'next/head'
import { wrapper } from '../../../app/store'
import Search from '../../../features/search/Search'
import UserRepos from '../../../features/user-repos/UserRepos'
import { getUserReposKey, userReposAsync } from '../../../features/user-repos/userReposSlice'

import UserDetails from '../../../features/user/UserDetails'
import { userDetailsAsync } from '../../../features/user/userSlice'
import styles from '../../../styles/UserDetails.module.css'

const UserDetailsPage = ({ username, page, count }: { username: string; page: number; count: number }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>    
        <Search path='/user' />    
      </header>
      <main className={styles.main}>
        <UserDetails username={String(username)} />
        <hr />
        <UserRepos username={username} page={page} count={count} />
      </main>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params, query }) => {
  const { username } = params;
  const { page } = query;

  const props = {
    username: Array.isArray(username) ? username[0] : username,
    page: (Array.isArray(page) ? Number(page[0]) : Number(page)) || 1
  }

  const dispatchUser = store.dispatch(userDetailsAsync(props.username));
  const dispatchUserRepos = store.dispatch(userReposAsync(props));

  await Promise.all([dispatchUser, dispatchUserRepos]);

  return {
    props : {
      ...props,
      count: store.getState().user.value.find(x => x.login == props.username).public_repos
    },
  };
});

export default UserDetailsPage
