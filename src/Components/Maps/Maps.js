import React from 'react';
import { LoadScript, GoogleMap, Marker } from 'react-google-maps';

function MapComponent() {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 0, // Latitude initiale
    lng: 0, // Longitude initiale
  };

  return (
    <div>
      <LoadScript
        googleMapsApiKey="VOTRE_CLE_API_GOOGLE_MAPS"
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10} // Niveau de zoom initial
          center={defaultCenter} // Centre initial
        >
          {/* Marqueur sur la carte */}
          <Marker position={defaultCenter} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default MapComponent;
