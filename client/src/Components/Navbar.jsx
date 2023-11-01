import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Navbar.css';
import { useLocation } from 'react-router-dom';

import { Nav } from 'react-bootstrap'

// MUI 
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Avatar } from "@mui/material";

// React Icons 
import { BiCog, BiHome, BiUser, BiLogOut } from "react-icons/bi";
import NavLogo from '../Assets/Images/Logo.svg'

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('useremail'));
    const [isSignUpPage, setIsSignUpPage] = useState(false);
    const location = useLocation();
    const [id, setId] = useState();

    useEffect(() => {
        setIsSignUpPage(location.pathname === '/Signup');
    }, [location.pathname]);


    useEffect(() => {
        const fetchUserId = async () => {
            let usermail = sessionStorage.getItem('useremail');
            try {
                const response = await axios.get("https://opendevweb-51212536012a.herokuapp.com/api/GetUserID/" + usermail); 
                console.log(response.data[0]._id);
                setId(response.data[0]._id);
            } catch (error) {
                console.log(error);
                console.log('User ID not found');
            }
        };
    
        fetchUserId();
    }, []);

    // Snackbark
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    // const [id, setId] = useState();
    const navigate = useNavigate();


    const handleClick = (newState) => () => {
        setState({ ...newState, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const hellobutton = (
        <Grid item xs={12} textAlign="center" sx={{ margin: 'auto' }}>
            <Button onClick={handleClick({ vertical: 'top', horizontal: 'right' })} className="hello-btn">
                Hello
            </Button>
        </Grid>
    )

    const handleSignOut = () => {
        sessionStorage.clear();
        setIsLoggedIn(false);
    }

    const handleProfile = async () => {
        // sessionStorage.setItem('user', false);
        // sessionStorage.setItem('useID', props.user);
        const queryParams = new URLSearchParams();
        queryParams.append('userid', id);
        sessionStorage.setItem("UserIDNavBar", id);
        navigate(`/profile?${queryParams.toString()}`);
    }

    return (
        <>
            <div className="navbar-con">
                <div className="navbar-logo">
                    <img src={NavLogo} alt=""></img>
                </div>
                <div className="navbar-page-links">
                    {/* <Nav.Link className="navbar-page-links-options" href='/Home'>Home</Nav.Link> */}
                    {/* <Nav.Link className="navbar-page-links-options" href='/Profile'>Profile</Nav.Link> */}
                    {/* <Nav.Link className="navbar-page-links-options" href='/#'>Adim</Nav.Link> */}
                    {/* <Nav.Link className="navbar-page-links-options" href='/SignIn'>Signout</Nav.Link> */}
                    {/* <Nav.Link className="navbar-page-links-options" href='/Signup'>Sign Up</Nav.Link> */}

                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={4}
                    >
                        <Nav.Link className="navbar-page-links-options" href='/Home'>Home</Nav.Link>
                        {/* onClick this needs to end the session for the logout function */}

                        {isLoggedIn && (
                        <Nav.Link className="navbar-page-links-options" onClick={handleProfile}>Profile</Nav.Link>
                        )}
                        {!isLoggedIn && !isSignUpPage && (
                            <Nav.Link className="navbar-page-links-options" href='/Signup'>Sign Up</Nav.Link>
                        )}
                        {isLoggedIn && (
                            <Nav.Link className="navbar-page-links-options" href='/SignIn' onClick={handleSignOut}>Sign Out</Nav.Link>
                        )}
                    </Stack>
                </div>

                <div className="other-buttons">

                    {/* Profil button  */}
                    {/* <button className="nav-profile-dropdown-btn">
                        <Avatar></Avatar>
                        <div className="nav-profile-dropdown-content">
                            <Grid xs={12}>
                                <h3>User Name & Surname</h3>
                            </Grid>
                            <Grid xs={12}>
                                <Grid xs={12}>
                                    <Nav.Link href="/">
                                        <button>
                                            <BiHome />
                                            Home
                                        </button>
                                    </Nav.Link>
                                </Grid>
                                <button>
                                    <BiCog />
                                    Settings
                                </button>
                                <Grid xs={12} sx={{ marginBottom: '10px' }}>
                                    <Nav.Link className="navbar-page-links-options" href='/#'>
                                        <button>
                                            <BiUser />
                                            Admin
                                        </button>
                                    </Nav.Link>
                                </Grid>
                                <Grid xs={12}>
                                    <Nav.Link className="navbar-page-links-options" href='/SignIn'>
                                        <button>
                                            <BiLogOut />
                                            Log Out
                                        </button>
                                    </Nav.Link>
                                </Grid>
                            </Grid>
                        </div>

                    </button> */}

                    {/* <Tooltip title="hello... again">
                        <Box sx={{}}>
                            {hellobutton}
                            <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                open={open}
                                onClose={handleClose}
                                message="Howzit boet"
                                key={vertical + horizontal}
                            />
                        </Box>
                    </Tooltip> */}

                </div>

            </div>
        </>
    )
}
export default Navbar