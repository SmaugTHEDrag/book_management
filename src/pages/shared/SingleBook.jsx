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
        <h1 className="text-6xl font-bold">{bookTitle}</h1>
        <h2 className="text-2xl font-thin italic">{authorName}</h2>
        <div className="description"><p className="mt-10 italic ">Description: {bookDescription}</p></div>
        <p className="mt-4 ">Category: {category}</p>
      </div>
    </div>
    
  );
}

export default SingleBook;
