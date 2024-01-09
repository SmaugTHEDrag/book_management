import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'flowbite-react';
import { Link } from 'react-router-dom';
import resume from '../assets/Library.pdf';
import { FaDownload } from "react-icons/fa";
const Favorite = () => {
  const booksPerPage = 10;
  const [allBooks, setAllBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`https://book-management-4qw7.onrender.com/all-favorite-books`)
      .then((res) => res.json())
      .then((data) => {
        setAllBooks(data);
      });
  }, []); // Reload the favorite books when a book is added

  
  // Delete a book from favorites
  const handleDelete = (id) => {
    fetch(`https://book-management-4qw7.onrender.com/favorite-book/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to delete book from favorites: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        // Update the state with the new list of favorite books
        setAllBooks(data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error deleting book from favorites:', error);
      });
  };

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = allBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Manage Your Favorite Books!</h2>

      {/* Table */}
      <Table className="lg:w-[1180px]">
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Book name</Table.HeadCell>
          <Table.HeadCell>Author Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Edit or Manage</Table.HeadCell>
        </Table.Head>

        {currentBooks.map((book, index) => (
          <Table.Body className="divide-y" key={book._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {(currentPage - 1) * booksPerPage + index + 1}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {book.bookTitle}
              </Table.Cell>
              <Table.Cell>{book.authorName}</Table.Cell>
              <Table.Cell>{book.category}</Table.Cell>
              <Table.Cell>
              <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5" to={`/admin/dashboard/edit-books/${book._id}`}>Edit</Link>
              <button className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600 mr-5' onClick={() => handleDelete(book._id)}>Delete</button>
              <a className='font-medium text-cyan-600 hover:underline dark:text-cyan-500' href={resume} target ="_blank"  download>Download</a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-center text-center mt-8">
        <Pagination
          currentPage={currentPage}
          layout="pagination"
          nextLabel="Go forward"
          onPageChange={(page) => setCurrentPage(page)}
          previousLabel="Go back"
          showIcons
          totalPages={Math.ceil(allBooks.length / booksPerPage)}
        />
      </div>
    </div>
  );
};

export default Favorite;
