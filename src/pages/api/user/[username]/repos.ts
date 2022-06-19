import type { NextApiHandler } from 'next'
import { octokit } from '../../../../utils/octokit'

const userReposHandler: NextApiHandler = async (request, response) => {
  const query = request.query;
  
  try {
    const result = await octokit.request('GET /users/{username}/repos', { 
      username: String(query.username),
      per_page: 10,
      page: query.page ? Number(query.page) : 1
    });

    response.json(result)
  } catch(err){
    response.status(500).send(err.message || err)
  }
}

export default userReposHandler
