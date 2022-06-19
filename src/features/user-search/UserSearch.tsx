import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import styles from './UserSearch.module.css'
import { selectUserSearchStatus, userSearchAsync, selectUserSearchValue, getUserSearchKey } from './userSearchSlice'
import UserDetails from '../user/UserDetails'
import Link from 'next/link'

function UserSearch({ q, page }: { q: string, page: number }) {
  const router = useRouter();

  const dispatch = useAppDispatch()
  const status = useAppSelector(selectUserSearchStatus)
  const value = useAppSelector(selectUserSearchValue);
  const results = value[getUserSearchKey({ q, page })];
  const maxPage = results ? Math.ceil(results.total_count / 10) : 1;

  useEffect(() => {
    if (!results) {
      dispatch(userSearchAsync({ q, page }))
    }
  }, [results])

  if (!results && status == 'failed') return <div>Something when wrong</div>
  if (!results && status == 'loading') return <div>Loading...</div>
  if (!results && status == 'idle') return <div>Loading...</div>
  return (
    <div className={styles.container}>
      <h2>Found {results.total_count} search results</h2>
      <div className={styles.results}>
        {results.items.map(x => <UserDetails key={x.login} username={x.login} />)}
      </div>
      <div className={styles.pagenav}>
        <div>{page > 1 && <Link href={`${router.pathname}?q=${q}&page=${page - 1}`}><a>Previous</a></Link>}</div>
        <div>{page < maxPage && <Link href={`${router.pathname}?q=${q}&page=${page + 1}`}><a>Next</a></Link>}</div>
      </div>
    </div>
  )
}

export default UserSearch
