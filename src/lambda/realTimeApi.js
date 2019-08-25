const axios = require('axios')
const CircularJSON = require('circular-json')

const BASE_URL = 'https://api.sl.se/api2'
const REAL_TIME_API = 'realtimedeparturesV4.json'
const { REACT_APP_SL_API_KEY } = process.env;

exports.handler = async (event, context) => {
  const siteId = event.queryStringParameters.siteId
  const url = `${BASE_URL}/${REAL_TIME_API}?key=${REACT_APP_SL_API_KEY}&siteid=${siteId}&timewindow=30`

  return axios.get(url)
    .then(response => {
      let json = CircularJSON.stringify(response);
      return {
        statusCode: 200,
        body: json
      }
    })
    .catch(error => ({ statusCode: 400, body: String(error) }));
};