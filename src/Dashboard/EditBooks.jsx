import React from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { useLoaderData, useParams, useLocation, useNavigate } from 'react-router-dom';

const EditBooks = () => {
  const { id } = useParams();
  const { title, author, image, category, description, pdf } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/admin/dashboard/book';

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const updatedBook = {
      title: form.title.value,
      author: form.author.value,
      image: form.image.value,
      category: form.category.value,
      description: form.description.value,
      pdf: form.pdf.value,
    };

  fetch("https://book-management-backend-d481.onrender.com/api/books/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  })
    .then(async (res) => {
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to update");
      }

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return res.json();
      } else {
        return {};
      }
    })
    .then((data) => {
      alert("Book updated successfully!");
      navigate("/admin/dashboard/manage");
    })
    .catch((err) => {
      console.error("Error updating book:", err.message);
      alert("Failed to update book");
    });


  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Edit Book</h2>
      <form className="flex lg:w-[1180px] flex-col flex-wrap gap-4" onSubmit={handleUpdate}>
        {/* First Row */}
        <div className='flex gap-8'>
          {/* Book Title */}
          <div className='lg:w-1/2'>
            <Label htmlFor="title" value="Book Title" className="mb-2 block" />
            <TextInput
              id="title"
              name="title"
              type="text"
              placeholder="Book Name"
              required
              className='w-full'
              defaultValue={title}
            />
          </div>

          {/* Author Name */}
          <div className='lg:w-1/2'>
            <Label htmlFor="author" value="Author Name" className="mb-2 block" />
            <TextInput
              id="author"
              name="author"
              type="text"
              placeholder="Author Name"
              required
              className='w-full'
              defaultValue={author}
            />
          </div>
        </div>

        {/* Second Row */}
        <div className='flex gap-8'>
          {/* Image URL */}
          <div className='lg:w-1/2'>
            <Label htmlFor="image" value="Book Image URL" className="mb-2 block" />
            <TextInput
              id="image"
              name="image"
              type="text"
              placeholder="Image URL"
              required
              className='w-full'
              defaultValue={image}
            />
          </div>

          {/* Category */}
          <div className='lg:w-1/2'>
            <Label htmlFor="category" value="Book Category" className="mb-2 block" />
            <TextInput
              id="category"
              name="category"
              type="text"
              placeholder="Category"
              required
              className='w-full'
              defaultValue={category}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" value="Book Description" className="mb-2 block" />
          <Textarea
            id="description"
            name="description"
            placeholder="Book Description"
            rows={4}
            required
            className='w-full'
            defaultValue={description}
          />
        </div>

        {/* PDF URL */}
        <div>
          <Label htmlFor="pdf" value="Book PDF Link" className="mb-2 block" />
          <TextInput
            id="pdf"
            name="pdf"
            type="text"
            placeholder="Paste Book PDF URL here"
            required
            className='w-full'
            defaultValue={pdf}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className='mt-5'>
          Update Book
        </Button>
      </form>
    </div>
  );
};

export default EditBooks;
