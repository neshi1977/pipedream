const github = require('../../github.app.js')
const { Octokit } = require('@octokit/rest')

module.exports = {
  key: "github-get-repo",
  name: "Get Repo",
  version: "0.0.1",
  type: "action",
  props: {
    github,
    repoFullName: { propDefinition: [github, "repoFullName"] },
  },
  async run() {
    const octokit = new Octokit({
      auth: this.github.$auth.oauth_access_token
    })
    
    return (await octokit.repos.get({
      owner: this.repoFullName.split("/")[0],
      repo: this.repoFullName.split("/")[1],
    })).data
  },
}