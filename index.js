window.addEventListener('load', () => {
    /*alert("Please turn on location for this website to work")*/
    let long;
    let lat;
    let randomMessage = document.querySelector('.random-message');
    let currentContainer = document.querySelector('.current-weather');
    let location = document.querySelector('.location');
    let temp = document.querySelector('.temperature');
    let summary = document.querySelector('.summary');
    let img = document.getElementById('wicon');
    let body = document.querySelector('.body');
    let forecastContainer = document.querySelector('.forecast-container');
    let forecast = document.querySelector('.forecast');
    let forecastDate = document.querySelector('.date');
    let forecastImg = document.querySelector('.forecast-img');
    let forecastDescription = document.querySelector('.forecast-description');
    let realFeel = document.querySelector('.feels-like');
    let tomForecastDate = document.querySelector('.tom-date');
    let tomForecastImg = document.querySelector('.tom-forecast-img');
    let tomForecastDescription = document.querySelector('.tom-forecast-description');
    let tomRealFeel = document.querySelector('.tom-feels-like');
    let datForecastDate = document.querySelector('.dat-date');
    let datForecastImg = document.querySelector('.dat-forecast-img');
    let datForecastDescription = document.querySelector('.dat-forecast-description');
    let datRealFeel = document.querySelector('.dat-feels-like');
    let coolMessages = ['It is NOT blazing hot today.', 'It is kinda cool outside.', 'Is the AC on?'];
    let warmMessages = ['It is definitely NOT cold today.', 'It is toasty outside.', 'Did you forget to turn the oven off?'];

   
    
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
                    if(data.main.temp >= 80){
                        body.classList.toggle('warm')
                        currentContainer.classList.toggle('warm')
                        randomMessage.classList.toggle('cool')
                        forecastContainer.classList.toggle('warm')
                        randomMessage.innerHTML = warmMessages[Math.floor(Math.random() * 3)]
                    } else {
                        randomMessage.innerHTML = coolMessages[Math.floor(Math.random() * 3)]
                    }

                    
                })

                console.log(randomMessage.classList)

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
                        realFeel.textContent = Math.round(data.list[8].main.feels_like) + ' F';
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
                        tomRealFeel.textContent = Math.round(data.list[16].main.feels_like) + ' F';
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
                        datRealFeel.textContent = Math.round(data.list[24].main.feels_like) + ' F';
                    })
        })
    }
})