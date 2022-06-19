import { RepoReadmeModel } from "./repoReadmeSlice"
import { server } from '../../config';

export async function fetchRepoReadme({ username, reponame }: { username: string; reponame: string }): Promise<{ data: RepoReadmeModel }> {
  try {
    const response = await fetch(`${server}/api/user/${username}/${reponame}/readme`, {
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
