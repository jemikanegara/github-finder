import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import styles from './RepoDetails.module.css'
import { selectRepoStatus, selectRepoValue, repoDetailsAsync } from './repoDetailsSlice'
import Link from 'next/link'

function RepoDetails({ username, reponame }: { username: string; reponame: string; }) {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const status = useAppSelector(selectRepoStatus)
  const value = useAppSelector(selectRepoValue);
  const repo = value.find(x => x.name == reponame);

  useEffect(() => {
    if (!repo && status == 'idle') {
      dispatch(repoDetailsAsync({ username, reponame }))
    }
  }, [repo]);

  if (!repo && status == 'failed') return <div>Something when wrong</div>
  if (!repo && status == 'loading') return <div>Loading...</div>
  if (!repo && status == 'idle') return <div>Loading...</div>
  return (
    <div className={styles.item}>
      <div>
        <div className={styles.name}>
          <Link href={`${router.pathname.replace('[username]', username).replace('/[reponame]', '')}/${repo.name}`}><a>{repo.name}</a></Link>
        </div>
        <div className={styles.username}>
          <Link href={`${router.pathname.replace('[username]', username).replace('/[reponame]', '')}/${repo.name}`}><a>{repo.full_name}</a></Link>
        </div>
        <div className={styles.language}>
          {repo.language}
        </div>
      </div>
    </div>
  )
}

export default RepoDetails
