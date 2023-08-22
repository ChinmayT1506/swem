import { Icon } from "leaflet";
import React from "react";
import { Marker } from "react-leaflet";
import image from "../../../assets/images/marker.png"

export function LocationMarker({ pos, onMove }) {
    return (
        <Marker
            icon={new Icon({ iconUrl: image, iconSize: [100, 81] })}
            position={pos}
            draggable
            autoPan
            eventHandlers={{
                moveend: (event) => {
                    onMove([event.target.getLatLng().lat, event.target.getLatLng().lng]);
                }
            }}
        />
    );
}