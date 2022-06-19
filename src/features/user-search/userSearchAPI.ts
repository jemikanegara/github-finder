import { UserSearchModel } from "./userSearchSlice"
import { server } from '../../config';

export async function fetchUserSearch({ q, page } : { q: string, page: number }): Promise<{ data: UserSearchModel }> {
  const response = await fetch(`${server}/api/user?q=${q}&page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const result = await response.json()
  
  return result
}
