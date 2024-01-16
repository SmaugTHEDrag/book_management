import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Pagination } from 'flowbite-react';
import { Link } from 'react-router-dom';
import resume from '../assets/Weyward.pdf';
import { FaDownload, FaRegEye} from "react-icons/fa";
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
    // console.log(id)
    fetch(`https://book-management-4qw7.onrender.com/favorite-book/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // setAllBooks(data);
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
          <Table.HeadCell>Manage favorite</Table.HeadCell>
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
              <a className='font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5' href={resume} target ="_blank"  download>Download</a>
              <button className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600 mr-5' onClick={() => handleDelete(book._id)}>Delete</button>
              <a className='font-medium text-cyan-600 hover:underline dark:text-cyan-500' href={resume} target ="_blank">read online</a>
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
