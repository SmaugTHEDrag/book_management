import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BookReader() {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://book-management-backend-d481.onrender.com/api/books/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch book data');
        return res.json();
      })
      .then(data => {
        if (!data.pdf) throw new Error('No PDF link provided');

        // Đảm bảo encode đúng URL của file PDF
        const pdfPath = encodeURIComponent(data.pdf);

        // Trỏ đúng vào ViewerJS trong public
        setPdfUrl(`/ViewerJS/#${pdfPath}`);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 p-4 mt-[60px]">
      <Link to="/shop" className="mb-10 text-2xl font-bold">
        ← Back to Shop
      </Link>

      {loading && <p>Loading PDF...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          className="w-full h-[80vh] border-none"
          title="PDF Viewer"
        />
      )}
    </div>
  );
}
