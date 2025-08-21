import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Banner, Spinner } from 'flowbite-react';
import { HiArrowSmLeft } from 'react-icons/hi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import './SingleBook.css';

const SingleBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingFavoriteId, setAddingFavoriteId] = useState(null);
  const [hasFavorited, setHasFavorited] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8080/api/books/${id}`);
        if (!res.ok) throw new Error('Failed to fetch book');
        const data = await res.json();
        setBook(data);

        // Check if the book is already favorited (assuming an API endpoint exists)
        const token = localStorage.getItem('token');
        if (token) {
          const likeRes = await fetch(`http://localhost:8080/api/favorites/${id}/has`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (likeRes.ok) {
            setHasFavorited(await likeRes.json());
          }
        }
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToFavorite = async (bookId) => {
    try {
      setAddingFavoriteId(bookId);
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add favorites');
        return;
      }

      if (hasFavorited) {
        // Remove from favorites
        await fetch(`http://localhost:8080/api/favorites/${bookId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasFavorited(false);
      } else {
        // Add to favorites
        await fetch(`http://localhost:8080/api/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookId }),
        });
        setHasFavorited(true);
      }
    } catch (err) {
      console.error('Favorite error:', err);
      alert('Failed to update favorites');
    } finally {
      setAddingFavoriteId(null);
    }
  };

  if (loading) {
    return (
      <div className="mt-20 px-6 lg:px-20">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Spinner className="w-12 h-12 text-blue-600" />
          <p className="text-gray-600 text-lg font-medium mt-4">Loading book...</p>
          {/* Skeleton UI */}
          <div className="flex flex-col lg:flex-row gap-8 items-start w-full mt-8 animate-pulse">
            <div className="w-full lg:w-1/2">
              <div className="rounded-xl bg-gray-200 h-[500px] max-w-[350px]"></div>
            </div>
            <div className="w-full lg:w-2/3 space-y-6">
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 px-6 lg:px-20 text-center">
        <p className="text-red-500 text-lg font-medium">Error: {error}</p>
        <Link
          to="/shop"
          className="text-blue-700 hover:underline mt-4 inline-block text-lg font-bold flex items-center gap-2"
        >
          <HiArrowSmLeft className="text-2xl" /> Back to Shop
        </Link>
      </div>
    );
  }

  const { title, author, image, category, description } = book;

  return (
    <div className="mt-20 px-6 lg:px-20">
      {/* Back link */}
      <Link
        to="/shop"
        className="text-blue-700 hover:underline mb-10 block text-2xl lg:text-3xl font-bold flex items-center gap-2"
      >
        <HiArrowSmLeft className="text-3xl" /> Back to Shop
      </Link>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="rounded-xl shadow-xl max-w-[350px] h-[500px] object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDM1MCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjM1MCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMTAwIDI1MEgxNzVWMjAwSDEwMFYyNTBaIiBmaWxsPSIjOUNBNEFCIi8+PHRleHQgeD0iMTUwIiB5PSIzMDAiIGZpbGw9IiM1NTU1NTUiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
            }}
          />
        </div>

        {/* Book info */}
        <div className="w-full lg:w-2/3 space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">{title}</h1>
          <h2 className="text-xl lg:text-2xl italic text-gray-600">By {author}</h2>
          <p className="text-lg leading-relaxed italic text-gray-700 font-bold">
            Description: <p className="italic font-medium">{description}</p>
          </p>
          <p className="text-md text-gray-800 font-bold">
            Category: <span className="font-medium italic">{category}</span>
          </p>
          <div className="flex items-center gap-4">
            <Link
              to={`/book/${book.id}/read`}
              className="px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-lg hover:bg-blue-200 transition-all transform hover:scale-105"
            >
              Read Online
            </Link>
            <button
              className="px-4 py-2 bg-red-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50 hover:bg-blue-800 transition-all transform hover:scale-105 shadow-lg disabled:shadow-none"
              onClick={() => handleAddToFavorite(book.id)}
              disabled={addingFavoriteId === book.id}
            >
              {addingFavoriteId === book.id ? (
                <Spinner className="w-4 h-4" />
              ) : hasFavorited ? (
                <AiFillHeart className="w-4 h-4" />
              ) : (
                <AiOutlineHeart className="w-4 h-4" />
              )}
              {hasFavorited ? 'Remove Favorite' : 'Add to Favorite'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;