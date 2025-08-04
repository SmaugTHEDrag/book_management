import React, { useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';

const UploadBook = () => {
  const [bookCategory, setBookCategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;

    const bookObj = {
      title: bookTitle,
      author: authorName,
      image: imageURL,
      category: category,
      description: bookDescription,
      pdf: bookPDFURL,
    };

    fetch("http://localhost:8080/api/books", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bookObj),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to upload book");
        }
        return res.json();
      })
      .then((data) => {
        alert("Book uploaded successfully!");
        form.reset();
        setBookCategory("");
      })
      .catch((err) => {
        console.error(err);
        alert("Error uploading book");
      });
  };

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Upload A Book!</h2>
      <form
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
        onSubmit={handleSubmit}
      >
        {/* First Row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <Label htmlFor="bookTitle" value="Book Title" />
            <TextInput
              id="bookTitle"
              name="bookTitle"
              placeholder="Book Name"
              required
              type="text"
            />
          </div>
          <div className="lg:w-1/2">
            <Label htmlFor="authorName" value="Author Name" />
            <TextInput
              id="authorName"
              name="authorName"
              placeholder="Author Name"
              required
              type="text"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <Label htmlFor="imageURL" value="Book Image URL" />
            <TextInput
              id="imageURL"
              name="imageURL"
              placeholder="Image URL"
              required
              type="text"
            />
          </div>
          <div className="lg:w-1/2">
            <Label htmlFor="categoryName" value="Book Category" />
            <TextInput
              id="categoryName"
              name="categoryName"
              placeholder="Enter category (e.g., Fiction)"
              required
              type="text"
              value={bookCategory}
              onChange={(e) => setBookCategory(e.target.value)}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="bookDescription" value="Book Description" />
          <Textarea
            id="bookDescription"
            name="bookDescription"
            placeholder="Book Description"
            required
            rows={4}
          />
        </div>

        {/* PDF Link */}
        <div>
          <Label htmlFor="bookPDFURL" value="Book PDF Link" />
          <TextInput
            id="bookPDFURL"
            name="bookPDFURL"
            placeholder="Paste Book PDF URL here"
            required
            type="text"
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="mt-5">
          Upload Book
        </Button>
      </form>
    </div>
  );
};

export default UploadBook;
