import React from 'react'
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import image from "../../../assets/images/marker.png"
import { Grid } from '@mui/material';

export const MapLocator = ({ data, selectedDistrict }) => {

    const position = [34.0837, 74.7973]

    return (
        <>
            <Grid>
                <MapContainer
                    style={{ width: "100%", height: "67vh" }}
                    zoom={13}
                    center={position}
                    scrollWheelZoom={false}
                    fadeAnimation={true}
                    markerZoomAnimation={true}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    {
                        data.map((item, index) => (
                            (item.district === selectedDistrict) ?
                                <Marker position={[item.latitude, item.longitude]}
                                    icon={new Icon({ iconUrl: image, iconSize: [100, 81] })}
                                >
                                    <Popup>
                                        {item.latitude} <br /> {item.longitude}
                                    </Popup>
                                </Marker>
                                : null
                        ))
                    }
                    <Marker position={position}
                        icon={new Icon({ iconUrl: image, iconSize: [100, 81] })}
                    >
                        <Popup>
                            Main Marker <br /> Postion
                        </Popup>
                    </Marker>
                </MapContainer>
            </Grid >
        </>
    )
}
