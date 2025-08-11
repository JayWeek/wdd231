import { toggleMenu } from "./menu.mjs";

const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', toggleMenu);
}