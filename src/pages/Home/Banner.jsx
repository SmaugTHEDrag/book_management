import React from 'react'
import BannerCard from '../shared/BannerCard'
import OtherBannerCard from '../shared/OtherBanerCard'
import './Banner.css';

export const Banner = () => {
    return (
        <div className='bg-yellow-100 px-3 lg:px-23 flex items-center banner-background min-h-screen'>
            <div className='flex flex-col md:flex-row items-center justify-center w-full h-full gap-15 py-20'>
                {/* left side */}
                <div className='md:w-1/4'>
                    <OtherBannerCard />
                </div>

                {/* center text */}
                <div className='md:w-1/2 flex flex-col items-center justify-center h-full'>
                    <div className='space-y-5 text-center'>
                        <h1 className='lg:text-7xl text-5xl font-bold text-white mb-5 lg:leading-tight leading-snug'>
                            Look and enjoy books{' '}for the best experience
                        </h1>
                    </div>
                    <div className='w-full text-center mt-auto'>
                        <h6 className='text-bold text-3xl text-white font-bold'>Find and read more books you'll love, and keep track of the books you want to read. Be part of the world's largest community of book lovers on PTNBookStore.</h6>
                    </div>
                </div>

                {/* right side */}
                <div className='md:w-1/4'>
                    <BannerCard />
                </div>
            </div>
        </div>
    )
}