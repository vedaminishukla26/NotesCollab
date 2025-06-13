import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import http from '../axios';

const NoteEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewNote = id === 'new';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.auth.user)
  console.log("USer", user)

  useEffect(() => {
    if (!isNewNote) {
      setLoading(true);
      http.get(`/notes/${id}`)
        .then(response => {
          setTitle(response.data.title);
          setContent(response.data.content);
        })
        .catch(() => setError('Failed to load note data.'))
        .finally(() => setLoading(false));
    }
  }, [id, isNewNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = { title, content, userId: user.id };
    
    try {
      let response;
      if (isNewNote) {
        response = await http.post('/notes', payload);
      } else {
        response = await http.put(`/notes/${id}`, payload);
      }
      navigate(`/notes/${response.data.id || id}`); // Redirect to the note view after saving
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save note.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !content) return <p className="text-center p-8">Loading editor...</p>;
  if (error && !content) return <p className="text-center text-red-500 p-8">{error}</p>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            required
            className="text-xl font-bold text-gray-800 border-b-2 border-transparent focus:border-indigo-500 focus:outline-none w-1/2"
          />
          <div className="flex items-center gap-4">
            <button
                type="button"
                onClick={() => navigate('/notes')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
            >
              {loading ? 'Saving...' : 'Save Note'}
            </button>
          </div>
        </header>

        {error && <div className="bg-red-100 text-red-700 p-3 text-center">{error}</div>}

        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {/* Markdown Editor */}
          <div className="flex flex-col">
            <label htmlFor="content" className="font-semibold mb-2 text-gray-700">Editor</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your note in Markdown..."
              className="w-full h-full p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>
          {/* Markdown Preview */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-700">Preview</label>
            <div className="prose w-full h-full p-4 border border-gray-300 rounded-md bg-white overflow-y-auto">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NoteEditorPage;
