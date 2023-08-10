import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import GridViewIcon from '@mui/icons-material/GridView';
import './sidebar.scss'
import { useState } from 'react';
import { Collapse } from '@mui/material';
import ExpandMore from "@mui/icons-material/ExpandMore"
import ExpandLess from "@mui/icons-material/ExpandLess"
import SchemaIcon from '@mui/icons-material/Schema';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import ReportIcon from '@mui/icons-material/Report';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Person2Icon from '@mui/icons-material/Person2';
import PasswordIcon from '@mui/icons-material/Password';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import LogoutIcon from '@mui/icons-material/Logout';
import MapIcon from '@mui/icons-material/Map';
import DirectionsIcon from '@mui/icons-material/Directions';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Sidebar() {
    const navigate = useNavigate();
    const [isCollapse, setCollapse] = useState(false);
    const [isCollapse2, setCollapse2] = useState(false);
    const [isCollapse3, setCollapse3] = useState(false);
    const isAdmin = true;

    function Collapser() {
        if (isCollapse2 || isCollapse3) {
            setCollapse2(false);
            setCollapse3(false)
        }
        setCollapse(!isCollapse)
    }

    function Collapser2() {
        if (isCollapse || isCollapse3) {
            setCollapse(false);
            setCollapse3(false);
        }
        setCollapse2(!isCollapse2)
    }

    function Collapser3() {
        if (isCollapse || isCollapse2) {
            setCollapse(false);
            setCollapse2(false);
        }
        setCollapse3(!isCollapse3)
    }

    function logout() {
        localStorage.removeItem("accessToken")
        toast.success("User Logged Out Successfully")
        setTimeout(() => {
            navigate("/login")
        }, 1500);

    }

    return (
        <>
            <Grid className='Sidebar'>
                <Grid className='sideNav'>
                    <Grid className='sideNavHeader' onClick={() => navigate('/dashboard')}>
                        <GridViewIcon />
                        <h4>Dashboard</h4>
                    </Grid>
                    <NavLink to="/schemes" >
                        <List className='List' >
                            <ListItem className="list-item" disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        justifyContent: 'initial',
                                        px: 1.7,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: 3,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <SchemaIcon />
                                    </ListItemIcon>
                                    <ListItemText className="list-text" primary="Schemes" sx={1} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </NavLink>
                    <NavLink to="/events" >
                        <List className='List'>
                            <ListItem className="list-item" disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        px: 1.7,
                                        justifyContent: 'initial',
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: 3,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <EventIcon />
                                    </ListItemIcon>
                                    <ListItemText className="list-text" primary="Events" sx={1} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </NavLink>
                    <List className='List'>
                        <ListItem className="list-item" disablePadding sx={{ display: 'block' }} onClick={Collapser}>
                            <ListItemButton
                                sx={{
                                    minHeight: 40,
                                    justifyContent: 'initial',
                                    px: 1.7,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: 3,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText className="list-text" primary="User" sx={{ opacity: 1 }} />
                                {isCollapse ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Collapse in={isCollapse} timeout="auto" unmountOnExit>
                        <List className='List'>
                            <NavLink to='/users/anganwadi' >
                                <ListItem className="list-item" disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 40,
                                            justifyContent: 'initial',
                                            px: 1.7,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: 3,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText className="list-text" primary="Anganwadi" sx={1} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                            {isAdmin ?
                                <NavLink to='/users/hod' >
                                    <ListItem className="list-item-wrapper" disablePadding sx={{ display: 'block' }}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 40,
                                                justifyContent: 'initial',
                                                px: 1.7,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: 3,
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <PersonIcon />
                                            </ListItemIcon>
                                            <ListItemText className="list-text" style={{
                                                fontSize: "10px"
                                            }} primary="HOD" sx={1} />
                                        </ListItemButton>
                                    </ListItem>
                                </NavLink> : ""
                            }
                            {isAdmin ?
                                <NavLink to="/users/cdpo">
                                    <ListItem className="list-item" disablePadding sx={{ display: 'block' }}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 40,
                                                justifyContent: 'initial',
                                                px: 1.7,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: 3,
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <PersonIcon />
                                            </ListItemIcon>
                                            <ListItemText className="list-text" primary="CDPO" sx={1} />
                                        </ListItemButton>
                                    </ListItem>
                                </NavLink> : ""
                            }
                            {isAdmin ?
                                <NavLink to="/users/dpo">
                                    <ListItem className="list-item" disablePadding sx={{ display: 'block' }}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 40,
                                                justifyContent: 'initial',
                                                px: 1.7,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: 3,
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <PersonIcon />
                                            </ListItemIcon>
                                            <ListItemText className="list-text" primary="DPO" sx={1} />
                                        </ListItemButton>
                                    </ListItem>
                                </NavLink> : ""
                            }
                            <NavLink to="/users/geoTagAnganwadi">
                                <ListItem className="list-item" disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 40,
                                            justifyContent: 'initial',
                                            px: 1.7,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: 3,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <MapIcon />
                                        </ListItemIcon>
                                        <ListItemText className="list-text" primary="Geo Tag Anganwadi" sx={1} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                        </List>
                    </Collapse>
                    <List className='List'>
                        <ListItem className="list-item" disablePadding sx={{ display: 'block' }} onClick={Collapser2}>
                            <ListItemButton
                                sx={{
                                    minHeight: 40,
                                    justifyContent: 'initial',
                                    px: 1.7,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: 3,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ReportIcon />
                                </ListItemIcon>
                                <ListItemText className="list-text" primary="Reports" sx={{ opacity: 1 }} />
                                {isCollapse2 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Collapse in={isCollapse2} timeout="auto" unmountOnExit>
                        <List className='List'>
                            <ListItem className="list-item" disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 40,
                                        justifyContent: 'initial',
                                        px: 1.7,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: 3,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <MapIcon />
                                    </ListItemIcon>
                                    <ListItemText className="list-text" primary="Geospatial Calculator" sx={1} />
                                </ListItemButton>
                            </ListItem>
                            <NavLink to="/locate-on-map">
                                <ListItem className="list-item" disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 40,
                                            justifyContent: 'initial',
                                            px: 1.7,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: 3,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <DirectionsIcon />
                                        </ListItemIcon>
                                        <ListItemText className="list-text" primary="Locate on Map" sx={1} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                        </List>
                    </Collapse>
                    <List className='List'>
                        <ListItem className="list-item" disablePadding sx={{ display: 'block' }} onClick={Collapser3}>
                            <ListItemButton
                                sx={{
                                    minHeight: 40,
                                    justifyContent: 'initial',
                                    px: 1.7,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: 3,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ManageAccountsIcon />
                                </ListItemIcon>
                                <ListItemText className="list-text" primary="Manage Account" sx={{ opacity: 1 }} />
                                {isCollapse3 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Collapse in={isCollapse3} timeout="auto" unmountOnExit>
                        <List className='List'>
                            <NavLink to="profile">
                                <ListItem className="list-item" disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 40,
                                            justifyContent: 'initial',
                                            px: 1.7,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: 3,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Person2Icon />
                                        </ListItemIcon>
                                        <ListItemText className="list-text" primary="Profile" sx={{ opacity: 1 }} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                            <NavLink to="changePassword">
                                <ListItem className="list-item" disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 40,
                                            justifyContent: 'initial',
                                            px: 1.7,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: 3,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <PasswordIcon />
                                        </ListItemIcon>
                                        <ListItemText className="list-text" primary="Change Password" sx={{ opacity: 1 }} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                        </List>
                    </Collapse>
                    <List className='List'>
                        <NavLink to="event-occurence">
                            <ListItem className="list-item" disablePadding sx={{ display: 'block' }} >
                                <ListItemButton
                                    sx={{
                                        minHeight: 40,
                                        justifyContent: 'initial',
                                        px: 1.7,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: 3,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <EventAvailableIcon />
                                    </ListItemIcon>
                                    <ListItemText className="list-text" primary="Event Occurence" sx={{ opacity: 1 }} />
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    </List>
                    <List className='List'>
                        <NavLink to="/query">
                            <ListItem className="list-item" disablePadding sx={{ display: 'block' }} >
                                <ListItemButton
                                    sx={{
                                        minHeight: 40,
                                        justifyContent: 'initial',
                                        px: 1.7,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: 3,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <QueryBuilderIcon />
                                    </ListItemIcon>
                                    <ListItemText className="list-text" primary="Query Management" sx={{ opacity: 1 }} />
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    </List>
                    <List className='List'>
                        <ListItem onClick={logout} className="list-item" disablePadding sx={{ display: 'block' }} >
                            <ListItemButton
                                sx={{
                                    minHeight: 40,
                                    justifyContent: 'initial',
                                    px: 1.7,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: 3,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText className="list-text" primary="Logout" sx={{ opacity: 1 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>

    );
}