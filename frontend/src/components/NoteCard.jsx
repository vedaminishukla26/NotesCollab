import React from 'react';
import { useNavigate } from 'react-router-dom';

// A simple function to truncate text
const truncateText = (text, length) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

// A simple function to format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const NoteCard = ({ note, onDelete }) => {
  const navigate = useNavigate();

  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent the card's onClick from firing
    navigate(`/notes/${note.id}/edit`);
  };

  const handleCardClick = () => {
    navigate(`/notes/${note.id}`); // Navigate to the full note view
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className="p-6 flex-grow flex">
        {/* Left Side: Metadata */}
        <div className="w-1/3 pr-4 border-r border-gray-200 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{note.title}</h3>
          <div className="text-xs text-gray-500 space-y-1 mt-auto">
            <p>
              <strong>Created:</strong> {formatDate(note.createdAt)}
            </p>
            <p>
              <strong>Author:</strong> {note.createdById || 'N/A'}
            </p>
          </div>
        </div>

        {/* Right Side: Content Preview */}
        <div className="w-2/3 pl-4 relative">
          <p className="text-sm text-gray-600">
            {truncateText(note.content, 150)}
          </p>
          <button
            onClick={handleEditClick}
            className="top-0 right-0 p-1 text-gray-400 hover:text-indigo-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Edit note"
          >
            {/* Pencil Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-1.5 bg-red text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Delete note"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
