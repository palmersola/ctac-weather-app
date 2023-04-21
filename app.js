const APIKey = "1d19cda4c60cdb1c9b264ede49ac9a5e";
let form = document.getElementById("form");
let zip = document.getElementById("zip");

function setWeather(city) {
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?zip=${city},us&appid=${APIKey}&units=imperial`;
  fetch(queryURL)
    .then(response => response.json())
    .then(data => {
      let queryURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord
        .lon}&appid=${APIKey}&units=imperial&exclude=hourly,minutely`;
      let current = document.getElementById("current");
      current.innerHTML = "";
      let date = new Date(data.dt * 1000);
      let dateFormat = date.toLocaleDateString();
      let img = data.weather[0].icon;
      let h2 = document.createElement("h2");
      let imgTag = document.createElement("img");
      let p1 = document.createElement("p");
      let p2 = document.createElement("p");
      let p3 = document.createElement("p");
      let p4 = document.createElement("p");

      h2.innerText = `${data.name} ${dateFormat}`;
      imgTag.setAttribute("src", `https://openweathermap.org/img/wn/${img}@4x.png`);
      p1.innerText = `Current Temp: ${data.main.temp}f`;
      p2.innerText = `Feels like: ${data.main.feels_like}f`;
      p3.innerText = `HI/LO: ${data.main.temp_max}f/${data.main.temp_min}f`;
      p4.innerText = `Current Conditions: ${data.weather[0].description}`;
      current.append(h2, imgTag, p1, p2, p3, p4);

      fetch(queryURL2).then(response => response.json()).then(data => {
        let weekly = document.getElementById("fiveDay");
        weekly.innerHTML = "";
        for (i = 0; i < 4; i++) {
          let div = document.createElement("div");
          div.classList.add("fiveDay");
          let date = new Date(data.daily[i].dt * 1000);
          let dateFormat = date.toLocaleDateString();
          let img = data.daily[i].weather[0].icon;
          let h3 = document.createElement("h3");
          let imgTag = document.createElement("img");
          let p1 = document.createElement("p");
          let p2 = document.createElement("p");

          h3.innerText = dateFormat;
          imgTag.setAttribute("src", `https://openweathermap.org/img/wn/${img}@2x.png`);
          p1.innerText = `HI/LO: ${data.daily[i].temp.max}f/${data.daily[i].temp.min}f`;
          p2.innerText = `Expect ${data.daily[i].weather[0].description}`;
          div.append(h3, imgTag, p1, p2);
          weekly.append(div);
        }
      });
    })
    .catch(err => {
      alert("Zipcode not found");
    });
}
setWeather("55112");

form.addEventListener("submit", e => {
  e.preventDefault();
  let input = zip.value;
  setWeather(input);
  zip.value = "";
});
