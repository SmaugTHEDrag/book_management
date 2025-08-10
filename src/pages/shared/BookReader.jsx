import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BookReader() {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPdfUrl('');

    fetch(`http://localhost:8080/api/books/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch book data');
        }
        return res.json();
      })
      .then(data => {
        if (!data.pdf) {
          throw new Error('No PDF link provided');
        }
        const previewUrl = data.pdf.replace('/view', '/preview');
        setPdfUrl(previewUrl);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="w-full h-screen flex flex-col items-start justify-start bg-gray-100 p-4 mt-[60px]">
      {/* Link quay lại */}
      <Link
        to="/shop"
        className="text-black-700 hover:underline mb-10 block text-2xl lg:text-3xl font-bold flex items-center gap-2 self-start"
      >
        ← Back to Shop
      </Link>

      {loading && <p className="text-gray-600">Loading PDF...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {pdfUrl && !loading && !error && (
        <iframe
          src={pdfUrl}
          className="w-full h-[80vh] border-none shadow-lg rounded-lg"
          title="Book PDF Viewer"
        />
      )}
    </div>
  );
}
