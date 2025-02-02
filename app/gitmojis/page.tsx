import AppNav from '@/components/server/AppNav'
import { RiGithubFill } from '@remixicon/react'
import { Emojis } from './data'
import Emoji, { EmojiProps } from './Emoji'

export const metadata = {
    title: 'An emoji guide for your commit messages',
}

export default function Page() {

    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6 '>
            <AppNav paths={[{ name: 'Git 表情' }]} />
            <div className='flex-1-col box-card'>
                <div className='bg-gradient-to-br from-gray-900 to-gray-500 w-full lg:h-96 h-48 rounded-t-lg shadow relative p-6 lg:p-16 text-center lg:text-left'>
                    <div className="h-full flex flex-col justify-center">
                        <p className="text-2xl lg:text-5xl tracking-wide">😊🤣😂😇😉😘😜🙄😡😰😴</p>
                        <p className="text-white text-lg lg:text-4xl font-semibold my-4">Git Commit Messages 表情包使用指南</p>
                        <p className="text-gray-400 text-xs lg:text-sm"><i className="fa-solid fa-circle-info mr-2"></i>点击任意彩色表情或者黑色标题即可完成复制！</p>
                        <div className="relative w-fit mt-6 hidden lg:block">
                            <a href="https://github.com/AnoyiX/anoyi" target="_blank" className="relative p-0.5 inline-flex items-center justify-center font-semibold overflow-hidden group rounded-md" rel='noreferrer'>
                                <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                                <span className="relative px-4 py-2 transition-all ease-out bg-gray-700 rounded-md group-hover:bg-opacity-0 duration-400">
                                    <span className="relative text-white flex flex-row items-center gap-2"><RiGithubFill />查看演示</span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="absolute right-0 bottom-0 w-1/2 overflow-hidden h-full hidden lg:block">
                        <img src="https://i.imgur.com/kmGT1x5.png" alt="" className="w-full rounded-tl-xl translate-x-1/3 translate-y-16 drop-shadow-[0_48px_48px_rgba(59,130,246,0.75)]" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-10 gap-6">
                    {
                        Emojis.map((item: EmojiProps) => <Emoji key={item.name} emoji={item} />)
                    }
                </div>
            </div>
        </div>
    )

}
