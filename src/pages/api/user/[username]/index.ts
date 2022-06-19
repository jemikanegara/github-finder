import type { NextApiHandler } from 'next'
import { octokit } from '../../../../utils/octokit'

const userDetailsHandler: NextApiHandler = async (request, response) => {
  const query = request.query;

  try {
    const result = await octokit.request('GET /users/{username}', { 
      username: String(query.username)
    });

    response.json(result)
  } catch(err){
    response.status(500).send(err.message || err)
  }
}

export default userDetailsHandler
