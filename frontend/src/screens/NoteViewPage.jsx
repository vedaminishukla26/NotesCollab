import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import http from '../axios';

const NoteViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await http.get(`/notes/${id}`);
        setNote(response.data);
      } catch (err) {
        setError('Could not fetch the note. It may not exist or you may not have permission to view it.');
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) {
    return <div className="text-center p-12">Loading note...</div>;
  }

  if (error) {
    return <div className="text-center p-12 text-red-600">{error}</div>;
  }

  if (!note) {
    return <div className="text-center p-12">Note not found.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/notes" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            &larr; Back to Dashboard
          </Link>
          <button
            onClick={() => navigate(`/notes/${note.id}/edit`)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            Edit
          </button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          {/* Note Content */}
          <article className="prose lg:prose-xl max-w-none">
            <h1>{note.title}</h1>
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </article>

          {/* Comments Section */}
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>
            <div className="space-y-6">
              {note.comments && note.comments.length > 0 ? (
                note.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start">
                    <div className="flex-shrink-0 bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center font-bold text-gray-600">
                      {comment.author?.username?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">{comment.author?.username || 'Anonymous'}</p>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
              {/* Add a form to post new comments here in the future */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NoteViewPage;
