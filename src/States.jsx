import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Fetch all countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://crio-location-selector.onrender.com/countries"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        setLoadingStates(true);
        try {
          const response = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
          );
          setStates(response.data);
          setLoadingStates(false);
        } catch (error) {
          console.error("Error fetching states:", error);
          setLoadingStates(false);
        }
      };
      fetchStates();
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        setLoadingCities(true);
        try {
          const response = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
          );
          setCities(response.data);
          setLoadingCities(false);
        } catch (error) {
          console.error("Error fetching cities:", error);
          setLoadingCities(false);
        }
      };
      fetchCities();
    }
  }, [selectedState]);

  return (
    <div>
      <h2>Location Selector</h2>

      <label>
        Select Country:
        <select
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedState("");
            setSelectedCity("");
          }}
        >
          <option value="">--Select Country--</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>

      <label>
        Select State:
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
          }}
          disabled={!selectedCountry || loadingStates}
        >
          <option value="">--Select State--</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {loadingStates && <p>Loading states...</p>}
      </label>

      <label>
        Select City:
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState || loadingCities}
        >
          <option value="">--Select City--</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {loadingCities && <p>Loading cities...</p>}
      </label>

      {selectedCity && (
        <p>
          You selected: {selectedCity}, {selectedState}, {selectedCountry}
        </p>
      )}
    </div>
  );
};

export default LocationSelector;
