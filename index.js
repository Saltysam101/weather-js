window.addEventListener('load', () => {
    let long;
    let lat;
    let location = document.querySelector('.location');
    let temp = document.querySelector('.temperature');
    let summary = document.querySelector('.summary');
    let  img = document.getElementById('wicon');
    let body = document.querySelector('.body');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;


            let key = 'b9a6caefa78fd3c968bf83fce960369a';
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=imperial`;

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
                    console.log(iconurl)
                    img.setAttribute("src", iconurl)
                    if(data.main.temp > 85){
                        body.classList.toggle('warm')
                    }
                    
                })
        })
    }
})