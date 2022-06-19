import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import styles from './RepoReadme.module.css'
import { selectRepoReadmeStatus, selectRepoReadmeValue, repoReadmeAsync, getRepoReadmeKey } from './repoReadmeSlice'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const RepoReadmeRenderer = dynamic(() => import("./RepoReadmeRenderer"), { ssr: false });

function RepoReadme({ username, reponame }: { username: string; reponame: string; }) {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const status = useAppSelector(selectRepoReadmeStatus)
  const value = useAppSelector(selectRepoReadmeValue);
  const readme = value[getRepoReadmeKey({ username, reponame })];

  useEffect(() => {
    if (!readme && status == 'idle') {
      dispatch(repoReadmeAsync({ username, reponame }))
    }
  }, [readme]);

  if (!readme && status == 'failed') return <div>Something when wrong</div>
  if (!readme && status == 'loading') return <div>Loading...</div>
  if (!readme && status == 'idle') return <div>Loading...</div>
  return (
    <div className={styles.item}>
      <div>
        {readme.decoded && <RepoReadmeRenderer content={readme.decoded} />}
      </div>
    </div>
  )
}

export default RepoReadme
