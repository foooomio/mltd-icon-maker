export const logo = new Konva.Image({
  x: 115,
  y: 300,
  scaleX: 0.5,
  scaleY: 0.5,
  listening: false,
});

const img = new Image();
img.onload = () => { logo.image(img); };
img.src = '/image/logo.png';
