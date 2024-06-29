const APIkey="Your_API_Key";  //Enter your API key here
const url="http://api.weatherapi.com/v1/";

window.addEventListener("load",() => fetchData("india")); //to fetch data on load

async function fetchData(query){ 
    const weather= await fetch(`${url}current.json?key=${APIkey}&q=${query}`); //current data
    const forecast= await fetch(`${url}forecast.json?key=${APIkey}&q=${query}&days=7`); //forecast data
    const data = await weather.json();
    const foredata = await forecast.json();
    //functions to bind data in template
    bindData(data); 
    bindForeData(foredata); 
}

function bindData(data){
    //to determine if it is day or night, and apply variables accordingly
    if (data.current.is_day==0){
        document.documentElement.style.setProperty('--primary-color', 'rgb(0,0,0)');
        document.documentElement.style.setProperty('--secondary-color', 'rgb(49, 29, 75)');
        document.documentElement.style.setProperty('--primary-text-color', 'rgb(255,255,255)');
        document.documentElement.style.setProperty('--filter-value', '60%');
    }
    else{
        document.documentElement.style.setProperty('--primary-color', 'rgb(100, 203, 255)');
        document.documentElement.style.setProperty('--secondary-color', 'rgb(180, 216, 225)');
        document.documentElement.style.setProperty('--primary-text-color', 'rgb(0,0,0)');
        document.documentElement.style.setProperty('--filter-value', '0');
    }
    
    const city= document.querySelector("#city");
    const looks= document.querySelector("#looks");
    const country= document.querySelector("#country");
    const icon=document.getElementById('icon');
    const date= document.querySelector("#date");
    const temp= document.querySelector("#temperature");
    const prec= document.querySelector("#precipitation");
    const humidity= document.querySelector("#humidity");
    const wind= document.querySelector("#wind");
    const feels= document.querySelector("#feels");
    
    icon.src=data.current.condition.icon;
    looks.innerHTML=data.current.condition.text;
    city.innerHTML=data.location.name;
    country.innerHTML=data.location.region;
    date.innerHTML=data.location.localtime;
    temp.innerHTML=`${Math.round(data.current.temp_c)}°C`;  //rounding off temperature to get rid of decimals
    prec.innerHTML=`Precipitation : ${data.current.precip_mm}mm`;
    humidity.innerHTML=`Humidity : ${data.current.humidity}`;
    wind.innerHTML=`Wind : ${data.current.wind_kph}Km/h`;
    feels.innerHTML=`Feels like : ${data.current.feelslike_c}°C`;
}

function bindForeData(foredata){  //forecast of the week
    const cardContainer = document.getElementById("cards");
    const cardTemplate = document.getElementById("template-card");
    cardContainer.innerHTML=" ";
    for(let i=1;i<=7;i++){
        const cardClone = cardTemplate.content.cloneNode(true);
        fillData(cardClone, foredata.forecast.forecastday[i]);
        cardContainer.appendChild(cardClone);
    }
}
function fillData(cardClone,content){  //filling forecast data
    cardClone.querySelector('#card-icon').src=content.day.condition.icon;
    cardClone.querySelector('#card-day').innerHTML= new Date(content.date_epoch *1000).toLocaleString('en-us', {weekday:'long'});
    cardClone.querySelector('#card-maxtemp').innerHTML=`${Math.round(content.day.maxtemp_c)}°C`;
    cardClone.querySelector('#card-mintemp').innerHTML=`${Math.round(content.day.mintemp_c)}°C`;
}

// search function 

const searchBar= document.getElementById("search-bar");
const searchBtn= document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
    const query = searchBar.value;
    if(!query) return;  //to check if no query provided
    fetchData(query); 
})

function view(){   //to view menu on phone
    const side = document.querySelector("#sidebar");
    side.classList.toggle('active');
}

