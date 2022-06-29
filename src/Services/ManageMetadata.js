import axios from 'axios';

// IPC-OUTBOX-API: Get metadata from elements selected for analysis
const getDatasetsLocators = async () => {
    const { REACT_APP_OUTBOX_URL } = process.env

    const response = await axios({
        method: 'get',
        url: `${REACT_APP_OUTBOX_URL}/v1/metadata`,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("react-token")
        }
    })

    return response.data
}

const getDatasetsMetadata = async (datasetsLocators) => {
    const { REACT_APP_ES_URL } = process.env

    let objects = await Promise.all(datasetsLocators.map(async (locator) => {
        let metadata = await axios({
            method: 'get',
            url: `${REACT_APP_ES_URL}/${locator.metadata.es_index}/_search?pretty=true&size=10000&q=file_ID:${locator._id}`
        })
        return {
            'metadata': metadata.data.hits.hits[0]._source,
            'analysis': locator.metadata.analysis
        }
    }));

    return objects
}

const generateSelectionsStore = (datasetsMetadata) => {

    let store = [];
    let vreStore = [];
    let cavaticaStore = [];

    datasetsMetadata.map(dataset => {
        if (dataset.analysis === "vre") {
            vreStore.push(dataset.metadata)
        } else cavaticaStore.push(dataset.metadata)
    })

    store.push(vreStore)
    store.push(cavaticaStore)

    return store
}

export { getDatasetsLocators, getDatasetsMetadata, generateSelectionsStore }
