import './GoogleMap.scss';
import React, { FC, useLayoutEffect, useRef, useCallback } from 'react';

import { markers } from '../constants';

const GoogleMap: FC = () => {
  // Google Maps is displayed inside the div element referenced here
  const mapRef = useRef<HTMLDivElement | null>(null);

  // This method is executed by the Google Maps script that is lazy-loaded
  const initMap = useCallback(() => {
    const _window: any = window;

    // Load the map into the .GoogleMap-container div
    const googleMap: google.maps.Map = new _window.google.maps.Map(mapRef.current, {
      zoom: 5,
      center: { lat: 54.5, lng: 7 }
    });

    const googleInfoWindow: google.maps.InfoWindow = new _window.google.maps.InfoWindow({
      content: '',
      maxWidth: 400
    });

    // Loop over the hard-coded markers from the constants file
    markers.forEach((marker, index) => {
      const googleMarker: google.maps.Marker = new _window.google.maps.Marker({
        position: marker.position,
        title: marker.title,
        map: googleMap
      });

      // Open the first marker in the list by default
      if (index === 0) {
        googleInfoWindow.setContent(marker.content);

        googleInfoWindow.open(googleMap, googleMarker);
      }

      // When clicking on a marker, open the popup window
      googleMarker.addListener('click', () => {
        googleInfoWindow.close();

        googleInfoWindow.setContent(marker.content);

        googleInfoWindow.open(googleMap, googleMarker);
      });
    });
  }, []);

  // After the page is loaded
  useLayoutEffect(() => {
    // If the .GoogleMap-container does not exist
    if (!mapRef.current) {
      // Find it
      mapRef.current = document.querySelector('.GoogleMap-container');

      // If it is not in the page, create it
      if (!mapRef.current) {
        mapRef.current = document.createElement('div');

        mapRef.current.classList.add('GoogleMap-container');

        document.body.appendChild(mapRef.current);
      }
    }

    // Show the .GoogleMap-container div
    mapRef.current?.classList.remove('hide');

    const _window: any = window;

    // If initMap is not yet added to the global window
    if (!_window.initMap) {
      // Add it
      _window.initMap = initMap;

      // And lazy-load the Google Maps Javascript library
      const key = process.env.REACT_APP_GOOGLE_MAPS_KEY;

      const script = document.createElement('script');

      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&libraries=&v=weekly`;

      script.async = true;

      document.body.appendChild(script);
    }

    return () => {
      // If this component unloads, hide the .GoogleMap-container
      mapRef.current?.classList.add('hide');
    };
  }, [initMap]);

  return (
    <div className="GoogleMap">
      <h1>
        <i className="far fa-building" /> Employment History
      </h1>
    </div>
  );
};

export default GoogleMap;
