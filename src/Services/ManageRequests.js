import axios from 'axios';
import { getEGAAccessToken } from './ManageAuth';

const { REACT_APP_DAC_PORTAL_API_URL, REACT_APP_EGA_URL } = process.env

// DAC-Portal-API: Get data policies and submit data requests
const getDataPolicies = async (data) => {
  const response = await axios({
    method: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/user/policies`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("react-token")
    },
    params: {
      'ds-id': data.file_ID
    }
  })

  return { 'policy': response.data[0] ? response.data[0].files[0].policy : "No policies attached", 'dataset': data.file_ID }

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
    requestData = { 'ds-id': data.dataset, 'policy': data.policy, 'comments': data.comments };
    url = `${REACT_APP_DAC_PORTAL_API_URL}/user/request`;
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
