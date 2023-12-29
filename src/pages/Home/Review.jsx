import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa6';
import { Avatar } from 'flowbite-react';
import profile from "../../assets/profile.jpg";

const Review = () => {
  const reviews = [
    {
      rating: 5,
      text: 'Excellent service! Highly recommended.',
      author: 'John Doe',
      company: 'CEO, ABC Corporation',
      img: 'https://en.ephoto360.com/uploads/worigin/2017/07/19/avatar-lol596ec026d450c_b648a6ae6189692ef90775102fc900d3.jpg',
    },
    {
      rating: 4,
      text: 'Good experience overall. Room for improvement.',
      author: 'Jane Smith',
      company: 'CTO, XYZ Tech',
      img: 'https://en.ephoto360.com/uploads/worigin/media/avatar-lol-name/thumb/Zyra_4.jpg',
    },
    {
      rating: 3,
      text: 'Average service. Could be better.',
      author: 'Bob Johnson',
      company: 'Founder, LMN Ventures',
      img: 'https://en.ephoto360.com/uploads/worigin/media/avatar-lol-name/thumb/Yorick_1.jpg',
    },
    {
      rating: 5,
      text: 'Outstanding! Will definitely come back.',
      author: 'Alice White',
      company: 'COO, PQR Innovations',
      img: 'path/to/john-doe.jpg',
    },
    {
      rating: 4,
      text: 'Great customer service. Prompt and efficient.',
      author: 'Chris Brown',
      company: 'Director, XYZ Solutions',
      img: 'path/to/john-doe.jpg',
    },
    {
      rating: 5,
      text: 'Exceptional quality. Worth every penny.',
      author: 'Emily Davis',
      company: 'Manager, ABC Services',
      img: 'path/to/john-doe.jpg',
    },
  ];

  return (
    <div className='my-12 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center mb-10 leading-snug'>Our Customers</h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 3, spaceBetween: 50 },
        }}
        className="mySwiper"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className='swiper-card'>
            <div className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
              <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                  {[...Array(review.rating)].map((_, starIndex) => (
                    <FaStar key={starIndex} />
                  ))}
                </div>

                <div className='mt-7'>
                  <p className='mb-5'>{review.text}</p>
                  <Avatar alt={`avatar of ${review.author}`} img={review.img} rounded className='w-10 mb-4' />
                  <h5 className='text-lg font-medium'>{review.author}</h5>
                  <p className='text-sm'>{review.company}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='h-20'></div>
    </div>
  );
};

export default Review;
