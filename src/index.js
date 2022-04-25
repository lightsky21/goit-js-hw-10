import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries'

const inputSearchEl = document.querySelector('input[id="search-box"]');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');


const DEBOUNCE_DELAY = 300;


inputSearchEl.addEventListener('input', debounce(oninputSearchElInput, DEBOUNCE_DELAY));


function oninputSearchElInput(e) {
    clear()

    let inputSearchElValue = inputSearchEl.value.trim();


    fetchCountries(inputSearchElValue).then(countries => {
        
     if (inputSearchElValue === '') {
         clear(); 
    } else if((countries.length > 1) & (countries.length <= 10)) {
         addMarkupList(countries)  
    } else if (countries.length === 1) {
         addMarkupCountry(countries);  
     } else { 
         Notify.info("Too many matches found. Please enter a more specific name.");
     }

    }).catch((error) => Notify.failure("Oops, there is no country with that name"))
    
}
 



function clear() {
countryListEl.innerHTML = '';
countryInfoEl.innerHTML = '';
};


function addMarkupList(countries) {
    countryInfoEl.innerHTML = '';
    
    const markupList = countries.map((country) => {
        return `<li class="country-list-item">
                <img src="${country.flags.svg}" alt="flag" class="flag-img">
                ${country.name.official}
               </li>`
            }).join("");
    countryListEl.innerHTML = markupList;
}
            

function addMarkupCountry(countries) {
    countryListEl.innerHTML = '';
      const languages = Object.values(countries[0].languages).join(', ');

      const markupInfo = `<span class="country-info-name"><img src="${countries[0].flags.svg}" alt="flag" class="flag-img">${countries[0].name.official}</span><ul class="country-info-list">
      <li class="country-info-item">Capital: ${countries[0].capital}</li>
      <li class="country-info-item">Population: ${countries[0].population}</li>
      <li class="country-info-item">Languages: ${languages}</li>
      </ul>`;
        countryInfoEl.innerHTML = markupInfo;}