import Head from 'next/head'
import { wrapper } from '../../../../app/store'
import Search from '../../../../features/search/Search'

import RepoDetails from '../../../../features/repo/RepoDetails'
import { repoDetailsAsync } from '../../../../features/repo/repoDetailsSlice'
import styles from '../../../../styles/RepoDetails.module.css'
import { repoReadmeAsync } from '../../../../features/repo-readme/repoReadmeSlice'
import RepoReadme from '../../../../features/repo-readme/RepoReadme'

const RepoDetailsPage = ({ username, reponame }: { username: string; reponame: string; }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Repo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>    
        <Search path='/repo' />    
      </header>
      <main className={styles.main}>
        <RepoDetails username={username} reponame={reponame} />
        <hr />
        <RepoReadme username={username} reponame={reponame} />
      </main>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params, query }) => {
  const { username, reponame } = params;

  const props = {
    username: Array.isArray(username) ? username[0] : username,
    reponame: Array.isArray(reponame) ? reponame[0] : reponame,
  }

  const dispatchRepo = store.dispatch(repoDetailsAsync(props));
  const dispatchRepoReadme = store.dispatch(repoReadmeAsync(props));

  await Promise.all([dispatchRepo, dispatchRepoReadme]);

  return {
    props
  };
});

export default RepoDetailsPage
