import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import styles from './UserRepos.module.css'
import { selectUserReposStatus, userReposAsync, selectUserReposValue, getUserReposKey } from './userReposSlice'
import Link from 'next/link'
import RepoDetails from '../repo/RepoDetails'

function UserRepos({ username, page, count }: { username: string, page: number; count: number }) {
  const router = useRouter();

  const dispatch = useAppDispatch()
  const status = useAppSelector(selectUserReposStatus)
  const value = useAppSelector(selectUserReposValue);
  const results = value[getUserReposKey({ username, page })];
  const maxPage = results ? Math.ceil(count / 10) : 1;

  useEffect(() => {
    if (!results) {
      dispatch(userReposAsync({ username, page }))
    }
  }, [results])

  if (!results && status == 'failed') return <div>Something when wrong</div>
  if (!results && status == 'loading') return <div>Loading...</div>
  if (!results && status == 'idle') return <div>Loading...</div>
  return (
    <div className={styles.container}>
      <h2>Repositories</h2>
      <div className={styles.results}>
        {results.items.map(x => <RepoDetails key={x.id} username={username} reponame={x.name} />)}
      </div>
      <div className={styles.pagenav}>
        <div>{page > 1 && <Link href={`${router.pathname.replace('[username]', username)}?page=${page - 1}`}><a>Previous</a></Link>}</div>
        <div>{page < maxPage && <Link href={`${router.pathname.replace('[username]', username)}?page=${page + 1}`}><a>Next</a></Link>}</div>
      </div>
    </div>
  )
}

export default UserRepos
