import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
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

export default function Sidebar() {
    const navigate = useNavigate();
    const [isCollapse, setCollapse] = useState(false);
    const [isCollapse2, setCollapse2] = useState(false);
    const [isCollapse3, setCollapse3] = useState(false);
    const isAdmin = true;

    // const handleCollapse = () => {
    // };
    // const handleCollapse2 = () => {
    //     setCollapse2(!isCollapse2)
    // }
    // const handleCollapse3 = () => {
    //     setCollapse3(!isCollapse3)
    // }

    return (
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
                                <ListItemText primary="Schemes" sx={1} />
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
                                    <EventIcon />
                                </ListItemIcon>
                                <ListItemText primary="Events" sx={1} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </NavLink>
                <List className='List'>
                    <ListItem className="list-item" disablePadding sx={{ display: 'block' }} onClick={() => setCollapse(!isCollapse)}>
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
                            <ListItemText primary="User" sx={{ opacity: 1 }} />
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
                                    <ListItemText primary="Anganwadi" sx={1} />
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                        {isAdmin ?
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
                                    <ListItemText primary="HOD" sx={1} />
                                </ListItemButton>
                            </ListItem> : ""}
                        {isAdmin ?
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
                                    <ListItemText primary="CDPO" sx={1} />
                                </ListItemButton>
                            </ListItem> : ""}
                        {isAdmin ?

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
                                    <ListItemText primary="DPO" sx={1} />
                                </ListItemButton>
                            </ListItem> : ""}
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
                                <ListItemText primary="Geo Tag Anganwadi" sx={1} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Collapse>
                <List className='List'>
                    <ListItem className="list-item" disablePadding sx={{ display: 'block' }} onClick={() => setCollapse2(!isCollapse2)}>
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
                            <ListItemText primary="Reports" sx={{ opacity: 1 }} />
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
                                <ListItemText primary="Geospatial Calculator" sx={1} />
                            </ListItemButton>
                        </ListItem>
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
                                <ListItemText primary="Locate on Map" sx={1} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Collapse>
                <List className='List'>
                    <ListItem className="list-item" disablePadding sx={{ display: 'block' }} onClick={() => setCollapse3(!isCollapse3)}>
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
                            <ListItemText primary="Manage Account" sx={{ opacity: 1 }} />
                            {isCollapse3 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </ListItem>
                </List>
                <Collapse in={isCollapse3} timeout="auto" unmountOnExit>
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
                                    <Person2Icon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" sx={{ opacity: 1 }} />
                            </ListItemButton>
                        </ListItem>
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
                                <ListItemText primary="Change Password" sx={{ opacity: 1 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Collapse>
                <List className='List'>
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
                            <ListItemText primary="Event Occurance" sx={{ opacity: 1 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <List className='List'>
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
                            <ListItemText primary="Query Management" sx={{ opacity: 1 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <List className='List'>
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
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" sx={{ opacity: 1 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Grid>
        </Grid>

    );
}