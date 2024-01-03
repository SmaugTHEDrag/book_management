import React from 'react'
import { Link } from 'react-router-dom'

const FavoriteBook = () => {
  return (
    <div className='px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12'>
        <div className='md:w-1/2'>
            <img src={"https://i.pinimg.com/564x/f2/13/ef/f213ef6fed6d4b166ef94bec742bd86c.jpg"} alt="" className='rounded md:w-10/12' />
        </div>
        <div className='space-y-6 md:w-1/2'>
            <h2 className='text-5xl my-5 font-bold md:w-3/4 leading-snug'>Find Your Favorite <span className='text-red-600'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Book Here!</span></h2>
            <p className='mb-10 text-lg md:w-5/6'>websites or platforms to encourage users to explore and discover books. It suggests that the platform or service being referred to has a variety of books, and users can search or browse to find their favorite ones.</p>
            <div className='flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14'>
              <div>
                <h3 className='text-3xl font-bold '>100+</h3>
                <p className='text-base'>Book Listing</p>
              </div>
              <div>
                <h3 className='text-3xl font-bold '>50+</h3>
                <p className='text-base'>Regsiter User</p>
              </div>
              <div>
                <h3 className='text-3xl font-bold '>100+</h3>
                <p className='text-base'>Pdf Downloaded</p>
              </div>
            </div>
            <Link to="/shop" className='block mt-8'><button className='bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300 '>Explore Now</button></Link>
        </div>
    </div>
  )
}

export default FavoriteBook