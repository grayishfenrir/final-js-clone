function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lng =position.coords.longitude;
    console.log(lat,lng);
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=54f83bbeb5a999a4e6d4da946c262228&units=metric`
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        const weather = document.querySelector(".weather span:first-child");
        const city = document.querySelector(".weather span:last-child");
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp} °`;
    });
}

function onGeoError(position) {
    alert("Fail to load your position.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);