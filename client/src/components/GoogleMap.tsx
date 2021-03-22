import './GoogleMap.scss';
import React, { FC, useLayoutEffect, useRef, useCallback } from 'react';

import { markers } from '../constants';

const GoogleMap: FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const initMap = useCallback(() => {
    const _window: any = window;

    const maps = _window.google.maps;

    const googleMap = new maps.Map(mapRef.current, {
      zoom: 6,
      center: { lat: 54.5, lng: 7 }
    });

    const googlePopup = new maps.InfoWindow({
      content: '',
      maxWidth: 400
    });

    markers.forEach((marker) => {
      const googleMarker = new maps.Marker({
        position: marker.position,
        title: marker.title,
        map: googleMap
      });

      googleMarker.addListener('click', () => {
        googlePopup.close();

        googlePopup.setContent(marker.content);

        googlePopup.open(googleMap, googleMarker);
      });
    });
  }, []);

  useLayoutEffect(() => {
    if (!mapRef.current) {
      mapRef.current = document.querySelector('.GoogleMap-container');

      if (!mapRef.current) {
        mapRef.current = document.createElement('div');

        mapRef.current.classList.add('GoogleMap-container');

        document.body.appendChild(mapRef.current);
      }
    }

    mapRef.current?.classList.remove('hide');

    const _window: any = window;

    if (!_window.initMap) {
      _window.initMap = initMap;

      const key = process.env.REACT_APP_GOOGLE_MAPS_KEY;

      const script = document.createElement('script');

      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&libraries=&v=weekly`;

      script.async = true;

      document.body.appendChild(script);
    }

    return () => {
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
