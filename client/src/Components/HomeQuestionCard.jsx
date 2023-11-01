import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// CSS 
import './HomeQuestionCard.css';

// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button'; 

// Axios import
import Axios from "axios";

const HomeQuestionCard = ({ user, title, date, text, id }) => {

    const [username, setUsername] = useState("");
    console.log(user)

    const navigate = useNavigate();

    // Get specific user
    useEffect(() => {
        Axios.get('https://opendevweb-51212536012a.herokuapp.com/api/getUser/' + user)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(`Error fetching user data: ${err.message}`);
            });
    }, [user]); // Fetch data when props.user changes

    const redirect = () => {
        const queryParams = new URLSearchParams();
        queryParams.append('id', id);
        sessionStorage.setItem("QuestionClick", id);
        navigate(`/question?${queryParams.toString()}`);
    };

    return (
        <div>
            <div className="homeQuestionCard-con">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid xs={12}>
                        <h2>{title}</h2>
                    </Grid>
                    <Grid xs={12}>
                        <p>{username}</p>
                    </Grid>
                    <Grid xs={12}>
                        <p>{date}</p>
                    </Grid>
                    <Grid xs={12} sx={{ width: '900px', margin: 'auto' }}>
                        <p>
                            {text}
                        </p>
                    </Grid>
                    {/* tags  */}
                    <Grid xs={12}>
                        <Chip label="Tags" variant="outlined" />
                    </Grid>
                    <Grid xs={12} sx={{ marginTop: '20px' }}>
                        <Button variant="contained" id={"btnReadMore_" + id} onClick={redirect} > Read More </Button>
                    </Grid>
                </Box>
            </div>
            <br></br>
        </div>
    )
}

export default HomeQuestionCard