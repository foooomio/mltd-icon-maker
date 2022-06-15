export const badge = new Konva.Image({
  scaleX: 0.6,
  scaleY: 0.6,
  listening: false,
});

const getImage = (value) => {
  const img = new Image();
  img.src = `/image/${value}.png`;
  return img;
};

const badges = {
  '4th_badge': {
    img: getImage('4th_badge'),
    position: {
      x: 55,
      y: 225,
    },
  },
  '5th_badge': {
    img: getImage('5th_badge'),
    position: {
      x: 62,
      y: 225,
    },
  },
};

export const setBadge = (value) => {
  badge.hide();

  if (value === 'none') return;

  badge.image(badges[value].img);
  badge.setPosition(badges[value].position);
  badge.show();
};
