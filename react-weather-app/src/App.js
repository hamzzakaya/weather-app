import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [temperature, setTemperature] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const fetchWeatherData = () => {
    const apiKey = '7fe26b31267b3aa4860cd2205f2d5142'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;

    axios.get(apiUrl)
      .then(response => {
        const temperatureKelvin = response.data.main.temp;
        const temperatureCelsius = temperatureKelvin - 273.15;
        setTemperature(temperatureCelsius.toFixed(0));                                         
      })
      .catch(error => {
        console.log(error);
        setTemperature('Hava durumu bilgileri alınamadı.');
      });
  };

  return (
    <div className="App" style={{ textAlign: 'center', border: '2px solid #ccc', padding: '20px', borderRadius: '10px', maxWidth: '400px', margin: 'auto' }}>
      <input
        type="text"
        placeholder="Şehir adını girin"
        value={inputValue}
        onChange={handleInputChange}
        style={{ padding: '8px', marginRight: '8px' }}
      />
      <br />
      <button onClick={fetchWeatherData} style={{ padding: '8px', borderRadius:'10px'}}>Search</button>
      <div>
        <h2 style={{fontSize:'40px'}}>{inputValue}</h2>
        <h4 style={{fontSize:'40px'}}>{temperature} </h4>                 
      </div>
    </div>
  );
}

export default App;

