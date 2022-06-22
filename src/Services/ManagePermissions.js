import axios from 'axios';

// Permissions-API: Get user dataset permissions in the form of visas (GA4GH spec)
const getUserDatasetPermissions = async () => {
    const { REACT_APP_PERMISSIONS_URL } = process.env;
    const response = await axios({
        method: 'get',
        url: `${REACT_APP_PERMISSIONS_URL}/me/permissions?format=PLAIN`, 
        headers: {
          Authorization: "Bearer " + localStorage.getItem("react-token")
        }
    })
    return response.data 
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
        allowedDatasetsIds = datasetsPermissions.map(visa => JSON.parse(visa).ga4gh_visa_v1.value.split(":").pop())
    }

    const datasetsMask = getDatasetsMask(selectedDatasets, allowedDatasetsIds)
    
    const cartStore = [ getAllowedDatasets(selectedDatasets, datasetsMask), getRestrictedDatasets(selectedDatasets, datasetsMask) ] 

    return cartStore
}

export { getUserDatasetPermissions, generateCartStore }
