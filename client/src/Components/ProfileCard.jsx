import React, { useState, useEffect } from "react"
import "./ProfileCard.css"

// MUI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Axios from "axios";
import { useLocation } from "react-router-dom";
import ErrorCard from "../Components/ErrorCard";

const ProfileCard = (props) => {

    const [updateProfile, setUpdateProfile] = useState();
    const [id, setId] = useState();
    // const [errorCode, setErrorCode] = useState();
    // const [errorText, setErrorText] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [errorS, setErrorS] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userID = searchParams.get('userid');

    // useEffect(() => {
    // Get user ID from session storage
    //     let usermail = sessionStorage.getItem('useremail');

    //     try {
    //         Axios.get("http://localhost:5002/api/GetUserID/" + usermail)
    //             .then((res) => {
    //                 const response = res;
    //                 console.log(response.data);
    //             });
    //     } catch (error) {
    //         console.log(error);
    //         console.log('User ID not found');
    //     }
    // }, []);

    // Conditionally render the "Update" button
    const isCurrentUser = userID === props.id;

    const update = (e) => {
        document.getElementById("default").style.display = 'none'
        document.getElementById("update-user-profile").style.display = 'block'
    }
    const serverURL = 'https://opendevweb-51212536012a.herokuapp.com/api/userImages';
    const imageURL = `${serverURL}/${props.image}`;

    // total likes and dislikes
    const [totalLike, setTotalLike] = useState(0);
    const [totalDislikes, setTotalDislikes] = useState(0);

    function addTotalLike(Amount) {
        setTotalLike(totalLike + Amount);
    };

    function addTotalDislike(Amount) {
        setTotalDislikes(totalDislikes + Amount);
    };

    useEffect(() => {

        Axios.get('https://opendevweb-51212536012a.herokuapp.com/api/like_get_all/')
            .then((res) => {
                // --Gather all liked questions and set them to the variable here
                let questions = res.data;

                // variable to count the amount of likes and dislikes
                let iLikes = 0;
                let iDislikes = 0;

                // Count how many likes there are
                for (let k = 0; k < questions.length; k++) {
                    if (questions[k].userID === props.id) {
                        switch (questions[k].type) {
                            case "like":
                                iLikes++;
                                break;

                            case "dislike":
                                iDislikes++;
                                break;
                            case "none":
                                break;
                        }
                    }
                }

                addTotalLike(iLikes);
                addTotalDislike(iDislikes);

            })
            .catch((error) => {
                console.error(`Error fetching user data: ${error.message}`);
                console.log(error);
                // setErrorMessage(<ErrorCard code={err.response.status} text={err.response.statusText} />);
                // setErrorCode(err.response.status)
                setErrorS(true);
            });
    }, []);

    return (
        <>
            {!errorS ?
                <div className="profilecard-container" style={{ display: 'block' }} id='default'>
                    <Grid container spacing={0}>
                        <Grid item xs={2} md={2}>
                            <img src={imageURL} className="profile_img"></img>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <div className="profilecard-userInfo-con">
                                <div>
                                    <h1 style={{ marginTop: 0 }} > {props.username} </h1>
                                    <h3>ID Number: {props.id} </h3>
                                    <p className="interests-text">Interests:</p>
                                    <div className="userInfo-tags">
                                        <button>javascript</button>
                                        <button>CSS</button>
                                        <button>HTML</button>
                                        <button className="userInfo-tags-add">+</button>
                                    </div>
                                </div>
                                <div className="profilecard-stats">
                                    {/* asked */}
                                    <div className="profilecard-stats-asked">
                                        <p>Questions Asked: </p>
                                        <p>00</p>
                                    </div>
                                    {/* answered  */}
                                    <div className="profilecard-stats-answered">
                                        <p>Questions Answered: </p>
                                        <p>00</p>
                                    </div>
                                    {/* likes  */}
                                    <div className="profilecard-stats-likes">
                                        <p>Liked: {totalLike}</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            {isCurrentUser && (
                                <Button onClick={update} className="profilecard-Logout-btn" variant="outlined" sx={{ color: 'orange', border: "solid 1px orange" }}>Update</Button>
                            )}
                        </Grid>
                    </Grid>
                </div>
            : errorMessage}
        </>
    )
}
export default ProfileCard;