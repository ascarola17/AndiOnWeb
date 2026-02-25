/**
 * Polaroid gallery data
 * ─────────────────────────────────────────────
 * To add a new photo:
 *   1. Drop the image file into /public/polaroids/
 *   2. Add one entry to this array below.
 *      { src, alt, caption }  — href is optional (wraps photo in a link)
 *
 * Photos live at /public/polaroids/ so they're served at /polaroids/<filename>
 * — no webpack imports, no code changes outside this file.
 */

const polaroids = [
  {
    src: '/polaroids/Climb.jpg',
    alt: 'Rock climbing on a wall',
    caption: "Sandy's Rock Wall",
  },
  {
    src: '/polaroids/FunnyGym.JPG',
    alt: 'Funny gym moment',
    caption: 'Gym Shenanigans',
  },
  {
    src: '/polaroids/Friends.JPG',
    alt: 'Friends group photo',
    caption: 'Bikini Bottom Friends',
  },
  {
    src: '/polaroids/LaserTag.JPG',
    alt: 'Laser tag game',
    caption: 'Jellyfish Fields',
  },
  {
    src: '/polaroids/Pinball.JPG',
    alt: 'Pinball machine at an arcade',
    caption: 'Goo Lagoon Arcade',
  },
  {
    src: '/polaroids/5k.JPG',
    alt: '5K race finish',
    caption: 'Goo Lagoon 5K',
  },
];

export default polaroids;
