import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Pagination } from 'flowbite-react';
import { Link } from 'react-router-dom';

const ManageBooks = () => {
    const [allBooks, setAllBooks] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8080/api/books`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setAllBooks(data);
            });
    }, []);

    // delete a books
    const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/books/${id}`, {
        method: "DELETE",
    })
        .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to delete book");
        }

        alert("Book deleted successfully!");

        // Xoá sách khỏi danh sách hiển thị
        setAllBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        })
        .catch((err) => {
        console.error("Error deleting book:", err);
        alert("Failed to delete book");
        });
    };




    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = () => setCurrentPage(page);

    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>Manager Your Books Inventory!</h2>

            {/* table */}

            <Table className='lg:w-[1180px]'>
                <Table.Head>
                    <Table.HeadCell>
                        No.
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Image
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Book name
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Author Name
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Category
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Edit or Manage
                    </Table.HeadCell>
                </Table.Head>

                {
                    allBooks.map((book, index) => <Table.Body className="divide-y" key={book.id}>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {index + 1}
                            </Table.Cell>
                            <Table.Cell>
                                <img className='w-20 h-20 rounded-md' src={book.image} alt={book.title} />
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {book.title}
                            </Table.Cell>
                            <Table.Cell>
                                {book.author}
                            </Table.Cell>
                            <Table.Cell>
                                {book.category}
                            </Table.Cell>
                            <Table.Cell>
                                <Link
                                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                                    to={`/admin/dashboard/edit-books/${book.id}`}
                                >
                                    Edit
                                </Link>
                                <button className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600' onClick={() => handleDelete(book.id)}>Delete</button>

                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>)
                }
            </Table>

            {/* pagination */}
            <div className="flex items-center justify-center text-center mt-8">
                <Pagination
                    currentPage={1}
                    layout="pagination"
                    nextLabel="Go forward"
                    onPageChange={page => { setCurrentPage(page) }}
                    previousLabel="Go back"
                    showIcons
                    totalPages={1000}
                />
            </div>
        </div>
    )
}

export default ManageBooks