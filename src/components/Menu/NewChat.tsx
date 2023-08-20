import PopupModal from '@components/PopupModal';
import handleSavePrompt from '@components/Menu/SystemPromptManager';

import React, { useState } from 'react';
import PlusIcon from '@icon/PlusIcon'; // Make sure to import the PlusIcon component
import './ContextMenu.css'; // Importing the CSS file for styling

const NewChat = ({ folder, generating, addChat, t }) => {
  const [contextMenuPosition, setContextMenuPosition] = useState(null);

  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');


  // Sample dynamic entries
  const items = ['item A', 'item B'];

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const handleCloseContextMenu = () => {
    setContextMenuPosition(null);
  };

  
const handleSave = () => {
    // Calling the handleSavePrompt function from the SystemPromptManager with the required parameters
    handleSavePrompt(name, systemPrompt);
    setShowDialog(false);
};


  
  const handleNewEntry = () => {
    setShowDialog(true);
    handleCloseContextMenu();
  };


  return (
    <div>
      <a
        className={`flex flex-1 items-center rounded-md hover:bg-gray-500/10 transition-all duration-200 text-white text-sm flex-shrink-0 ${
          generating
            ? 'cursor-not-allowed opacity-40'
            : 'cursor-pointer opacity-100'
        } ${
          folder ? 'justify-start' : 'py-2 px-2 gap-3 mb-2 border border-white/20'
        }`}
        onClick={() => {
          if (!generating) addChat(folder);
        }}
        title={folder ? String('New Chat') : ''}
        onContextMenu={handleContextMenu} // Right-click listener for context menu
      >
        {folder ? (
          <div className='max-h-0 parent-sibling-hover:max-h-10 hover:max-h-10 parent-sibling-hover:py-2 hover:py-2 px-2 overflow-hidden transition-all duration-200 delay-500 text-sm flex gap-3 items-center text-gray-100'>
            <PlusIcon /> {'New Chat'}
          </div>
        ) : (
          <>
            <PlusIcon />
            <span className='inline-flex text-white text-sm'>{'newChat'}</span>
          </>
        )}
      </a>

      {contextMenuPosition && (
        <div
          className="context-menu"
          style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
          onMouseLeave={handleCloseContextMenu}
        >
          {items.map((item, index) => (
            <div key={index} className="context-menu-option">
              {item}
            </div>
          ))}
          <hr /> {/* Separator */}
          <div className="context-menu-option" onClick={handleNewEntry}>
            New...
          </div>
        </div>
      )}

{showDialog && (
  <PopupModal setIsModalOpen={setShowDialog} cancelButton={false}>
    <div className='dialog-container'>
        <label className='dialog-label'>Name:</label>
        <input type="text" className='dialog-input' onChange={(e) => setName(e.target.value)} />
        <label className='dialog-label'>System Prompt:</label>
        <textarea className='dialog-textarea' onChange={(e) => setSystemPrompt(e.target.value)} rows='5'></textarea>
        
      <div className='dialog-buttons'>
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setShowDialog(false)}>Cancel</button>
      </div>
    </div>
  </PopupModal>
)}

    </div>
  );
};

export default NewChat;