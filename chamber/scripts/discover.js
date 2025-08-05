
import { showVisitMessage } from './visitTracker.mjs';
import setupNavigation from './nav.mjs';
import { setCurrentYear, setLastModified } from './date.mjs';



document.addEventListener('DOMContentLoaded', () => {
  showVisitMessage();
});

setupNavigation();
setCurrentYear();
setLastModified();

const url = 'data/places.json';

async function getPlaceData() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayCards(data);
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Failed to fetch company data:', error);
    }
}

getPlaceData();

function displayCards(places) {
    const section = document.getElementById("cardSection");

    places.forEach(place => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
        <h2>${place.title}</h2>
        <figure>
          <img src="${place.image}" alt="${place.title}">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>
      `;

        section.appendChild(card);
    });
}