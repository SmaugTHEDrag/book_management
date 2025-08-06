import { Table, Pagination } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

const ManageUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingUserId, setEditingUserId] = useState(null);
    const [newRole, setNewRole] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost:8080/api/users", {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("Forbidden");
                return res.json();
            })
            .then(data => setAllUsers(data))
            .catch(err => console.error("Error loading users:", err));
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/users/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to delete user");
                }

                alert("User deleted successfully!");
                setAllUsers((prev) => prev.filter((user) => user.id !== id));
            })
            .catch((err) => {
                console.error("Error deleting user:", err);
                alert("Failed to delete user");
            });
    };

    const handleEdit = (userId, currentRole) => {
        setEditingUserId(userId);
        setNewRole(currentRole);
    };

    const handleUpdateRole = () => {
        fetch(`http://localhost:8080/api/users/${editingUserId}/role`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ role: newRole }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Update failed");
                alert("Role updated successfully!");
                setAllUsers((prev) =>
                    prev.map((user) =>
                        user.id === editingUserId ? { ...user, role: newRole } : user
                    )
                );
                setEditingUserId(null);
            })
            .catch((err) => {
                console.error("Error updating role:", err);
                alert("Error updating role");
            });
    };

    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>Manage Users</h2>

            <Table className='lg:w-[1180px]'>
                <Table.Head>
                    <Table.HeadCell>No.</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>

                {allUsers.map((user, index) => (
                    <Table.Body className="divide-y" key={user.id}>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {user.username}
                            </Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>
                                {editingUserId === user.id ? (
                                    <select
                                        value={newRole}
                                        onChange={(e) => setNewRole(e.target.value)}
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="ADMIN">Admin</option>
                                        <option value="CUSTOMER">Customer</option>
                                    </select>
                                ) : (
                                    user.role
                                )}
                            </Table.Cell>
                            <Table.Cell className="space-x-2">
                                {editingUserId === user.id ? (
                                    <>
                                        <button
                                            onClick={handleUpdateRole}
                                            className="bg-green-600 px-3 py-1 text-white rounded hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingUserId(null)}
                                            className="bg-gray-400 px-3 py-1 text-white rounded hover:bg-gray-500"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEdit(user.id, user.role)}
                                            className="bg-yellow-500 px-3 py-1 text-white rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="bg-red-600 px-3 py-1 text-white rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>

            <div className="flex items-center justify-center text-center mt-8">
                <Pagination
                    currentPage={currentPage}
                    layout="pagination"
                    nextLabel="Go forward"
                    onPageChange={(page) => setCurrentPage(page)}
                    previousLabel="Go back"
                    showIcons
                    totalPages={5}
                />
            </div>
        </div>
    );
};

export default ManageUsers;
