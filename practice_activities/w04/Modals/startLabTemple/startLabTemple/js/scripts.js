import { temples,url } from "../data/temples.js";
// console.log(temples);
// console.log(url);

const showHere = document.getElementById('showHere');
const mydialog = document.getElementById('mydialog');
const mytitle = document.querySelector('#mydialog h2');
const closeButton = document.querySelector('#mydialog button');
const myInfo = document.querySelector('#mydialog p');

closeButton.addEventListener('click', () => mydialog.close());


function displayItems(data) {
    // console.log(data);
    data.forEach(obj => {
        console.log(obj);
        const photo = document.createElement('img');
        photo.src = `${url} ${obj.path}`;
        photo.alt = obj.name;
        showHere.appendChild(photo);

        photo.addEventListener("click", () => showStuff(obj));
    });
    
}

displayItems(temples);

function showStuff(x) {
    mytitle.innerHTML = x.name;
    myInfo.textContent = `Dedicated ${x.dedicated} by ${x.person} as temple number ${x.number}`;
    mydialog.show();
    
}