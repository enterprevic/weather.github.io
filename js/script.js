window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperatureDescription");
    let temperatureDegree = document.querySelector(".temperatureDegree");
    let locationTimezone = document.querySelector(".locationTimezone");
    let weatherIcon = document.querySelector("#wicon");
    let temperatureSpan = document.querySelector("#temperatureSpan");
    let temperatureSection = document.querySelector(".temperature");
    let locationSearch = document.querySelector("#search-location");
    let searchButton = document.querySelector("#search-button").addEventListener("click", () => {
        if(locationSearch.value.length > 0){
        event.preventDefault();
            
            
        console.log(locationSearch.value);
        }
    })
    
    let enterListener = document.querySelector("#search-location").addEventListener("keydown", function(event) {
  // Number 13 is the "Enter" key on the keyboard
    if(locationSearch.value.length > 0){
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    //event.preventDefault();
    console.log(locationSearch.value);
  }
  }
});
    
    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = "https://api.openweathermap.org/data/2.5/onecall?lat="
            const apiKey = "&exclude=hourly,daily&units=imperial&appid=68b27ac5679fe55964e8606253a0001e";
            const apiURL = api + lat + "&lon=" + long + apiKey;
            
            //if(locationSearch.value.length>0){
           // const api = "https://api.openweathermap.org/data/2.5/weather?q=
           // const apiKey = "&appid=68b27ac5679fe55964e8606253a0001e";
           // const apiUrl = api + locationSearch.value + apiKey;
           // }
            
            // TRY
            
            
            let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: position.coords.latitude, lng: position.coords.longitude },
    zoom: 10,
  });
  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("📍");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
            
            
            //TRY

            fetch(apiURL)
                .then(response => {
                    return response.json();

                })
                .then(info => {
                console.log(info);
                
                
                //Change temperature to celuis/fahrenheit
                temperatureSection.addEventListener("click", () =>{
                    if(temperatureSpan.textContent === "°F"){
                    temperatureDegree.textContent = celcius; 
                    temperatureSpan.textContent = "°C";}
                    else {
                        temperatureDegree.textContent = temp;
                        temperatureSpan.textContent = "°F";
                    };

                })
                initMap();
                

                    const temp = info.current.temp;
                //Turns the String first Letter to Capital
                    const weather = info.current.weather[0].description;
                
const upperWeather = info.current.weather[0].description.charAt(0).toUpperCase()+ info.current.weather[0].description.slice(1);
                
                    const zone = info.timezone;
                    var iconcode = info.current.weather[0].icon;
                    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
var celcius = (Math.round(parseInt(temp)-32) * 5/9).toFixed(2);
                    //FIXIING IN DOM ELEMENTS
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = upperWeather;
                    locationTimezone.textContent = zone;
                    //WEATHER ICON**
                    weatherIcon.src = iconurl;
                });
        });
    } else  
    {
        const bodyText = document.querySelector("#bodytext");
        
        bodyText.innerHTML = "<h1>Please allow location!</h1>";
        bodyText.innerHTML += "<p>How can we know the weather around you if we don't know how to locate you? Think about it.</p>";
    }
});
