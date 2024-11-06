import express from 'express';
import { createCanvas } from 'canvas';

const router = express.Router();

router.get('/avatar', (req, res) => {
  const username = req.query.username || 'User';
  const initials = username
    .split(' ')
    .map(name => name[0].toUpperCase())
    .join('')
    .slice(0, 2);

  const width = 100;
  const height = 100;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Background color
  context.fillStyle = '#007bff'; // You can randomize this color if needed
  context.fillRect(0, 0, width, height);

  // Initials text
  context.font = 'bold 50px Arial';
  context.fillStyle = '#ffffff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(initials, width / 2, height / 2);

  // Set the response header to be an image
  res.setHeader('Content-Type', 'image/png');
  canvas.pngStream().pipe(res);
});

export default router;
