import React, { useRef, useEffect } from "react";
import BreadCrumb from "Common/BreadCrumb";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { connect } from "react-redux";


const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 28.6139, // Example: New Delhi
  lng: 77.2090
};

const apiKey = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;


const MapsGoogle: React.FC = () => {
    const streetViewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.google && streetViewRef.current) {
        // Initialize Street View Panorama
        const panorama = new window.google.maps.StreetViewPanorama(streetViewRef.current, {
            position: center,
            pov: { heading: 165, pitch: 0 },
            zoom: 1
        });
        }
    }, []);


    return (
        <React.Fragment>
            <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
                <BreadCrumb title="Google Maps" pageTitle="Maps" />

                <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-2">
                    {/* Markers Example */}
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-4 text-gray-800 text-15 dark:text-white">Markers</h6>
                            <div className="gmaps" style={{ position: "relative" }}>
                               <LoadScript googleMapsApiKey={apiKey}>
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={center}
                                        zoom={10}
                                    >
                                        <Marker position={center} />
                                    </GoogleMap>
                                </LoadScript>
                            </div>
                        </div>
                    </div>
                    {/* Overlays/Additional Map Features */}
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-4 text-gray-800 text-15 dark:text-white">Overlays</h6>
                            <div className="gmaps" style={{ position: "relative" }}>
                                <LoadScript googleMapsApiKey={apiKey}>
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={center}
                                        zoom={10}
                                    >
                                        {/* Add overlays here, e.g., shapes, markers, etc. */}
                                    </GoogleMap>
                                </LoadScript>
                            </div>
                        </div>
                    </div>
                    {/* Street View Panorama */}
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-4 text-gray-800 text-15 dark:text-white">Street View Panoramas</h6>
                            <div id="gmaps-markers" className="gmaps" style={{ position: "relative" }}>
                                <div
                                    ref={streetViewRef}
                                    style={{ width: '100%', height: '400px', position: "relative" }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Map Types Example */}
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-4 text-gray-800 text-15 dark:text-white">Map Types</h6>
                            <div id="gmaps-markers" className="gmaps" style={{ position: "relative" }}>
                                <LoadScript googleMapsApiKey={apiKey}>
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={center}
                                        zoom={10}
                                        mapTypeId="satellite" // 'roadmap', 'satellite', 'hybrid', 'terrain' possible
                                    >
                                        {/* Child components here */}
                                    </GoogleMap>
                                </LoadScript>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
}

export default MapsGoogle;

