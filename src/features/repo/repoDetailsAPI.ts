import { RepoModel } from "./repoDetailsSlice"
import { server } from '../../config';

export async function fetchRepoDetails({ username, reponame }: { username: string; reponame: string }): Promise<{ data: RepoModel }> {
  try {
    const response = await fetch(`${server}/api/user/${username}/${reponame}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const result = await response.json()
    return result;
  } catch(err) {
    console.log(err)
  }
}
