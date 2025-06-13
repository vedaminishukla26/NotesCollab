import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import http from '../axios';
import { useSelector } from 'react-redux';

const CreateNotePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('# Your Note Title Here\n\nStart writing your note in **Markdown**...');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.auth.user)
    console.log("USer", user)
  const handleSubmit = async (e) => {
    console.log('here')
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
        console.log("REQ ", title, content, user)
      const response = await http.post('/notes', { title, content, userId: user.id });
      // On success, redirect to the newly created note's detail page
      navigate(`/notes/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create note. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        {/* Header Section */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between flex-shrink-0 z-10">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Note"
            required
            className="text-xl font-bold text-gray-800 border-b-2 border-transparent focus:border-indigo-500 focus:outline-none w-1/2 transition-colors duration-300"
          />
          <div className="flex items-center gap-4">
            <button
                type="button"
                onClick={() => navigate('/notes')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Saving...' : 'Save Note'}
            </button>
          </div>
        </header>

        {error && <div className="bg-red-100 text-red-700 p-3 text-center text-sm">{error}</div>}

        {/* Editor & Preview Panes */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
          {/* Editor Pane (Left) */}
          <div className="flex flex-col bg-white">
            <div className="p-2 border-b border-gray-200 bg-gray-50">
              <label htmlFor="content" className="font-semibold text-sm text-gray-600">EDITOR</label>
            </div>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your note in Markdown..."
              className="w-full h-full p-6 border-none rounded-md resize-none focus:outline-none font-mono text-gray-800 leading-relaxed"
              spellCheck="false"
            />
          </div>

          {/* Preview Pane (Right) */}
          <div className="flex flex-col bg-white overflow-y-auto">
            <div className="p-2 border-b border-gray-200 bg-gray-50">
              <h2 className="font-semibold text-sm text-gray-600">PREVIEW</h2>
            </div>
            <div className="p-6">
              {/* The `prose` class from @tailwindcss/typography styles the rendered HTML */}
              <article className="prose lg:prose-xl max-w-none">
                <ReactMarkdown>{content}</ReactMarkdown>
              </article>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNotePage;
