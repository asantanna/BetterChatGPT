
// Hardwired directory path for saving the CSV files
const HARDWIRED_DIRECTORY_PATH = 'E:/tmp/BCG_prompt_dir';

// Function to make the PUT request to save the CSV file
const saveCSVFile = (filePath, content) => {
  fetch('/api/write_file', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filePath, content }),
  })
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.error('Error:', error));
};

// Function to handle saving the prompt
const handleSavePrompt = (promptName, systemPrompt) => {
  const fileName = HARDWIRED_DIRECTORY_PATH + '/sys_prompt_' + promptName + '.csv';
  const csvContent = [['prompt_name', 'prompt'], [promptName, systemPrompt]].join('\n');

  // Calling the function to make the PUT request
  saveCSVFile(fileName, csvContent);
};

export { handleSavePrompt };

// Default export
export default handleSavePrompt;