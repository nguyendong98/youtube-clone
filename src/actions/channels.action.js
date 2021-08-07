import {
    CHANNEL_DETAIL_FAIL,
    CHANNEL_DETAIL_REQUEST,
    CHANNEL_DETAIL_SUCCESS,
} from 'constants/actionType.constant';
import request from 'utils/api';

export const getChannelDetail = id => async dispatch => {
    try {
        dispatch({
            type: CHANNEL_DETAIL_REQUEST
        })
        const { data } = await request('/channels', {
            params: {
                part: 'snippet, statistics, contentDetails',
                id
            }
        })
        dispatch({
            type: CHANNEL_DETAIL_SUCCESS,
            payload: data.items[0]
        })
    } catch (e) {
        dispatch({
            type: CHANNEL_DETAIL_FAIL,
            payload: e.message
        })
    }
}


