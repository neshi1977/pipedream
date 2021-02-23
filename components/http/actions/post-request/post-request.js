const axios = require('axios')
const http = require('../../http.app.js')

module.exports = {  
  key: "http-post-request",
  name: "POST Request",
  type: "action",
  version: "0.0.7",
  props: {
    http,
    url: { propDefinition: [http, "url"] },
    body: { propDefinition: [http, "body"] },
    params: { propDefinition: [http, "params"] },
    headers: { propDefinition: [http, "headers"] },
    auth: { propDefinition: [http, "auth"] },
  },
  methods: {},
  async run() {
    const config = {
      url: this.url,
      method: "POST",
      data: this.body,
      params: this.query,
      headers: this.headers,
    }
    if (this.auth) config.auth = this.auth
    return (await axios(config)).data
  },
}