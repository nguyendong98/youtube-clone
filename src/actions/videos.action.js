import {
    HOME_VIDEOS_FAIL,
    HOME_VIDEOS_REQUEST,
    HOME_VIDEOS_SUCCESS,
    RELATED_VIDEO_REQUEST,
    RELATED_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL,
    SEARCH_VIDEO_REQUEST,
    SEARCH_VIDEO_SUCCESS,
    SELECT_VIDEO_FAIL,
    SELECT_VIDEO_REQUEST,
    SELECT_VIDEO_SUCCESS, SUBSCRIPTIONS_CHANNEL_FAIL, SUBSCRIPTIONS_CHANNEL_REQUEST, SUBSCRIPTIONS_CHANNEL_SUCCESS
} from 'constants/actionType.constant';
import request from 'utils/api';

export const getPopularVideos = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOME_VIDEOS_REQUEST,
        })
        const { data } = await request('/videos', {
            params: {
                part: 'snippet, contentDetails, statistics',
                chart: 'mostPopular',
                regionCode: 'VN',
                maxResults: 20,
                pageToken: getState().homeVideos.nextPageToken
            }
        })
        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken
            }
        })
    } catch (e) {
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: e.message
        })
    }
}

export const getVideosByCategory = keyword => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOME_VIDEOS_REQUEST,
        })
        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                regionCode: 'VN',
                maxResults: 20,
                pageToken: getState().homeVideos.nextPageToken,
                q: keyword,
                type: 'video'

            }
        })
        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category: keyword
            }
        })
    } catch (e) {
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: e.message
        })
    }
}

export const getVideoById = id => async dispatch => {
    try {
        dispatch({
            type: SELECT_VIDEO_REQUEST
        })

        const { data } = await request('/videos', {
            params: {
                part: 'snippet, statistics',
                id: id
            }
        })
        dispatch({
            type: SELECT_VIDEO_SUCCESS,
            payload: data?.items[0]
        })

    } catch (e) {
        dispatch({
            type: SELECT_VIDEO_FAIL,
            payload: e.message
        })
    }
}

export const getRelatedVideos = id => async dispatch => {
    try {
        dispatch({
            type: RELATED_VIDEO_REQUEST
        })

        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                id: id,
                maxResults: 15,
                type: 'video'
            }
        })
        dispatch({
            type: RELATED_VIDEO_SUCCESS,
            payload: data?.items
        })

    } catch (e) {
        dispatch({
            type: RELATED_VIDEO_SUCCESS,
            payload: e.message
        })
    }
}

export const getVideosBySearch = keyword => async dispatch => {
    try {
        dispatch({
            type: SEARCH_VIDEO_REQUEST,
        })
        const { data } = await request('/search', {
            params: {
                part: 'snippet',
                maxResults: 20,
                q: keyword,
                type: 'video,channel',
            },
        })

        dispatch({
            type: SEARCH_VIDEO_SUCCESS,
            payload: data.items,
        })

    } catch (error) {
        dispatch({
            type: SEARCH_VIDEO_FAIL,
            payload: error.message,
        })
    }
}

