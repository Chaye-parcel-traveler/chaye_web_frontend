import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CityAndCountryInput() {
    const [cityName, setCityName] = useState('');
    const [cityInfo, setCityInfo] = useState(null);

    useEffect(() => {
        if (cityName) {
            const username = 'meryem_taleb'; // Votre nom d'utilisateur
            const endpoint = 'http://api.geonames.org/searchJSON';

            axios.get(endpoint, {
                params: {
                    username: username,
                    q: cityName,
                    maxRows: 1
                }
            })
            .then(response => {
                const firstCity = response.data.geonames[0];
                if (firstCity) {
                    setCityInfo({
                        city: firstCity.name,
                        country: firstCity.countryName
                    });
                } else {
                    setCityInfo(null);
                }
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors de la recherche de la ville :', error);
            });
        } else {
            setCityInfo(null);
        }
    }, [cityName]);

    const handleCityChange = (event) => {
        setCityName(event.target.value);
    };

    return (
        <div>
            <h2>Recherche de Ville et Pays</h2>
            <input
                type="text"
                value={cityName}
                onChange={handleCityChange}
                placeholder="Entrez le nom d'une ville"
            />
            {cityInfo && (
                <p>Pays : {cityInfo.country}</p>
            )}
        </div>
    );
}

export default CityAndCountryInput;
