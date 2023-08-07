import React from 'react'
import PublicRouter from './publicRouter'
import PrivateRouter from './privateRouter'
import { Route, Routes } from 'react-router-dom'
import Login from '../app/modules/authentication/login/login'
import { Dashboard } from '../app/modules/admin/dashboard/dashboard'
import { Schemes } from '../app/layouts/Schemes/Schemes'
import AddSchemeForm from '../app/layouts/Schemes/AddSchemepage'
import { Events } from '../app/layouts/Events/events'
import AddEventForm from '../app/layouts/Events/addEvent'
import { Anganwadi } from '../app/layouts/UserPages/Anganwadi/anganwadiMain'
import AddAnganwadiForm from '../app/layouts/UserPages/Anganwadi/addAnganwadi'
import EditSchemeForm from '../app/layouts/Schemes/EditSchemePage'
import EditEventForm from '../app/layouts/Events/editEvents'
import EditAnganwadiForm from '../app/layouts/UserPages/Anganwadi/editAnganwadi'

export const Mainroute = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<PublicRouter />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route path="/" element={<PrivateRouter />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/schemes" element={<Schemes />} />
                    <Route path="/schemes/addScheme" element={<AddSchemeForm />} />
                    <Route path="/schemes/editScheme" element={<EditSchemeForm />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/addEvent" element={<AddEventForm />} />
                    <Route path="/events/editEvent" element={<EditEventForm />} />
                    <Route path="/users/anganwadi" element={<Anganwadi />} />
                    <Route path="/users/anganwadi/addAnganwadi" element={<AddAnganwadiForm />} />
                    <Route path="/users/anganwadi/editAnganwadi" element={<EditAnganwadiForm />} />
                </Route>
            </Routes>
        </>
    )
}
