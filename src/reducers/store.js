import { createStore, applyMiddleware, combineReducers } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { authReducer } from './auth.reducer';
import { homeVideosReducer, videoSelectReducer, relatedVideosReducer, searchedVideosReducer } from './videos.reducer';
import { channelDetailReducer } from './channel.reducer';
import { commentsReducer } from 'reducers/comments.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    homeVideos: homeVideosReducer,
    videoSelect: videoSelectReducer,
    channelDetail: channelDetailReducer,
    comments: commentsReducer,
    relatedVideos: relatedVideosReducer,
    searchedVideos: searchedVideosReducer
});

const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
