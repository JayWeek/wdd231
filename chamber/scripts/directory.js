import setupNavigation from "./nav.mjs";
import { setCurrentYear, setLastModified } from "./date.mjs";

setupNavigation();
setCurrentYear();
setLastModified();


const memberContainer = document.querySelector('#memberContainer');
const url = 'data/members.json';
const gridbutton = document.querySelector("#gridViewBtn");
const listbutton = document.querySelector("#listViewBtn");


// Adding event listeners
gridbutton.addEventListener("click", () => {
	memberContainer.classList.add("grid-view");
	memberContainer.classList.remove("list-view");
});

listbutton.addEventListener('click', () =>{
    memberContainer.classList.add("list-view");
	memberContainer.classList.remove("grid-view");
})


// Async function
async function getCompanyData() {
    const response = await fetch(url);
    const data = await response.json();
    displayCompanies(data.companies);
}

const displayCompanies = (companies) => {
    // Clear placeholder content
    memberContainer.innerHTML = '';
    memberContainer.classList.remove('loading');

    companies.forEach(company => {
        const companyCard = document.createElement('section');
        const companyImage = document.createElement('img');
        const companyName = document.createElement('h3');
        const companyAddress = document.createElement('p');
        const companyPhone = document.createElement('p');
        const companyUrl = document.createElement('p');
        const companyLevel = document.createElement('p');
        const companyCategory = document.createElement('p');

        companyImage.setAttribute('src', company.image || 'placeholder.jpg');
        companyImage.setAttribute('alt', `Company picture of ${company.name}`);
        companyImage.setAttribute('loading', 'lazy');
        companyImage.setAttribute('width', '340');
        companyImage.setAttribute('height', '440');

        companyName.textContent = company.name;
        companyAddress.textContent = `Address: ${company.address}`;
        companyPhone.textContent = `Phone: ${company.phone}`;
        companyLevel.textContent = `Membership Level: ${company.level}`;
        companyCategory.textContent = `Category: ${company.category || 'Not specified'}`;

        const websiteLabel = document.createTextNode('Website: ');
        const websiteLink = document.createElement('a');
        websiteLink.href = company.url || '#';
        websiteLink.textContent = company.url || 'N/A';
        websiteLink.target = '_blank';
        websiteLink.rel = 'noopener noreferrer';

        companyUrl.appendChild(websiteLabel);
        companyUrl.appendChild(websiteLink);

        companyCard.appendChild(companyImage);
        companyCard.appendChild(companyName);
        companyCard.appendChild(companyAddress);
        companyCard.appendChild(companyPhone);
        companyCard.appendChild(companyUrl);
        companyCard.appendChild(companyLevel);
        companyCard.appendChild(companyCategory);

        memberContainer.appendChild(companyCard);
    });
};

// Run the fetch
getCompanyData();
