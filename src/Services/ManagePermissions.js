import axios from 'axios';

// Keycloak (GA4GH Passport broker): Getting user dataset permissions from GA4GH Visa issuers
const getUserDatasetPermissions = async () => {
    const { REACT_APP_AUTH_URL } = process.env;

    const response = await axios({
        method: 'get',
        url: `${REACT_APP_AUTH_URL}/realms/IPC/protocol/openid-connect/userinfo`, 
        headers: {
          Authorization: "Bearer " + localStorage.getItem("react-token")
        }
    })

    return response.data.ga4gh_passport_v1 ? response.data.ga4gh_passport_v1 : [] 
}

const getDatasetsMask = (selectedDatasets, datasetsIds) => {
    return selectedDatasets.map(dataset => datasetsIds ? (dataset.access === "public" || datasetsIds.includes(dataset.file_ID)) 
                                                       : (dataset.access === "public"))
}

const getAllowedDatasets = (selectedDatasets, mask) => {
    return selectedDatasets.filter((item, i) => mask[i]);
}

const getRestrictedDatasets = (selectedDatasets, mask) => {
    return selectedDatasets.filter((item, i) => !mask[i]);
}

const generateCartStore = (selectedDatasets, datasetsPermissions) => {

    let allowedDatasetsIds;

    if(datasetsPermissions.length > 0) {
        allowedDatasetsIds = datasetsPermissions.map(visa => visa.ga4gh_visa_v1.value.split(":").pop())
    }

    const datasetsMask = getDatasetsMask(selectedDatasets, allowedDatasetsIds)
    
    const cartStore = [ getAllowedDatasets(selectedDatasets, datasetsMask), getRestrictedDatasets(selectedDatasets, datasetsMask) ] 

    return cartStore
}

export { getUserDatasetPermissions, generateCartStore }
