import React, { useContext, useEffect, useState } from 'react'
import { Card, Spinner } from 'flowbite-react';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
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
  // Truncate function dùng để giới hạn chữ trong Description
const truncateDescription = (description, maxLength) => {
  if (description.length <= maxLength) {
    return description;
  }
  return description.slice(0, maxLength) + '...';
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

      <div className='mb-8 text-center font-bold'>
        <input
          type='checkbox'
          id='categoryCheckbox'
          onChange={() => setSelectedCategories(prev => [...prev, 'category1'])}
        />
      <label htmlFor='categoryCheckbox' className='mr-5'>Fiction</label>
        <input
          type='checkbox'
          id='categoryCheckbox'
          onChange={() => setSelectedCategories(prev => [...prev, 'category2'])}
        />
      <label htmlFor='categoryCheckbox' className='mr-5'>Fantasy</label>
        <input
          type='checkbox'
          id='categoryCheckbox'
          onChange={() => setSelectedCategories(prev => [...prev, 'category2'])}
        />
      <label htmlFor='categoryCheckbox' className='mr-5'>Thriller</label>
        <input
          type='checkbox'
          id='categoryCheckbox'
          onChange={() => setSelectedCategories(prev => [...prev, 'category2'])}
        />
      <label htmlFor='categoryCheckbox' className='mr-5'>Romance</label>
     </div>

        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
          {
            books.map(book => <Card>
              <img src={book.imageURL} alt="" className='h-96' />
              <h5 className="text-2xl font-bold text-center tracking-tight text-gray-900 dark:text-white">
                <p>
                  {book.bookTitle} 
                </p>
              </h5>
              <h6 className="font-medium text-center">{book.authorName}</h6>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>
                {truncateDescription(book.bookDescription, 150)}
                </p>
                <Link to={`/book/${book._id}`} className='cursor-pointer text-blue-700'>Show more</Link>
              </p>

              <button className='px-4 py-2 bg-blue-600 text-white rounded'><Link to={`/admin/dashboard/edit-books/${book._id}`}>+ Add</Link></button>
            </Card>)
          }
        </div>
    </div>
  )
}
