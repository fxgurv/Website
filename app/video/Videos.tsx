'use client'

import { Loading } from "@/components/Icons"
import { SWRInfiniteOptions } from "@/lib/constant"
import { useMemo, useState } from "react"
import useInfiniteScroll from "react-infinite-scroll-hook"
import useSWRInfinite from 'swr/infinite'
import http from "../../utils/http"
import { PageData } from "../../utils/types"
import Video from "./Video"
import VideoModal from "./VideoModal"
import { TVideo } from "./type"

const limit = 20
const projection = {
    _id: 0,
    aweme_id: 1,
    desc: 1,
    author: {
        nickname: 1,
        avatar_thumb: 1,
        custom_verify: 1,
        sec_uid: 1,
    },
    video: {
        cover: 1,
        play_addr: {
            uri: 1
        }
    },
    create_time: 1,
    poi_info: {
        poi_name: 1,
        poi_latitude: 1,
        poi_longitude: 1
    }
}
const genBody = (page: number) => (
    {
        database: 'cloud',
        collection: 'videos',
        filter: {},
        skip: page * limit,
        limit,
        projection,
        sort: {
            create_time: -1
        },
    }
)
const getKey = (pageIndex: number, previousPageData: PageData<TVideo>) => {
    if (previousPageData && !previousPageData.data.length) return null
    return [`/api/mongo/find`, genBody(pageIndex)]
}

export default function Videos() {

    const { data = [], isLoading, error, size, setSize } = useSWRInfinite<PageData<TVideo>>(getKey, http.post, SWRInfiniteOptions)
    const hasNextPage = useMemo(() => !isLoading && (data.length > 0 && data[data.length - 1]?.data.length === limit), [isLoading, data])
    const [sentryRef] = useInfiniteScroll({
        loading: isLoading,
        hasNextPage,
        onLoadMore: () => setSize(size + 1),
        disabled: !!error,
    })

    const [showVideo, setShowVideo] = useState(false)
    const [vid, setVid] = useState('')

    const playVideo = (vid: string) => {
        setVid(vid)
        setShowVideo(true)
    }

    return (
        <>
            <div className="w-full grid grid-cols-1 p-4 md:p-8 gap-4 md:gap-8 lg:grid-cols-2">
                {
                    data.map(item => item.data.map(video => <Video key={video.aweme_id} video={video} onPlay={playVideo} />))
                }
            </div>
            {(isLoading || hasNextPage) && (
                <div ref={sentryRef} className="my-8 mx-auto col-span-full">
                    <Loading className='h-20 w-20' />
                </div>
            )}
            <VideoModal isOpen={showVideo} vid={vid} onClose={() => setShowVideo(false)} />
        </>
    )

}
