const express = require('express');
const path = require('path');
const os = require('os');
const youtubedl = require('youtube-dl-exec');

const router = express.Router();

router.post('/download', (req, res) => {
  const { url, type } = req.body;
  const downloadsDir = path.join(os.homedir(), 'Downloads');
  const videoOutputPath = path.join(downloadsDir, 'video.mp4');
  const audioOutputPath = path.join(downloadsDir, 'audio.mp3');

  if (type === 'audio') {
    youtubedl(url, {
      output: audioOutputPath,
      format: 'bestaudio',
    }).then(() => {
      console.log('Audio download complete!');
      res.json({ message: 'Audio download complete!', downloadPath: `/download/audio` });
    }).catch((err) => {
      console.error('Error downloading audio:', err);
      res.status(500).json({ message: 'Error downloading audio.' });
    });
  } else if (type === 'video') {
    youtubedl(url, {
      output: videoOutputPath,
      format: 'bestvideo',
    }).then(() => {
      console.log('Video download complete!');
      res.json({ message: 'Video download complete!', downloadPath: `/download/video` });
    }).catch((err) => {
      console.error('Error downloading video:', err);
      res.status(500).json({ message: 'Error downloading video.' });
    });
  }
});

router.get('/download/audio', (req, res) => {
  const downloadsDir = path.join(os.homedir(), 'Downloads');
  const audioOutputPath = path.join(downloadsDir, 'audio.mp3');
  
  res.download(audioOutputPath, 'audio.mp3', (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).json({ message: 'Error sending file.' });
    }
  });
});

router.get('/download/video', (req, res) => {
  const downloadsDir = path.join(os.homedir(), 'Downloads');
  const videoOutputPath = path.join(downloadsDir, 'video.mp4');
  
  res.download(videoOutputPath, 'video.mp4', (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).json({ message: 'Error sending file.' });
    }
  });
});

module.exports = router;