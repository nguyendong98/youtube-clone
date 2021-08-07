import {CHANNEL_DETAIL_FAIL, CHANNEL_DETAIL_REQUEST, CHANNEL_DETAIL_SUCCESS} from 'constants/actionType.constant';

export const channelDetailReducer = (
    state = {
        loading: false,
        channel: {},
        error: null
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case CHANNEL_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CHANNEL_DETAIL_SUCCESS:
            return {
                ...state,
                channel: payload,
                loading: false
            }
        case CHANNEL_DETAIL_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}
