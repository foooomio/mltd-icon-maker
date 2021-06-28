export const badge = new Konva.Image({
  x: 55,
  y: 225,
  scaleX: 0.6,
  scaleY: 0.6,
  listening: false,
});

export const setBadge = (value) => {
  if (value === 'none') {
    badge.hide();
  } else {
    const img = new Image();
    img.onload = () => { badge.image(img); };
    img.src = `/image/${value}.png`;
    badge.show();
  }
};
