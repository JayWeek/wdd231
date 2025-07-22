// select HTML elements in the document
const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.querySelector('figcaption');


const myLat = 49.75;
const myLon = 6.64;
const apiKey = '4499a24bacbce3135c85bb3790aa3c0d'

const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${apiKey}&units=metric`;


async function apiFetch() {
    try{
        const response =  await fetch(myURL);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            displayResults(data); 
        }
        else{
            throw Error(await response.text())
        }
    }catch (error){
        console.log(error);
    }
}

function displayResults(data){
    console.log('hello');
    currentTemp.innerHTML = `${data.main.temp}&degC`;
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('SRC', iconSrc);
    captionDesc.innerHTML = `${data.weather[0].description}`;

}

apiFetch();