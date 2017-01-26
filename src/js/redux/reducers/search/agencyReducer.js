/**
 * agencyReduce.js
 * Created by michaelbray 01/26/16
 **/

const initialState = {
    fundingAgencies: new Set(),
    awardingAgencies: new Set()
};

const agencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTOCOMPLETE_AWARDING_AGENCIES': {
            return Object.assign({}, state, {
                awardingAgencies: action.agencies
            });
        }
        case 'SET_AUTOCOMPLETE_FUNDING_AGENCIES': {
            return Object.assign({}, state, {
                fundingAgencies: action.agencies
            });
        }
        default:
            return state;
    }
};

export default agencyReducer;
