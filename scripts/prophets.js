const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

// creating async func

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets);
    displayProphets(data.prophets);
}

const displayProphets = (prophets) =>{
    prophets.forEach(prophet => {
        const prophetCard = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');
        const DOB = document.createElement('p');
        const POB = document.createElement('p');

        fullName.textContent = `${prophet.name}${prophet.lastname}`;
        DOB.textContent = `Date of Birth: ${prophet.birthdate}`;
        POB.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Building image with relevant attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Potrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Appending h2 and img to card
        prophetCard.appendChild(fullName);
        prophetCard.appendChild(DOB);
        prophetCard.appendChild(POB);
        prophetCard.appendChild(portrait);
        cards.appendChild(prophetCard);
    });
}


getProphetData();