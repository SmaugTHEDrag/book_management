import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

// react icons
import { FaPlusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const handleAddToFavorite = (book) => {
    // Send a request to add the book to the favorite books in the database
    fetch(`https://book-management-4qw7.onrender.com/upload-favorite-book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( book ), // Sending the bookId in the request body
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to add book to favorites: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        // Handle the response data if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error adding book to favorites:', error);
      });
  };
const BookCards = ({headline, books}) => {
    return (
        <div className='my-16 px-4 lg:px-24'>
            <h2 className='text-5xl my-5 font-bold text-center'>{headline}</h2>

            {/* cards */}
            <div className='mt-20'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className=" w-full h-full"
                >
                    {
                        books.map(book => <SwiperSlide className='text-center flex items-center justify-center' key={book._id}>
                            <Link to={`/book/${book._id}`} className='cursor-pointer'>
                                <div className='bg-gray-100 p-8 rounded-lg relative'>
                                    <img src={book.imageURL} alt="" className='w-full' />
                                    <div className='absolute top-3 right-3 bg-red-600 hover:bg-black p-2 rounded '>
                                        <Link to="/admin/dashboard/favorite"><FaPlusCircle className='w-4 h-4 text-white'onClick={() => handleAddToFavorite(book)}/></Link>
                                    </div>
                                </div>

                                <div className='mt-5 mb-8 text-left space-y-2 flex justify-center items-start'>
                                    <div>
                                        <h3 className='text-black font-bold'>{book.bookTitle}</h3>
                                        <p className='text-black'>{book.authorName}</p>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>)
                    }

                </Swiper>
            </div>

        </div>
    )
}

export default BookCards