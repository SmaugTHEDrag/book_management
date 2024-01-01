import React, { useState } from 'react';

const useFavorite = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  const addToFavorites = (book) => {
    // Check if the book is not already in favorites
    if (!favoriteBooks.some((favBook) => favBook._id === book._id)) {
      setFavoriteBooks((prevFavorites) => [...prevFavorites, book]);
    }
  };

  return {
    favoriteBooks,
    addToFavorites,
  };
};

const Favorite = () => {
  const { favoriteBooks, addToFavorites } = useFavorite();

  return (
    <div>
      <h2>My Favorite Books</h2>
      {/* Render your favorite books here */}
      {favoriteBooks.map((favBook) => (
        <div key={favBook._id}>
          <p>{favBook.bookTitle}</p>
          {/* Add other book details as needed */}
        </div>
      ))}
    </div>
  );
};
export default Favorite