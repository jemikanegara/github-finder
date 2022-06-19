import type { NextApiHandler } from 'next'
import { octokit } from '../../../../../utils/octokit'

const repoDetailsHandler: NextApiHandler = async (request, response) => {
  const query = request.query;
  
  try {
    const result = await octokit.request('GET /repos/{owner}/{repo}', { 
      owner: String(query.username),
      repo: String(query.reponame)
    });

    response.json(result)
  } catch(err){
    response.status(500).send(err.message || err)
  }
}

export default repoDetailsHandler
