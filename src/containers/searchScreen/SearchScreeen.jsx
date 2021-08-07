import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getVideosBySearch} from 'actions/videos.action';
import { Container } from 'react-bootstrap';
import VideoHorizontal from 'components/videoHorizontal/VideoHorizontal';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

export default function SearchScreen() {

    const { query } = useParams();
    console.log(query)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideosBySearch(query));
    },[query, dispatch]);

    const {searchedVideos, loading} = useSelector(state => state.searchedVideos);

    return (
        <Container className="p-lg-4">
            {!loading ? (
                searchedVideos?.map(video => (
                    <VideoHorizontal
                        video={video}
                        key={video.id.videoId}
                        searchScreen
                    />
                ))
            ) : (
                <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
                    <Skeleton width='100%' height='160px' count={20} />
                </SkeletonTheme>
            )}
        </Container>
    )
}
