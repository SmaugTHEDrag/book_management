import { Table, Pagination } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManageBooks = () => {
  const [booksPage, setBooksPage] = useState({
    content: [],
    totalPages: 1,
    number: 0,
  });
  const [editingBookId, setEditingBookId] = useState(null); // nếu muốn edit sau này
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const token = localStorage.getItem("token");

  // fetch books theo trang
  const fetchBooks = async (page = 0) => {
    try {
      const res = await fetch(`http://localhost:8080/api/books?page=${page}&size=${pageSize}`, {
        headers: {
          "Authorization": `Bearer ${token}`, // nếu backend có bảo vệ
        },
      });
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooksPage(data);
      setCurrentPage(data.number);
    } catch (err) {
      console.error("Error loading books:", err);
      alert("Failed to load books");
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  // delete a book
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete book");
      alert("Book deleted successfully!");
      fetchBooks(currentPage);
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete book");
    }
  };

  const { content = [], totalPages = 1, number = 0 } = booksPage;

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Manage Your Books Inventory!</h2>

      <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Book name</Table.HeadCell>
          <Table.HeadCell>Author Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Edit or Manage</Table.HeadCell>
        </Table.Head>

        {content.map((book, index) => (
          <Table.Body className="divide-y" key={book.id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{number * pageSize + index + 1}</Table.Cell>
              <Table.Cell>
                <img className='w-20 h-20 rounded-md' src={book.image} alt={book.title} />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {book.title}
              </Table.Cell>
              <Table.Cell>{book.author}</Table.Cell>
              <Table.Cell>{book.category}</Table.Cell>
              <Table.Cell>
                <Link
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                  to={`/admin/dashboard/edit-books/${book.id}`}
                >
                  Edit
                </Link>
                <button
                  className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600'
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center text-center mt-8">
          <Pagination
            currentPage={number + 1}
            totalPages={totalPages}
            layout="pagination"
            nextLabel="Next"
            previousLabel="Prev"
            showIcons
            onPageChange={(page) => setCurrentPage(page - 1)}
          />
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
