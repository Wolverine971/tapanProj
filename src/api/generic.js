/**
 * client-server processing
 *///
import axios from 'axios'
// import _ from 'underscore'
export default {
  server: 'http://18.144.56.185:8090',
  // process.env.VUE_APP_ROOT_API,
  
  search(text) {
    		return axios.post(this.server + '/search', {
    				"advancedAll": text,      
            "advancedNone" : "",      
            "spellcheck" : true,      
            "synonym" : true  
    		}).then(formatResponse)
      },
 }

/**
 * some responses come back using an response object, this function peels that away
 * @param rsp is the raw data response
 * @returns {*} the response data
 */
export function formatResponse (rsp) { // {data: {response: any}} <- could be
  if (!rsp) {
    throw new Error('No Response')
  }

  if (!Object.keys(rsp)) {
    throw new Error('The data is not yet available.')
  }

  if (rsp.data === 'Unauthorized Request') {
    throw new Error('Unauthorized Request')
  }

  return (rsp.data && rsp.data.response) || rsp.data || rsp
}