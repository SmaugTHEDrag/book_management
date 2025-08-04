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
      author: 'DADDY HUNG',
      company: 'Cooking with daddy',
      img: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
    },
    {
      rating: 4,
      text: 'Good experience overall.',
      author: 'Couple',
      company: 'Bim and Long',
      img: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
    },
    {
      rating: 3,
      text: 'Average service. Could be better.',
      author: 'Wang',
      company: 'Disserviceable class leader, BCU 2022',
      img: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
    },
    {
      rating: 5,
      text: 'Outstanding!',
      author: 'lPheul',
      company: 'Leader(gay), ANTI LGBT Social',
      img: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
    },
    {
      rating: 4,
      text: 'Great customer service. Prompt and efficient.',
      author: 'Trung',
      company: 'FUCKBOY, inside is sadboy',
      img: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
    },
    {
      rating: 5,
      text: 'Exceptional quality. Worth every penny.',
      author: 'PTN LOR',
      company: 'Normal student, UIT',
      img: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
    },
  ];

  return (
    <div className='my-12 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center mb-10 leading-snug text-red-600'>Our Customers</h2>

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
