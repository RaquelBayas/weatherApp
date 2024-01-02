import { useState } from "react";
import "./App.css";
import Swal from "sweetalert2";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${
    import.meta.env.VITE_API_KEY
  }`;
  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${
    import.meta.env.VITE_API_KEY
  }`;
  const urlIcon = `https://openweathermap.org/img/wn/`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.cod);
          if (data.cod === 200) {
            setData(data);
            setLocation("");
            searchForecast();
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const searchForecast = async () => {
    fetch(urlForecast)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="container">
      <div>
        <nav>
          <h1 className="title">Weather app</h1>
        </nav>
      </div>
      <div className="search">
        <input
          type="text"
          name="location"
          id="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={(event) => searchLocation(event)}
          placeholder="Enter location..."
        />
      </div>

      {data.weather && (
        <div className="card">
          <div className="location">
            <h1>{data.name}</h1>
          </div>
          <div className="temperature">
            {data.main ? (
              <h1>
                <span className="degrees">
                  {Math.floor(parseFloat(data.main.temp) - 273.15)}
                </span>
                <span id="symbol_temp">&#186;</span>C
              </h1>
            ) : null}
          </div>
          <div>
            {data.weather && (
              <>
                <img src={urlIcon + data.weather[0].icon + "@2x.png"} />
                <h2>
                  {data.weather[0].description.charAt(0).toUpperCase() +
                    data.weather[0].description.slice(1)}
                </h2>
              </>
            )}
          </div>
          <div>
            <div className="humidity">
              {data.weather ? <p>Humidity: {data.main.humidity} %</p> : null}
            </div>
            <div className="visibility">
              {data.visibility ? (
                <p>Visibility: {parseFloat(data.visibility) / 1000}km</p>
              ) : null}
            </div>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default App;
