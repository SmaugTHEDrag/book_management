import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Banner } from 'flowbite-react';
import { HiX } from 'react-icons/hi';
import { MdAnnouncement } from 'react-icons/md';

const SingleBook = () => {
  const data = useLoaderData();
  const { bookTitle, authorName, imageURL, category, bookDescription } = data;

  return (
    <div className='mt-20'>
      <Banner/>

      {/* Book details */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Author: {authorName}</h2>
        <img src={imageURL} alt="Book Cover" className="mt-4 rounded-lg shadow-lg" />
        <p className="mt-4 text-lg">Category: {category}</p>
        <p className="mt-4 text-lg">Description: {bookDescription}</p>
      </div>
    </div>
    
  );
}

export default SingleBook;
