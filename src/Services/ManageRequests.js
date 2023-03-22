import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { getEGAAccessToken } from './ManageAuth';

const { REACT_APP_DAC_PORTAL_API_URL, REACT_APP_EGA_URL } = process.env

// DAC-Portal-API: Get data policies and submit data requests
const getDataPolicies = async (data) => {

  const response = await axios({
    method: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/user/policies/file`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("react-token")
    },
    params: {
      'id': data.file_ID
    }
  })

  return { 
    'policy': response.data[0] ? response.data[0].value : "No policies attached", 
    'dataset': data.file_ID, 
    'resource': response.data[0].acl.split(":").slice(1).join(":") }
}

// Send data requests to the different Data Access Frameworks (BSC, EGA, ...) -> OAuth2 Token exchange protocol
const submitDataRequest = async (data) => {

  let token, requestData, url;

  if(data.dataset.includes("EGA")) {
    const egaResponse = await getEGAAccessToken();
    token = egaResponse.data.access_token;
    requestData = { 'dataset_id': data.dataset, 'form_fields': { 'comment' : data.comments }};
    url = `${REACT_APP_EGA_URL}/requests`; 
  } else {
    token = localStorage.getItem("react-token")
    // Domain object: request
    console.log("data")
    console.log(data)
    requestData = { 
      'id': uuidv4(),
      'fileId': data.dataset, 
      'resource': data.resource, 
      'comment': data.comments 
    };

    url = `${REACT_APP_DAC_PORTAL_API_URL}/user/requests`;
  }

  const config = {
    method: 'post',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer " + token
    },
    data: requestData
  }

  try {
    await axios(config)
    alert("Submitted")
  } catch (e) {
    alert("Not submitted")
  }

}

export { getDataPolicies, submitDataRequest }
