import { useEffect, useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import styles from './UserDetails.module.css'
import { selectUserStatus, selectUserValue, userDetailsAsync } from './userSlice'
import Link from 'next/link'

function UserDetails({ username }: { username: string; }) {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectUserStatus)
  const value = useAppSelector(selectUserValue);
  const user = value.find(x => x.login == username);

  useEffect(() => {
    if (!user && status == 'idle') {
      dispatch(userDetailsAsync(username))
    }
  }, [user]);

  if (!user && status == 'failed') return <div>Something when wrong</div>
  if (!user && status == 'loading') return <div>Loading...</div>
  if (!user && status == 'idle') return <div>Loading...</div>
  return (
    <div className={styles.item}>
      <img className={styles.avatar} src={user.avatar_url}/>
      <div>
        <div className={styles.name}>
          <Link href={`/user/${user.login}`}><a>{user.name}</a></Link>
        </div>
        <div className={styles.username}>
          <Link href={`/user/${user.login}`}><a>{user.login}</a></Link>
        </div>
        <div className={styles.follow}>
          <div>
            {user.followers} followers
          </div>
          <div>
            {user.following} following
          </div>
        </div>

        <div className={styles.bio}>
          {user.bio}
        </div>
        
        <div>
          Company: {user.company || '-'}
        </div>
        <div>
          Location: {user.location}
        </div>
        <div>
          Blog: {user.blog}
        </div>
        <div>
          Twitter: {user.twitter_username ? 
            <a href={`https://twitter.com/${user.twitter_username}`} rel='noopener' target='_blank'>
              {user.twitter_username}
            </a> : 
            '-'
          }
        </div>
      </div>
    </div>
  )
}

export default UserDetails
