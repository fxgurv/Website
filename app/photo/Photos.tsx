'use client'

import ImageSkeleton from "@/components/client/ImageSkeleton"
import { useMemo, useState } from "react"
import useSWRInfinite from 'swr/infinite'
import { Loading, Location } from '../../components/Icons'
import http from "../../utils/http"
import { PageData } from "../../utils/types"
import PhotosModal from "./PhotosModal"
import { TPhoto } from "./type"
import useInfiniteScroll from "react-infinite-scroll-hook"
import { SWRInfiniteOptions } from "@/lib/constant"

const limit = 24
const genBody = (page: number) => ({
    database: 'cloud',
    collection: 'photos',
    filter: {},
    skip: page * limit,
    limit,
    sort: {
        create_time: -1
    },
})
const getKey = (pageIndex: number, previousPageData: PageData<TPhoto>) => {
    if (previousPageData && !previousPageData.data.length) return null
    return [`/api/mongo/find`, genBody(pageIndex)]
}

export function Photos() {
    const { data = [], isLoading, error, size, setSize } = useSWRInfinite<PageData<TPhoto>>(getKey, http.post, SWRInfiniteOptions)
    const hasNextPage = useMemo(() => !isLoading && (data.length > 0 && data[data.length - 1]?.data.length === limit), [isLoading, data])
    const [sentryRef] = useInfiniteScroll({
        loading: isLoading,
        hasNextPage,
        onLoadMore: () => setSize(size + 1),
        disabled: !!error,
    })
    const [photo, setPhoto] = useState<TPhoto | undefined>()
    const [showPhotos, setShowPhotos] = useState(false)

    const showPhoto = (photo: TPhoto) => {
        setPhoto(photo)
        setShowPhotos(true)
    }

    return (
        <>
            <div className="w-full grid grid-cols-2 p-4 gap-4 lg:p-8 lg:gap-8 lg:grid-cols-3">
                {
                    data.map(resp => resp.data.map(photo => (
                        <div className="box w-full relative rounded-lg text-xs" onClick={() => showPhoto(photo)} >
                            <ImageSkeleton src={photo.thumbnail} className="w-full aspect-[5/3] object-cover cursor-pointer rounded-lg" />
                            <a
                                className="absolute left-3 top-3 flex flex-fow gap-1 items-center bg-black/50 text-white px-2.5 py-1.5 rounded-full"
                                target="_blank"
                                rel='noreferrer'
                                href={photo.address}
                                onClick={e => e.stopPropagation()}
                            >
                                <Location className="h-4 w-4" />
                                <span className="">{photo.name}</span>
                            </a>
                        </div>
                    )))
                }
            </div>
            {(isLoading || hasNextPage) && (
                <div ref={sentryRef} className="my-8 mx-auto col-span-full">
                    <Loading className='h-20 w-20' />
                </div>
            )}
            <PhotosModal isOpen={showPhotos} photo={photo} onClose={() => setShowPhotos(false)} />
        </>
    )
}