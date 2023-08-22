import React, { useState } from 'react'
import { TileLayer, Marker, Popup, MapContainer, Circle, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, map, marker } from 'leaflet';
import image from "../../../assets/images/marker.png"
import { Grid } from '@mui/material';
import { LocationMarker } from './draggableMarker';

export const GeoSpatialCalcMap = ({ geoFunc,data, inMotion, setMarkerPosition, innerRad, outerRad }) => {

    // const position = [34.0837, 74.7973]
    const [markerPos, setMarkerPos] = useState([34.0837, 74.7973]);
    console.log(markerPos)

    return (
        <>
            <Grid>
                <MapContainer
                    style={{ width: "100%", height: "82vh" }}
                    zoom={13}
                    center={markerPos}
                    scrollWheelZoom={false}
                    fadeAnimation={true}
                    markerZoomAnimation={true}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    {
                        inMotion ?
                            <>
                                <LocationMarker onChange={setMarkerPosition(markerPos)} onMove={setMarkerPos} pos={markerPos}/>
                                {
                                    data?.map((item, index) => (
                                        <Marker position={[item.latitude, item.longitude]}
                                            icon={new Icon({ iconUrl: image, iconSize: [60, 51] })}
                                        >
                                            <Popup>
                                                {item.latitude} <br /> {item.longitude}
                                            </Popup>
                                        </Marker>
                                    ))
                                }
                            </>
                            :
                            <>
                                {
                                    data?.map((item, index) => (
                                        <Marker position={[item.latitude, item.longitude]}
                                            icon={new Icon({ iconUrl: image, iconSize: [60, 51] })}
                                        >
                                            <Popup>
                                                {item.latitude} <br /> {item.longitude}
                                            </Popup>
                                        </Marker>
                                    ))
                                }
                                <Marker position={markerPos}
                                    icon={new Icon({ iconUrl: image, iconSize: [100, 81] })}
                                >
                                    <Popup>
                                        {markerPos}
                                    </Popup>
                                </Marker>
                            </>
                    }
                    <Circle center={markerPos} radius={innerRad} />
                    <Circle center={markerPos} radius={outerRad} />
                </MapContainer>
            </Grid>
        </>
    )
}
