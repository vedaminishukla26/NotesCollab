import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import http from '../axios'; 
import NoteCard from '../components/NoteCard';

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await http.get('/notes');
        setNotes(response.data);
      } catch (err) {
        setError('Failed to fetch notes. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
          <button
            onClick={() => navigate('/notes/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create New Note
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {loading && <p className="text-center text-gray-500">Loading notes...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.length > 0 ? (
              notes.map((note) => <NoteCard key={note.id} note={note} />)
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                You haven't created any notes yet.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default NotesListPage;
