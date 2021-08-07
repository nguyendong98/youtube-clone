import {
    COMMENT_LIST_FAIL,
    COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS,

} from 'constants/actionType.constant';

export const commentsReducer = (
    state= {
        comments: [],
        loading: false,
        error: null
    },
    action
) => {
    const { type, payload } = action;
    switch (type) {
        case COMMENT_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case COMMENT_LIST_SUCCESS:
            return {
                ...state,
                comments: payload,
                loading: false,
            }
        case COMMENT_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.error,
            }
        default:
            return state;
    }
}
