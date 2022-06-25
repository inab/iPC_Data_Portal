import axios from 'axios';

const { REACT_APP_OUTBOX_URL } = process.env;

// IPC-OUTBOX-API: Add/Remove items from DB.
const addItemForAnalysis = async (data) => {
    const results = await axios({
        method: 'post',
        url: `${REACT_APP_OUTBOX_URL}/v1/metadata`,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("react-token")
        },
        data:
        {
            _id: data.file_ID,
            metadata: {
                file_locator: data.file_external_ID,
                es_index: data.es_index,
                analysis: data.analysis,
                access: data.access
            }
        }
    })

    return [JSON.parse(results.config.data)]
}

const removeItemFromAnalysis = async (data) => {
    await axios({
        method: 'delete',
        url: `${REACT_APP_OUTBOX_URL}/v1/metadata`,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("react-token")
        },
        data:
            { _id: data.file_ID }
    })

    const {analysis, ...rest} = data;

    return [rest]
}

// REDUX STORE (CART/ANALYSIS SELECTIONS): Add/Remove items from the store.
const addItemToAnalysisStore = (item, selection, store) => {
    
    let userSelectionsStore;

    if (item.analysis === "vre") {
        userSelectionsStore = [[...store[0], selection], store[1]]
    }
    if (item.analysis === "cavatica") {
        userSelectionsStore = [store[0], [...store[1], selection]]
    }

    return userSelectionsStore
}

const removeItemFromAnalysisStore = (item, selection, store) => {

    let userSelectionsStore;

    if (item.analysis === "vre") {
        userSelectionsStore = store[0].filter(el => el["file_ID"] !== selection.file_ID)
        return [userSelectionsStore, store[1]]
    }
    if (item.analysis === "cavatica") {
        userSelectionsStore = store[1].filter(el => el["file_ID"] !== selection.file_ID)
        return [store[0], userSelectionsStore]
    }
}

export { addItemForAnalysis, addItemToAnalysisStore, removeItemFromAnalysis, removeItemFromAnalysisStore }