import { frame } from './frame.js';
import { image } from './image.js';
import { logo } from './logo.js';
import { badge } from './badge.js';

export const stage = new Konva.Stage({
  container: 'container',
  width: 500,
  height: 500,
});

export const imageLayer = new Konva.Layer();
export const frameLayer = new Konva.Layer();

export const setupCanvas = () => {
  stage.add(imageLayer);
  stage.add(frameLayer);

  imageLayer.add(image);
  imageLayer.add(logo);
  imageLayer.add(badge);
  frameLayer.add(frame);
};

export const getDataURL = () =>
  imageLayer.toDataURL({
    x: 50,
    y: 50,
    width: 400,
    height: 400,
  });

stage.on('wheel', (e) => {
  if (!image.getImage()) return;

  e.evt.preventDefault();

  const step = 0.005;
  const minScale = 0.1;

  const pointer = stage.getPointerPosition();

  const oldScale = image.scaleX();
  const newScale = Math.max(oldScale - e.evt.deltaY * step, minScale);

  const pointToX = (pointer.x - image.x()) / oldScale;
  const pointToY = (pointer.y - image.y()) / oldScale;

  image.scale({ x: newScale, y: newScale });
  image.position({
    x: pointer.x - pointToX * newScale,
    y: pointer.y - pointToY * newScale,
  });
});

Konva.hitOnDragEnabled = true;

let lastCenter = null;
let lastDistance = 0;

const getDistance = (p1, p2) =>
  Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

const getCenter = (p1, p2) => ({
  x: (p1.x + p2.x) / 2,
  y: (p1.y + p2.y) / 2,
});

stage.on('touchmove', (e) => {
  if (!image.getImage()) return;

  e.evt.preventDefault();

  const [touch1, touch2] = e.evt.touches;

  if (!touch1 || !touch2) return;

  if (image.isDragging()) {
    image.stopDrag();
  }

  const p1 = {
    x: touch1.clientX,
    y: touch1.clientY,
  };
  const p2 = {
    x: touch2.clientX,
    y: touch2.clientY,
  };

  const newCenter = getCenter(p1, p2);

  if (!lastCenter) {
    lastCenter = newCenter;
    return;
  }

  const distance = getDistance(p1, p2);

  if (!lastDistance) {
    lastDistance = distance;
  }

  const oldScale = image.scaleX();
  const newScale = distance / lastDistance * oldScale;

  const pointToX = (newCenter.x - image.x()) / oldScale;
  const pointToY = (newCenter.y - image.y()) / oldScale;

  const dx = newCenter.x - lastCenter.x;
  const dy = newCenter.y - lastCenter.y;

  image.scale({ x: newScale, y: newScale });
  image.position({
    x: newCenter.x - pointToX * newScale + dx,
    y: newCenter.y - pointToY * newScale + dy,
  });

  lastCenter = newCenter;
  lastDistance = distance;
});

stage.on('touchend', () => {
  lastCenter = null;
  lastDistance = 0;
});
