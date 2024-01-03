import React from 'react'
import BannerCard from '../shared/BannerCard'
import './Banner.css';
export const Banner = () => {
    return (
        <div className=' bg-yellow-100  px-4 lg:px-24 flex items-center banner-background'>
            <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-15 py-20'>
                {/* right side */}
                <div className='md:w-1/4'>
                    <BannerCard />
                    
                </div>

                {/* center text */}
                <div className='md:w-1/2 space-y-5 text-center'>
                   <h1 className='lg:text-6xl text-5xl font-bold text-black mb-5 lg:leading-tight leading-snug'>
                    Rent and enjoy books{'                                                   '}
                   <span className='text-white'>for the best experience</span>
                   </h1>
                     <h6 className='text-bold text-2xl'>Find and read more books you'll love, and keep track of the books you want to read. Be part of the world's largest community of book lovers on Goodreads.</h6>
                </div>

                <div className='md:w-1/4'>
                    <BannerCard />
                </div>
            </div>
        </div>
    )
}

