import axios from 'axios';

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

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

const submitDataRequest = async (data) => {
  try {
    await axios({
      method: 'post',
      url: `${REACT_APP_DAC_PORTAL_API_URL}/user/request`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("react-token")
      },
      data:
      {
        'ds-id': data.dataset,
        'policy': data.policy,
        'comments': data.comments
      }
    })
    alert("Submitted")
  } catch (e) {
    alert("Not submitted")
  }
}

export { getDataPolicies, submitDataRequest }
