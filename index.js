window.addEventListener('load', () => {
    let long;
    let lat;
    let location = document.querySelector('.location');
    let temp = document.querySelector('.temperature');
    let summary = document.querySelector('.summary');
    let  img = document.getElementById('wicon');
    let body = document.querySelector('.body');
    let forecast = document.querySelector('.forecast');
    let forecastDate = document.querySelector('.date');
    let forecastImg = document.querySelector('.forecast-img');
    let forecastDescription = document.querySelector('.forecast-description');
    let maxTemp = document.querySelector('.max-temp');
    let minTemp = document.querySelector('.min-temp');
    let realFeel = document.querySelector('.feels-like');
    let tomForecastDate = document.querySelector('.tom-date');
    let tomForecastImg = document.querySelector('.tom-forecast-img');
    let tomForecastDescription = document.querySelector('.tom-forecast-description');
    let tomMaxTemp = document.querySelector('.tom-max-temp');
    let tomMinTemp = document.querySelector('.tom-min-temp');
    let tomRealFeel = document.querySelector('.tom-feels-like');
    let datForecastDate = document.querySelector('.dat-date');
    let datForecastImg = document.querySelector('.dat-forecast-img');
    let datForecastDescription = document.querySelector('.dat-forecast-description');
    let datMaxTemp = document.querySelector('.dat-max-temp');
    let datMinTemp = document.querySelector('.dat-min-temp');
    let datRealFeel = document.querySelector('.dat-feels-like');
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;


            let key = 'b9a6caefa78fd3c968bf83fce960369a';
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=imperial`;
            const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}&units=imperial
`
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    summary.textContent = data.weather[0].description;
                    location.textContent = data.name;
                    temp.textContent = Math.round(data.main.temp) + ' F';
                    let iconcode = data.weather[0].icon;
                    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    img.setAttribute("src", iconurl)
                    if(data.main.temp >= 85){
                        body.classList.toggle('warm')
                    }

                    
                })

                fetch(forecastApi)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        let newDate = new Date;
                        let day = newDate.getDate() + 1;
                        let month = newDate.getMonth() + 1;
                        forecastDate.textContent = month + '/' + day;
                        let iconcode = data.list[8].weather[0].icon;
                        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        forecastImg.setAttribute("src", iconurl);
                        forecastDescription.textContent = data.list[8].weather[0].description;
                        maxTemp.textContent = 'Max temp: ' + Math.round(data.list[8].main.temp_max) + ' F';
                        realFeel.textContent = 'Real feel: ' + Math.round(data.list[8].main.feels_like) + ' F';
                        minTemp.textContent = 'Min temp: ' + Math.round(data.list[8].main.temp_min) + ' F';
                    })

                    fetch(forecastApi)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        let newDate = new Date;
                        let day = newDate.getDate() + 2;
                        let month = newDate.getMonth() + 1;
                        tomForecastDate.textContent = month + '/' + day;
                        let iconcode = data.list[16].weather[0].icon;
                        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        tomForecastImg.setAttribute("src", iconurl);
                        tomForecastDescription.textContent = data.list[16].weather[0].description;
                        tomMaxTemp.textContent = 'Max temp: ' + Math.round(data.list[16].main.temp_max) + ' F';
                        tomRealFeel.textContent = 'Real feel: ' + Math.round(data.list[16].main.feels_like) + ' F';
                        tomMinTemp.textContent = 'Min temp: ' + Math.round(data.list[16].main.temp_min) + ' F';
                    })

                    fetch(forecastApi)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        let newDate = new Date;
                        let day = newDate.getDate() + 3;
                        let month = newDate.getMonth() + 1;
                        datForecastDate.textContent = month + '/' + day;
                        let iconcode = data.list[16].weather[0].icon;
                        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        datForecastImg.setAttribute("src", iconurl);
                        datForecastDescription.textContent = data.list[24].weather[0].description;
                        datMaxTemp.textContent = 'Max temp: ' + Math.round(data.list[24].main.temp_max) + ' F';
                        datRealFeel.textContent = 'Real feel: ' + Math.round(data.list[24].main.feels_like) + ' F';
                        datMinTemp.textContent = 'Min temp: ' + Math.round(data.list[24].main.temp_min) + ' F';
                    })
        })
    }
})