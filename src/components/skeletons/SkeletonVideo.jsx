import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function SkeletonVideo() {
    return (
        <div style={{ width: '100%', margin: '0 0 1rem 0' }}>
            <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
                <Skeleton height={160} />
                <div>
                    <Skeleton
                        style={{ margin: '0.5rem' }}
                        circle
                        height={40}
                        width={40}
                    />
                    <Skeleton height={40} width='75%' />
                </div>
            </SkeletonTheme>
        </div>
    )
}


