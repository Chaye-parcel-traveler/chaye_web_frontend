// import React from "react";
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// export default function SimpleMap() {
//     const defaultProps = {
//         center: {
//             lat: 10.99835602,
//             lng: 77.01502627
//         },
//         zoom: 11
//     };

//     const handleApiLoaded = (map, maps) => {

//     };

//     return (
//         <div className="content">
//             <div style={{ height: '80%', width: '80%' }}>
//                 <GoogleMapReact
//                     bootstrapURLKeys={{ key: 'YOUR_API_KEY' }}
//                     defaultCenter={defaultProps.center}
//                     defaultZoom={defaultProps.zoom}
//                     yesIWantToUseGoogleMapApiInternals
//                     onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
//                 >
//                     <AnyReactComponent
//                         lat={59.955413}
//                         lng={30.337844}
//                         text="My Marker"
//                     />
//                 </GoogleMapReact>
//             </div>
//         </div>
//     );
// }
 