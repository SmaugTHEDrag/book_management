import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to view favorites.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/favorites", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch favorite books");
      }

      const data = await res.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      alert("Error fetching favorite books");
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (bookId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:8080/api/favorites/${bookId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to remove favorite");
      }

      setFavorites((prev) => prev.filter((book) => book.bookId !== bookId));
      alert("Removed from favorites!");
    } catch (error) {
      console.error("Error removing favorite:", error);
      alert("Error removing favorite");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-xl">Loading...</div>;
  }

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Your Favorite Books</h2>

      {favorites.length === 0 ? (
        <p>You have no favorite books yet.</p>
      ) : (
        <Table className="lg:w-[1180px]">
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Book Name</Table.HeadCell>
            <Table.HeadCell>Author</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>

          {favorites.map((book, index) => (
            <Table.Body key={book.bookId} className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-16 h-16 rounded-md"
                  />
                </Table.Cell>
                <Table.Cell>{book.title}</Table.Cell>
                <Table.Cell>{book.author}</Table.Cell>
                <Table.Cell>{book.category}</Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/book/${book.bookId}`}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    View
                  </Link>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => removeFavorite(book.bookId)}
                  >
                    Remove
                  </button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      )}
    </div>
  );
};

export default Favorite;
