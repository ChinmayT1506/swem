import React, { useRef } from 'react'
import ReactDOM from 'react-dom';
import { Map, TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import image from "../../../assets/images/marker.png"
import { Grid } from '@mui/material';

export const MapLocator = () => {

    const position = [34.0837, 74.7973]

    const positionArr = [
        { lat: 34.0837, long: 74.7973 },
        { lat: 34.0937, long: 74.7984 },
        { lat: 34.1247, long: 74.7973 },
        { lat: 34.1238, long: 74.7973 },
        { lat: 34.0939, long: 74.7975 },
    ]
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
                        positionArr.map(item => {
                            return <Marker position={[item.lat, item.long]}
                                icon={new Icon({ iconUrl: image, iconSize: [100, 81] })}
                            >
                                <Popup>
                                    {item.lat} <br /> {item.long}
                                </Popup>
                            </Marker>
                        })
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
