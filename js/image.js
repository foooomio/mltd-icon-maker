export const image = new Konva.Image({
  draggable: true,
});

export const setImage = (url) => {
  const img = new Image();
  img.onload = () => {
    image.scale({ x: 1, y: 1 });
    image.position({
      x: 250 - img.width / 2,
      y: 250 - img.height / 2,
    });
    image.image(img);
  };
  img.src = url;
};

image.on('mouseenter', () => {
  document.body.style.cursor = 'grab';
});

image.on('mouseleave', () => {
  document.body.style.cursor = null;
});

image.on('dragstart', () => {
  document.body.style.cursor = 'grabbing';
});

image.on('dragend', () => {
  document.body.style.cursor = 'grab';
});
