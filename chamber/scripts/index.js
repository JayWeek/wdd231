import setupNavigation from './nav.mjs';
import { setCurrentYear, setLastModified } from './date.mjs';

setupNavigation();
setCurrentYear();
setLastModified();


// Fetching api data
const myLat = 0.32; 
const myLon = 32.57;
const apiKey = '4499a24bacbce3135c85bb3790aa3c0d'
const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${apiKey}&units=metric`;
const myURL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${apiKey}&units=metric`;


async function fetchApi() {
    try {
        const response = await fetch(myURL);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        }
        else{
            throw Error(await response.text());
        }
        
    } catch (error) {
        console.log(error);
    }
}

 fetchApi();


 function displayResults(data) {
    const h2 = document.createElement('h2');
    h2.textContent = "Current Weather"
    
    const weatherLeft = document.createElement('div')
    weatherLeft.classList.add('weather-left');

    const weatherIcon = document.createElement('img')
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('SRC', iconSrc);
    weatherIcon.setAttribute('alt', 'weather icon');

    const weatherRight = document.createElement('div')
    weatherRight.classList.add('weather-right');

    const temperature = document.createElement('p');
    temperature.innerHTML = `${data.main.temp}&degC`;
    

    const descriptionWeather = document.createElement('p');
    descriptionWeather.textContent = `${data.weather[0].description}`;

    const tempHigh = document.createElement('p');
    const tempLow = document.createElement('p');
    const humidity = document.createElement('p');

    tempHigh.textContent = `High: ${data.main.temp_max}°`;
    tempLow.textContent = `High: ${data.main.temp_min}°`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;


    weatherRight.appendChild(temperature);
    weatherRight.appendChild(descriptionWeather);
    weatherRight.appendChild(tempHigh);
    weatherRight.appendChild(tempLow);
    weatherRight.appendChild(humidity);

    const currentWeatherInner = document.querySelector(".currentWeatherInner");
    
    weatherLeft.appendChild(weatherIcon);
    document.getElementById("currentWeather").appendChild(h2);
    document.getElementById("currentWeather").appendChild(currentWeatherInner);
    currentWeatherInner.appendChild(weatherLeft);
    currentWeatherInner.appendChild(weatherRight);    
 }


 async function getThreeDayForecast() {
    try {
        const response = await fetch(myURL2);
        if (response.ok) {
            const data = await response.json();
            displayFutureResults(data);
        }
        else{
            throw Error(await response.text());
        }
        
    } catch (error) {
        console.log(error);
    }
 }
getThreeDayForecast();


 function displayFutureResults(data) {
    const forecast = document.getElementById('forecast');
    const h2 = document.createElement('h2');
    h2.textContent = "Weather Forecast"

    const today = document.createElement('p');
    const Tuesday = document.createElement('p');
    const Wednesday = document.createElement('p');

    today.innerHTML = `Today: <span class="temp">${data.list[1].main.temp}℃</span>`;
    Tuesday.innerHTML = `Tuesday: <span class="temp">${data.list[3].main.temp}℃</span>`;
    Wednesday.innerHTML = `Wednesday: <span class="temp">${data.list[11].main.temp}℃</span>`;


    forecast.appendChild(h2);
    forecast.appendChild(today);
    forecast.appendChild(Tuesday);
    forecast.appendChild(Wednesday);

 }


//  *****************************************BUSINESS CARDS *****************************

const url = 'data/members.json';

async function getCompany() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const companies = data.companies;

      const highLevelCompanies = companies.filter(company => company.level >= 2);

      const pickedIndexes = new Set(); // To track unique picks
      let count = 0;

      while (count < 3 && pickedIndexes.size < highLevelCompanies.length) {
        const randomIndex = Math.floor(Math.random() * highLevelCompanies.length);
        
        if (!pickedIndexes.has(randomIndex)) {
          pickedIndexes.add(randomIndex);
          const company = highLevelCompanies[randomIndex];
          displayCompany(company);
          count++;
        }
      }
    }
    else{
      throw Error(error);
    }
  } catch (error) {
    console.log(error);
  }
}

getCompany();


function displayCompany(company) {
  const businessShowcase = document.querySelector('.business-showcase');

  const businessCard = document.createElement('div');
  businessCard.classList.add('business-card');

  const bussinessInner = document.createElement('div');
  bussinessInner.classList.add('business-card-inner-container');//inject this to bussinessShowcase. It is grid 2 columns

  const businessLeft = document.createElement('div');
  businessLeft.classList.add('business-left');//image of company will be placed here. Inject to bussinessInner

  const businessRight = document.createElement('div');
  businessRight.classList.add('business-right');//address, url, and phone. Inject to bussinessInner

  const companyName = document.createElement('h2');
  companyName.textContent = company.name;
  
  const companyPhone = document.createElement('p');
  companyPhone.textContent = `Phone: ${company.phone}`;

  const companyUrl = document.createElement('p');
  companyUrl.textContent = `URL: ${company.url}`;

  const companyAddress = document.createElement('p');
  companyAddress.textContent = `Address: ${company.address}`;

  const membershipLevel = document.createElement('p');
  membershipLevel.textContent = `Level: ${company.level}`;

  // Setting image attributes
  const companyImage = document.createElement('img');
  companyImage.setAttribute('src', company.image);
  companyImage.setAttribute('alt', `logo of ${company.name}`);
  companyImage.setAttribute('loading', 'lazy');
  

  // Appending
  businessShowcase.appendChild(businessCard);
  businessCard.appendChild(companyName);
  businessCard.appendChild(bussinessInner);
  bussinessInner.appendChild(businessLeft);
  bussinessInner.appendChild(businessRight);

  // Appending data
  businessLeft.appendChild(companyImage);
  businessRight.appendChild(companyAddress);
  businessRight.appendChild(companyPhone);
  businessRight.appendChild(companyUrl);
  businessRight.appendChild(membershipLevel);
  
}
