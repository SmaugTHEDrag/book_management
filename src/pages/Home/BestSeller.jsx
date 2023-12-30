import React, { useEffect, useState } from 'react'
import BookCards from '../shared/BookCards';

const BestSeller = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("https://book-management-4qw7.onrender.com/all-books").then(res => res.json()).then(data => setBooks(data.slice(0, 8)))
    }, [])

    return (
        <>
            <div className="text-red-700"><BookCards books={books} headline={"Best Fiction Books 2023"} /></div>
        </>
    )
}

export default BestSeller