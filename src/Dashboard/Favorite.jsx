import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Favorite = ({
    favoriteBooks,
    setFavoriteBooks,
    currentPage,
    setCurrentPage,
    booksPerPage
}) => {

    const addToFavorites = (book) => {
        // Add the selected book to the favorites state
        setFavoriteBooks((prevBooks) => [...prevBooks, book]);
    };

    // ... (existing code)

    return (
        <div className='px-4 my-12'>
            {/* ... (existing code) */}
            {/* Pagination */}
            <div className="flex items-center justify-center text-center mt-8">
                <Pagination
                    currentPage={currentPage}
                    layout="pagination"
                    nextLabel="Go forward"
                    onPageChange={(page) => setCurrentPage(page)}
                    previousLabel="Go back"
                    showIcons
                    totalPages={Math.ceil(favoriteBooks.length / booksPerPage)}
                />
            </div>
        </div>
    );
};

export default Favorite;
