import React, { useEffect, useState } from 'react'
import BookCards from '../shared/BookCards';

const OtherBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("https://book-management-4qw7.onrender.com/all-books").then(res => res.json()).then(data => setBooks(data.slice(9, 17)))
    }, [])

    return (
        <div className='mt-24'>
            <div className='text-red-700'><BookCards books={books} headline={"Other Books"} /></div>
        </div>
    )
}

export default OtherBooks