import React from 'react'
import PublicRouter from './publicRouter'
import PrivateRouter from './privateRouter'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../app/modules/authentication/login/login'
import { Dashboard } from '../app/modules/admin/dashboard/dashboard'
import Profile from '../app/modules/admin/ProfileScreen/profile'
import { Schemes } from '../app/modules/admin/Schemes/Schemes'
import AddSchemeForm from '../app/modules/admin/Schemes/AddSchemepage'
import EditSchemeForm from '../app/modules/admin/Schemes/EditSchemePage'
import { Events } from '../app/modules/admin/Events/events'
import AddEventForm from '../app/modules/admin/Events/addEvent'
import EditEventForm from '../app/modules/admin/Events/editEvents'
import { Anganwadi } from '../app/modules/admin/UserPages/Anganwadi/anganwadiMain'
import AddAnganwadiForm from '../app/modules/admin/UserPages/Anganwadi/addAnganwadi'
import EditAnganwadiForm from '../app/modules/admin/UserPages/Anganwadi/editAnganwadi'
import { HOD } from '../app/modules/admin/UserPages/HOD/hodMain'
import AddHODForm from '../app/modules/admin/UserPages/HOD/addHod'
import EditHODForm from '../app/modules/admin/UserPages/HOD/editHOD'
import { CDPO } from '../app/modules/admin/UserPages/CDPO/cdpoMain'
import AddCDPOForm from '../app/modules/admin/UserPages/CDPO/addCdpo'
import EditCDPOForm from '../app/modules/admin/UserPages/CDPO/editCDPO'
import { DPO } from '../app/modules/admin/UserPages/DPO/dpoMain'
import AddDPOForm from '../app/modules/admin/UserPages/DPO/addDpo'
import EditDPOForm from '../app/modules/admin/UserPages/DPO/editDpo'
import EditGeoTagForm from '../app/modules/admin/UserPages/GeoTagAnganwadi/editGeoTagAnganwadi'
import { GeoTagAnganwadi } from '../app/modules/admin/UserPages/GeoTagAnganwadi/geoTagAnganwadimain'
import { EventOccurance } from '../app/modules/admin/Events/eventOccurence'
import { ShowEventOccurence } from '../app/modules/admin/Events/showEventOccurence'
import ChangePasswordScreen from '../app/modules/admin/ProfileScreen/changePasswordScreen'
import { QueryManagement } from '../app/modules/admin/queryManagement/queryManagement'
import AddQueryForm from '../app/modules/admin/queryManagement/addQuery'
import ReplyQueryForm from '../app/modules/admin/queryManagement/replyQuery'
import { LocateOnMap } from '../app/modules/admin/Reports/LocateOnMap'
import { GeospatialCalculator } from '../app/modules/admin/Reports/GeospatialCalculator'
import { useSelector } from 'react-redux'


export const Mainroute = () => {

    const USER = useSelector(state => state?.getLogindata?.loginData.user_type)
    const isAdmin = (USER === "HOD")

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PublicRouter />}>
                        <Route index element={<Login />} />
                        <Route path="/*" element={<h2>Error 404</h2>} />
                    </Route>
                    {isAdmin ?
                        <Route path="/" element={<PrivateRouter />}>
                            <Route path="/*" element={<h2>Error 404</h2>} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/schemes" element={<Schemes />} />
                            <Route path="/schemes/addScheme" element={<AddSchemeForm />} />
                            <Route path="/schemes/editScheme" element={<EditSchemeForm />} />
                            <Route path="/events" element={<Events />} />
                            <Route path="/events/addEvent" element={<AddEventForm />} />
                            <Route path="/events/editEvent" element={<EditEventForm />} />
                            <Route path="/event-occurence" element={<EventOccurance />} />
                            <Route path="/show-event-occurence" element={<ShowEventOccurence />} />
                            <Route path="/users/anganwadi" element={<Anganwadi />} />
                            <Route path="/users/anganwadi/addAnganwadi" element={<AddAnganwadiForm />} />
                            <Route path="/users/anganwadi/editAnganwadi" element={<EditAnganwadiForm />} />
                            <Route path="/users/hod" element={<HOD />} />
                            <Route path="/users/hod/addHod" element={<AddHODForm />} />
                            <Route path="/users/hod/editHod" element={<EditHODForm />} />
                            <Route path="/users/cdpo" element={<CDPO />} />
                            <Route path="/users/cdpo/addCdpo" element={<AddCDPOForm />} />
                            <Route path="/users/cdpo/editCdpo" element={<EditCDPOForm />} />
                            <Route path="/users/dpo" element={<DPO />} />
                            <Route path="/users/dpo/addDpo" element={<AddDPOForm />} />
                            <Route path="/users/dpo/editDpo" element={<EditDPOForm />} />
                            <Route path="/users/geoTagAnganwadi" element={<GeoTagAnganwadi />} />
                            <Route path="/users/geoTagAnganwadi/editGeoTagAnganwadi" element={<EditGeoTagForm />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/changePassword" element={<ChangePasswordScreen />} />
                            <Route path="/query" element={<QueryManagement />} />
                            <Route path="/query/addQuery" element={<AddQueryForm />} />
                            <Route path="/query/replyQuery" element={<ReplyQueryForm />} />
                            <Route path="/locate-on-map" element={<LocateOnMap />} />
                            <Route path="/geospatial-calculator" element={<GeospatialCalculator />} />
                        </Route>
                        :
                        <Route path="/" element={<PrivateRouter />}>
                            <Route path="/*" element={<h2>Error 404</h2>} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/users/anganwadi" element={<Anganwadi />} />
                            <Route path="/users/anganwadi/addAnganwadi" element={<AddAnganwadiForm />} />
                            <Route path="/users/anganwadi/editAnganwadi" element={<EditAnganwadiForm />} />
                            <Route path="/event-occurence" element={<EventOccurance />} />
                            <Route path="/show-event-occurence" element={<ShowEventOccurence />} />
                            <Route path="/users/geoTagAnganwadi" element={<GeoTagAnganwadi />} />
                            <Route path="/users/geoTagAnganwadi/editGeoTagAnganwadi" element={<EditGeoTagForm />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/changePassword" element={<ChangePasswordScreen />} />
                            <Route path="/query" element={<QueryManagement />} />
                            <Route path="/query/addQuery" element={<AddQueryForm />} />
                            <Route path="/query/replyQuery" element={<ReplyQueryForm />} />
                            <Route path="/locate-on-map" element={<LocateOnMap />} />
                            <Route path="/geospatial-calculator" element={<GeospatialCalculator />} />
                        </Route>
                    }
                </Routes>
            </BrowserRouter>
        </>
    )
}
