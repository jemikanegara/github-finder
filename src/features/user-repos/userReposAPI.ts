import { UserReposItem } from "./userReposSlice"
import { server } from '../../config';

export async function fetchUserRepos({ username, page } : { username : string; page: number; }): Promise<{ data: UserReposItem[] }> {
  const response = await fetch(`${server}/api/user/${username}/repos?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const result = await response.json()
  
  return result
}
