import React, { useContext, useEffect, useState } from 'react'
import { Card, Spinner } from 'flowbite-react';
import { AuthContext } from '../../contexts/AuthProvider';

export default function Shop() {
  const {loading } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
// fetching data
  useEffect(() => {
    fetch('https://book-management-4qw7.onrender.com/all-books')
      .then(res => res.json())
      .then((data) => {
        const filteredBooks = data.filter((book) =>
          book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.authorName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setBooks(filteredBooks);
      });
  }, [loading, searchQuery]);

    // loader
    if (loading) {
      return <div className="text-center mt-28">
          <Spinner aria-label="Center-aligned spinner example" />
      </div>
  }
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
  return (
    <div className='my-20 px-4 lg:px-24'>
      <h2 className='text-3xl font-bold text-center mb-7 z-40'>All Books are Available Here</h2>
      <div className='mb-4 text-center'>
        <input
          type='text'
          placeholder='Book Title / Book Author'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='px-6 py-2 border rounded'
        />
      </div>

        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 text-center'>
          {
            books.map(book => <Card>
              <img src={book.imageURL} alt="" className='h-96' />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>
                  {book.bookTitle} 
                </p>
              </h5>
              <h6 className="font-medium">{book.authorName}</h6>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>
                {book.bookDescription}
                </p>
              </p>

              <button className='px-4 py-2 bg-blue-600 text-white rounded' onClick={() => handleAddToFavorite(book)}>+ Add</button>
            </Card>)
          }
        </div>
    </div>
  )
}
