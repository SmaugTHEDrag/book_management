import React, { useEffect, useState } from 'react'
import BookCards from '../shared/BookCards';

const OtherBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/books").then(res => res.json()).then(data => setBooks(data.slice(9, 17)))
    }, [])

    return (
        <div className='mt-24'>
            <div className='text-red-700'><BookCards books={books} headline={"Other Books"} /></div>
        </div>
    )
}

export default OtherBooks