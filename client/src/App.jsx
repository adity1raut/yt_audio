import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [type, setType] = useState('audio');
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');

  const handleDownload = async () => {
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/download/', { url, type });
      toast.success(response.data.message);
      setDownloadLink(response.data.downloadPath);
    } catch (error) {
      toast.error(`Error downloading ${type}.`);
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      toast.success('URL pasted from clipboard');
    } catch (error) {
      toast.error('Failed to read clipboard contents');
    }
  };

  return (
    <div className="container">
      <div className="instareel-form">
        <h1 className="title">YouTube Downloader</h1>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} className="input select-box">
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>
        <div className="button-container">
          <button onClick={handlePaste} className="button">
            Paste
          </button>
          <button onClick={handleDownload} disabled={loading} className="button">
            {loading ? 'Downloading...' : 'Download'}
          </button>
        </div>
        {downloadLink && (
          <a href={`http://localhost:5000${downloadLink}`} download className="button download-button">
            Click here to download your {type} file
          </a>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;