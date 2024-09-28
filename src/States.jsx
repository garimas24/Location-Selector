import React, { useState, useEffect } from "react";

function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    setMessage("");
    fetch(
      `https://crio-location-selector.onrender.com/country=${country}/states`
    )
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.error("Error fetching states:", error));
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity("");
    setMessage("");
    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
    )
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    const newMessage = `You Selected ${city}, ${selectedState}, ${selectedCountry}`;
    setMessage(newMessage);
    console.log(newMessage); // Debugging log
  };

  return (
    <div>
      <div>
        <label htmlFor="country">Select Country</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="state">Select State</label>
        <select
          id="state"
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="city">Select City</label>
        <select
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LocationSelector;
