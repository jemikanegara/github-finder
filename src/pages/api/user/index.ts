import type { NextApiHandler } from 'next'
import { octokit } from '../../../utils/octokit'

const userSearchHandler: NextApiHandler = async (request, response) => {
  const query = request.query;

  try {
    const result = await octokit.request('GET /search/users', { 
      q: query.q ? String(query.q) : '', 
      per_page: 10, 
      page: query.page ? Number(query.page) : 1
    });

    response.json(result)
  } catch(err){
    response.status(500).send(err.message || err)
  }
}

export default userSearchHandler
