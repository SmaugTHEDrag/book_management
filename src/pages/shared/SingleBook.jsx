import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Banner } from 'flowbite-react';
import './SingleBook.css';
import { Link } from 'react-router-dom';
import { HiArrowSmLeft } from "react-icons/hi"; // đảm bảo đã import
const SingleBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => {
        console.error("Fetch error:", err);
      });
  }, [id]);

  if (!book) return <div className="text-center mt-20 text-red-500">Loading...</div>;

  const { title, author, image, category, description } = book;

  return (
    <div className="mt-20 px-6 lg:px-20">

      {/* Back link */}
      <Link
        to="/shop"
        className="text-black-700 hover:underline mb-10 block text-2xl lg:text-3xl font-bold flex items-center gap-2" 
      > 
        <HiArrowSmLeft className="text-3xl"/> Back to Shop 
      </Link>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={image}
            alt="Book Cover"
            className="rounded-xl shadow-xl max-w-[350px] h-[500px] object-cover"
          />
        </div>

        {/* Book info */}
        <div className="w-full lg:w-2.3/3 space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">{title}</h1>
          <h2 className="text-xl lg:text-2xl italic text-gray-600">By {author}</h2>
          <p className="text-lg leading-relaxed italic text-gray-700 font-bold">Description: <p className='italic font-medium'> {description} </p></p>
          <p className="text-md text-gray-800 font-bold">Category: <span className="font-medium italic">{category}</span></p>
        </div>
      </div>
    </div>
  );

}

export default SingleBook;
