import React, { useContext, useEffect, useState } from 'react'
import { Card, Spinner } from 'flowbite-react';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
export default function Shop() {
  const { loading } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  //fetching data
  useEffect(() => {
    fetch('https://book-management-4qw7.onrender.com/all-books')
      .then((res) => res.json())
      .then((data) => {
        const filteredBooks = data.filter((book) =>
          book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.authorName.toLowerCase().includes(searchQuery.toLowerCase()) 
        );
        // Filter books based on selected categories
        if (selectedCategories.length > 0) {
        const categoryFilteredBooks = filteredBooks.filter((book) => {
        const bookCategories = book.category.split(' '); // categories are space-separated
        return selectedCategories.some((selectedCategory) =>
          bookCategories.includes(selectedCategory)
         );
        });
        setBooks(categoryFilteredBooks);
         } else {
        setBooks(filteredBooks);
        }
      });
  }, [loading, searchQuery, selectedCategories]);

  // loader
  if (loading) {
    return (
      <div className="text-center mt-28">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  // truncate make description less
  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + '...';
  };

  // checkbox with category search
  function handleCheckboxChange(category) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((item) => item !== category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  }
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
        <label className='mr-5'>
          <input
            type='checkbox'
            id='fictionCheckbox'
            onChange={() => handleCheckboxChange('Fiction')}
          />
          Fiction
        </label>
        <label className='mr-5'>
          <input
            type='checkbox'
            id='fantasyCheckbox'
            onChange={() => handleCheckboxChange('Fantasy')}
          />
          Fantasy
        </label>
        <label className='mr-5'>
          <input
            type='checkbox'
            id='thrillerCheckbox'
            onChange={() => handleCheckboxChange('Thriller')}
          />
          Thriller
        </label>
        <label className='mr-5'>
          <input
            type='checkbox'
            id='historicalCheckbox'
            onChange={() => handleCheckboxChange('Historical')}
          />
          Historical
        </label>
        <label className='mr-5'>
          <input
            type='checkbox'
            id='mysteryCheckbox'
            onChange={() => handleCheckboxChange('Mystery')}
          />
          Mystery 
        </label>
        <label className='mr-5'>
          <input
            type='checkbox'
            id='horrorCheckbox'
            onChange={() => handleCheckboxChange('Horror')}
          />
          Horror
        </label>
        <label className='mr-5'>
          <input
            type='checkbox'
            id='comicCheckbox'
            onChange={() => handleCheckboxChange('Comic')}
          />
          Comic
        </label>
        <label className='mr-5'>
          <input
            type='checkbox'
            id='crimeCheckbox'
            onChange={() => handleCheckboxChange('Crime')}
          />
          Crime
        </label>
        <label className='mr-5'>
          <input
            type='checkbox'
            id='sciencefictionCheckbox'
            onChange={() => handleCheckboxChange('Science-Fiction')}
          />
          Science-Fiction
        </label>
        <label className='mr-5'>
          <input
            type='checkbox'
            id='psychologyCheckbox'
            onChange={() => handleCheckboxChange('Psychology')}
          />
          Psychology
        </label>
        <label className='mr-5'>
          <input
            type='checkbox'
            id='artCheckbox'
            onChange={() => handleCheckboxChange('Art')}
          />
          Art
        </label>
        <label className='mr-2'>
          <input
            type='checkbox'
            id='romanceCheckbox'
            onChange={() => handleCheckboxChange('Romance')}
          />
          Romance
        </label>
        <label className='mr-5'>
          <input
            type='checkbox'
            id='biographyCheckbox'
            onChange={() => handleCheckboxChange('Biography')}
          />
          Biography
        </label>
        <label className='mr-5'>
          <input
            type='checkbox'
            id='cookingCheckbox'
            onChange={() => handleCheckboxChange('Cookbooks')}
          />
          Cookbooks
        </label>
        <label className='mr-5'>
          <input
            type='checkbox'
            id='programmingCheckbox'
            onChange={() => handleCheckboxChange('Programming')}
          />
          Programming
        </label>
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
              <div style={{ display: 'flex' }}>
                <button className='px-9 py-2 font-bold text-cyan-800 hover:underline dark:text-cyan-500'><Link to={book.bookPDFURL} target ="_blank">Read Online</Link></button>
                <button className='px-14 py-2 bg-blue-600 text-white rounded'><Link to={`/admin/dashboard/edit-books/${book._id}`}>+ Add</Link></button>
              </div>
            </Card>)
          }
        </div>
    </div>
  )
}
