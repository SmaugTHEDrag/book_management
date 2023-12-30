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
          book.bookDescription.toLowerCase().includes(searchQuery.toLowerCase())
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
  const handleSearch = () => {
    // Fetch and filter books when the search button is clicked
    fetchData();
  };

  return (
    <div className='my-28 px-4 lg:px-24'>
      <h2 className='text-3xl font-bold text-center mb-16 z-40'>All Books are Available Here</h2>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search books by title or description...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='px-4 py-2 border rounded'
        />
      </div>
      <button
        className='px-4 py-2 bg-blue-600 text-white rounded'
        onClick={handleSearch}
      >
        Search
      </button>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
          {
            books.map(book => <Card>
              <img src={book.imageURL} alt="" className='h-96' />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>
                  {book.bookTitle}
                </p>
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>
                {book.bookDescription}
                </p>
              </p>

              <button className='px-4 py-2 bg-blue-600 text-white rounded'>Buy Now</button>
            </Card>)
          }
        </div>
    </div>
  )
}
