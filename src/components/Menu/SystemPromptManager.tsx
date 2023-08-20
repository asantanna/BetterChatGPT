import { unparse } from 'papaparse';
import React from 'react';
import ReactDOM from 'react-dom';

const SystemPromptManager = ({ show, setShow, handleSave }) => {
    const [promptName, setPromptName] = React.useState('');
    const [systemPrompt, setSystemPrompt] = React.useState('');

    const handleCloseModal = () => {
        setShow(false);
        setPromptName('');
        setSystemPrompt('');
    };

    const handleSavePrompt = () => {
        const fileName = 'sys_prompt_' + promptName;
        const csvContent = unparse({
          fields: ['name', 'content'],
          data: [[promptName, systemPrompt]],
        });
        handleSave(fileName, csvContent);
        handleCloseModal();
      };
      
    return show ? ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/3 h-2/5">
                <h2 className="text-xl mb-4">Create New System Prompt</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="prompt-name">Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3" id="prompt-name" type="text" value={promptName} onChange={(e) => setPromptName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="system-prompt">System Prompt</label>
                    <textarea rows="4" className="shadow appearance-none border rounded w-full py-2 px-3" id="system-prompt" value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)}></textarea>
                </div>
                <div className="flex justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleSavePrompt}>Save</button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleCloseModal}>Cancel</button>
                </div>
            </div>
        </div>,
        document.body
    ) : null;
};

export default SystemPromptManager;
