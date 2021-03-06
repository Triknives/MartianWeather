import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {MarsData} from './projectname.js';

$(document).ready(function() {
  let mars = new MarsData();

  (async () => {
    let response = await fetch (`https://api.nasa.gov/insight_weather/?api_key=${process.env.marsKey}&feedtype=json&ver=1.0`);
    let jsonifiedResponse = await response.json();
    getElements(jsonifiedResponse);
  })();

  (async () => {
    let response = await fetch (`https://api.stormglass.io/v1/weather/point?lat=15&lng=27`,{
      headers: {
        'Authorization': process.env.stormKey
      }
    })
    let jsonifiedResponse = await response.json();
    getWeatherElements(jsonifiedResponse);
  })();

  const getElements = (response) => {
    const solkeys = response.sol_keys

    $("#marsResults").text(`This is the Mars temperature:  ${response[solkeys[0]].AT.av}˚F`);
  };
  const getWeatherElements = (response) => {
    console.log(response);
    $("#weatherResults").text(`This is the Earth temperature:  ${response.hours[0].airTemperature[0].value}˚F`);
  }
});

//return weather info and display
