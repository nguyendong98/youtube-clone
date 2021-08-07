import {
    HOME_VIDEOS_FAIL,
    HOME_VIDEOS_REQUEST,
    HOME_VIDEOS_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST,
    RELATED_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, SEARCH_VIDEO_REQUEST, SEARCH_VIDEO_SUCCESS, SELECT_VIDEO_FAIL,
    SELECT_VIDEO_REQUEST, SELECT_VIDEO_SUCCESS
} from 'constants/actionType.constant';

export const homeVideosReducer = (
    state= {
        videos: [],
        loading: false,
        nextPageToken: null,
        activeCategory: 'Tất cả',
        error: null
    },
    action
) => {
    const { type, payload } = action;
    switch (type) {
        case HOME_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case HOME_VIDEOS_SUCCESS:
            return {
                ...state,
                loading: false,
                videos:
                    state.activeCategory === payload.category
                        ? [...state.videos, ...payload.videos]
                        : payload.videos,
                activeCategory: payload.category,
                nextPageToken: payload.nextPageToken,
            }
        case HOME_VIDEOS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload.error,
            }

        case SELECT_VIDEO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SELECT_VIDEO_SUCCESS:
            return {
                ...state,
                video: payload,
                loading: false,
            }
        case SELECT_VIDEO_FAIL:
            return {
                ...state,
                error: payload.error,
                loading: true,
            }
        default:
            return state;
    }
}

export const videoSelectReducer = (
    state = {
        loading: false,
        video: null,
        error: null
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case SELECT_VIDEO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SELECT_VIDEO_SUCCESS:
            return {
                ...state,
                video: payload,
                loading: false,
            }
        case SELECT_VIDEO_FAIL:
            return {
                ...state,
                error: payload.error,
                loading: true,
            }
        default:
            return state;
    }
}

export const relatedVideosReducer = (
    state = {
        loading: false,
        relatedVideos: [],
        error: null
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case RELATED_VIDEO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case RELATED_VIDEO_SUCCESS:
            return {
                ...state,
                relatedVideos: payload,
                loading: false,
            }
        case RELATED_VIDEO_FAIL:
            return {
                ...state,
                error: payload.error,
                loading: true,
            }
        default:
            return state;
    }
}

export const searchedVideosReducer = (
    state = {
        loading: false,
        searchedVideos: [],
        error: null
    },
    action
) => {
    const { payload, type } = action

    switch (type) {
        case SEARCH_VIDEO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SEARCH_VIDEO_SUCCESS:
            return {
                ...state,
                searchedVideos: payload,
                loading: false,
            }
        case SEARCH_VIDEO_FAIL:
            return {
                ...state,
                error: payload.error,
                loading: true,
            }
        default:
            return state;
    }
}
