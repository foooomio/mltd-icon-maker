import { setupCanvas, getDataURL } from './canvas.js';
import { image, setImage } from './image.js';
import { setBadge } from './badge.js';

const $ = document.getElementById.bind(document);

$('upload').addEventListener('change', (e) => {
  if (image.image()) {
    URL.revokeObjectURL(image.image().src);
  }
  setImage(URL.createObjectURL(e.target.files[0]));
});

$('generate').addEventListener('click', () => {
  if (image.image()) {
    $('output').src = getDataURL();
  } else {
    alert('画像を選択してください。');
  }
});

$('badge').addEventListener('change', (e) => {
  setBadge(e.target.value);
});

$('tweet-button').addEventListener('click', () => {
  const url = new URL('https://twitter.com/intent/tweet');
  url.searchParams.set('text', $('tweet-text').value.trim());
  window.open(url);
});

setupCanvas();
