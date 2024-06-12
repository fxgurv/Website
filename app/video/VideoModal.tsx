'use client'

import { XIcon } from '@/components/Icons'
import { Dialog, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useEffect, useRef } from 'react'

type VideoModalProps = {
    isOpen: boolean
    vid: string
    onClose: () => void
}

export default function VideoModal({ isOpen, vid, onClose }: VideoModalProps) {

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (!isOpen) return
        setTimeout(() => {
            let videoPlayer = videoRef.current
            if (videoPlayer) {
                videoPlayer.setAttribute("src", `https://aweme.snssdk.com/aweme/v1/play/?video_id=${vid}&ratio=1080p&line=0`);
                videoPlayer.loop = true;
                videoPlayer.load();
                videoPlayer.play();
            }
        }, 100)
        return () => {
            let videoPlayer = videoRef.current
            if (videoPlayer) {
                videoPlayer.pause()
                videoPlayer.currentTime = 0
            }
        }
    }, [isOpen])

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 w-screen h-screen bg-black bg-opacity-75"
                onClose={onClose}
            >
                <div className="h-full w-full mx-auto text-center lg:px-32 lg:pt-20 lg:pb-32">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className='max-w-4xl mx-auto h-full transition-all transform'>
                            <div className='w-full h-full flex flex-col items-center justify-center'>
                                <div className='relative w-full'>
                                    <XIcon className="fa-solid fa-xmark absolute -top-8 right-1 lg:top-0 lg:-right-8 h-8 w-8 cursor-pointer text-gray-100" onClick={onClose} />
                                </div>
                                <video ref={videoRef} controls className='w-full max-h-[520px] bg-black rounded-lg outline-0 shadow shadow-gray-900' />
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}
