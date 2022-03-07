import userSelectionsTypes from './userSelections.types';
import axios from 'axios';
/*
export const fetchUserSelectionsBegin = () => ({
  type: userSelectionsTypes.FETCH_USERSELECTIONS_BEGIN
});*/

export const fetchUserSelectionsSuccess = selections => ({
  type: userSelectionsTypes.FETCH_USERSELECTIONS_SUCCESS,
  payload: selections
});
/*
export const fetchUserSelectionsFailure = errorMessage => ({
  type: userSelectionsTypes.FETCH_USERSELECTIONS_FAILURE,
  payload: errorMessage
});*/

export const fetchUserSelections = () => {
  return dispatch => {

    //dispatch(fetchUserSelectionsBegin());
    const { REACT_APP_OUTBOX_URL, REACT_APP_ES_URL } = process.env
    const access_token = localStorage.getItem("react-token");
    
    var merged = ""

    axios({
      method: 'get',
      url: `${REACT_APP_OUTBOX_URL}/v1/metadata`,
      headers: {
        Authorization: "Bearer " + access_token
      }
    }).then(response => {
      merged = Array.prototype.concat.apply([], response.data)
      var es_url = ""
      var url_list = []
      var analysis = []

      for (var i = 0; i < merged.length; i++) {
        es_url = REACT_APP_ES_URL + "/" + merged[i].metadata.es_index + "/_search?pretty=true&size=10000&q=file_ID:" + "\"" + merged[i]._id + "\""
        url_list.push(es_url)
        analysis.push(merged[i].metadata.analysis)
      }

      let promiseArr = url_list.map(l => fetch(l).then(res => res.json()));

      Promise.all(promiseArr).then(res => {
        var vreArr = []
        var cavaticaArr = []
        for (var j = 0; j < res.length; j++) {
            if(analysis[j] === "vre") {
              vreArr.push(res[j].hits.hits[0]._source) 
            } 
            if(analysis[j] === "cavatica") {
              cavaticaArr.push(res[j].hits.hits[0]._source) 
            }  
        }

        var results = []

        results.push(vreArr)
        results.push(cavaticaArr)

        dispatch(fetchUserSelectionsSuccess(results));

      })/*.catch(error => dispatch(fetchUserSelectionsFailure(error.message)));   */
    })
  }
};

export const updateUserSelections = selections => ({
  type: userSelectionsTypes.UPDATE_USERSELECTIONS,
  payload: selections
})
