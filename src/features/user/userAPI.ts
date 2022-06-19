import { UserModel } from "./userSlice"
import { server } from '../../config';

export async function fetchUserList(q: string): Promise<{ data: UserModel[] }> {
  const response = await fetch(`/api/user?q=${q}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const result = await response.json()

  return result
}

export async function fetchUserDetails(username: string): Promise<{ data: UserModel }> {
  try {
    const response = await fetch(`${server}/api/user/${username}`, {
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
