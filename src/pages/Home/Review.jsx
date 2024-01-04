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
      img: 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/336554074_545369801019156_3193960839547187067_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHkYVlZHup6IAgaHv3XeVF_DUkEVl-1l9gNSQRWX7WX2LYZuIeZJOwCQK4-DrpThvP27ksR2AcYkn54UWB_Z5pm&_nc_ohc=yQTUYrJ3eLsAX_ipjO0&_nc_ht=scontent.fsgn5-9.fna&oh=03_AdQJNfg_E9DO8up2JqTTTBh1zp6ZwzzkQCWn_I_JJ48K1w&oe=65BE39C5',
    },
    {
      rating: 4,
      text: 'Good experience overall. Room for improvement.',
      author: 'Couple',
      company: 'Bim and Long',
      img: 'https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.15752-9/370775434_3629868290671417_6538266988463275906_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeHg8jIFBYi5HeolscMlPbviIkXvU7bXjTciRe9TtteNN0RIrIdlhjrfLQhFObRgw_84w_XN0n9XEeUuY9v0y2KJ&_nc_ohc=Fj2Yj7zKSG0AX99oXFU&_nc_ht=scontent.fsgn5-11.fna&oh=03_AdRR-ql2B81DWo4wKJXRyvfB_k0B1TQv3d6KkYjO8z3SuQ&oe=65BE23C9',
    },
    {
      rating: 3,
      text: 'Average service. Could be better.',
      author: 'Wang',
      company: 'Disserviceable class leader, BCU 2022',
      img: 'https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.15752-9/409958894_739513531371087_3016181408300151152_n.png?_nc_cat=107&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGYREL4VqKk_XEEyvkXPCevF4mrlNmzurAXiauU2bO6sFoBO5J9sa9bcqVkgWCo6o80ixpU2XtW-0C5N2ZbT_B0&_nc_ohc=UQVMGTO521MAX94Gar2&_nc_ht=scontent.fsgn5-10.fna&oh=03_AdTA6ndcV63P9BDdPjOka0Yoiidobl6opXwNes9T1MU5NQ&oe=65BE46CB',
    },
    {
      rating: 5,
      text: 'Outstanding! Will definitely come back.',
      author: 'lPheul',
      company: 'Leader(gay), ANTI LGBT Social',
      img: 'https://cdn.discordapp.com/attachments/984481824065617952/1100315740420198410/339301656_3309074886010779_5177668617428147388_n.jpg',
    },
    {
      rating: 4,
      text: 'Great customer service. Prompt and efficient.',
      author: 'Trung',
      company: 'FUCKBOY, inside is sadboy',
      img: 'https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.15752-9/369209682_143725865400335_1970477301954967517_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGoq0aFGdXLz6_YjlUwCYAVrmeoU3Eb1UauZ6hTcRvVRqSfaHXdilBWP0IUGfPRUpPcU_QwZkTRIx1vnhOpAcUq&_nc_ohc=CZ97a7S17csAX_QNzJD&_nc_ht=scontent.fsgn5-3.fna&oh=03_AdTyfVGfMDA_G4wqiYtwOxQbnOPhXtAYbhaFFUOW_oHljg&oe=65BE33BD',
    },
    {
      rating: 5,
      text: 'Exceptional quality. Worth every penny.',
      author: 'PTN LOR',
      company: 'Normal student, UIT',
      img: 'https://cdn.discordapp.com/attachments/984481824065617952/1100315739916873768/338940319_244271794681709_3908198250391232581_n.jpg',
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
