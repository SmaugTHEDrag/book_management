import React from 'react';
import { renderMatches, useLoaderData, Link } from 'react-router-dom';
import { Banner } from 'flowbite-react';
import './SingleBook.css';
const SingleBook = () => {
  const data = useLoaderData();
  const { bookTitle, authorName, imageURL, category, bookDescription } = data;

  return (
    <div className='mt-20'>
      <Banner/>

      {/* Book details */}
      <div className="img"><img src={imageURL} alt="Book Cover" className=" rounded-lg shadow-lg" /></div>
      <div className="text">
        <h2 className="text-6xl font-bold">{bookTitle}</h2>
        <h2 className="text-2xl font-semibold">{authorName}</h2>
        <p className="mt-10 ">Description: {bookDescription}</p>
        <p className="mt-4 ">Category: {category}</p>
      </div>
    </div>
    
  );
}

export default SingleBook;
