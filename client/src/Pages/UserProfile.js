import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import axios from "axios";

// components 
import ProfileCard from '../Components/ProfileCard.jsx';
import AskedQuestionsCard from "../Components/AskedQuestionsCard.jsx";
import ErrorCard from "../Components/ErrorCard";

// CSS 
import './UserProfile.css'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function Profile() {

    // const [Image, setImage] = useState();
    const [userName, setUserName] = useState();
    const [image, setImage] = useState();
    const [id, setId] = useState('');
    const [profile, setProfile] = useState();
    // Previously asked questions
    const [paq, setPaq] = useState(null);
    const [errorMes, setErrorMes] = useState();
    const [error, setError] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userID = searchParams.get('userid');

    const getImage = (e) => {
        let imageFile = e.target.files[0];
        console.log(imageFile);
        setImage(imageFile);

        let reader = new FileReader();
        reader.onload = () => {
            let output = document.getElementById('previewEdit');
            output.src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        console.log(userID)

        axios.get('https://opendevweb-51212536012a.herokuapp.com/api/userquestions/' + userID)
            .then((result) => {
                const data = result.data;
                console.log(data)
                let renderQuestions = data.map((item) => <AskedQuestionsCard key={item._id} id={item._id} user={item.user} title={item.title} text={item.text} tags={item.tags} userID={userID} />)
                setPaq(renderQuestions)
            })
            .catch(error => {
                if (error && error.response) {
                    console.log(error);
                    setErrorMes(<ErrorCard code={error.response.status} text={error.response.statusText} />);
                    setError(true);
                } else {
                    setErrorMes(<ErrorCard code={502} text="An unexpected error occured" />);
                    setError(true);
                }
            })

        const fetchData = async () => {
            console.log('fetch');
            try {
                const userResponse = await axios.get('https://opendevweb-51212536012a.herokuapp.com/api/getUser/' + userID);
                console.log(userResponse.data.email);
                let info = userResponse.data;
                setProfile(<ProfileCard username={info.username} id={info._id} image={info.image} />);
            } catch (error) {
                if (error && error.response) {
                    console.log(error);
                    console.log('User not found');
                    setErrorMes(<ErrorCard code={error.response.status} text={error.response.statusText} />);
                    setError(true);
                } else {
                    setErrorMes(<ErrorCard code={502} text="An unexpected error occcured" />);
                    setError(true);
                }
            }
        };

        fetchData();
    }, [userID]);

    const save = (e) => {

        const updateUser = new FormData()

        let details = {
            username: userName
        }
        updateUser.append('details', JSON.stringify(details));
        updateUser.append('imageUp', image);

        axios.put('https://opendevweb-51212536012a.herokuapp.com/api/updateuser/' + userID, updateUser)
            .then(() => {
                document.getElementById("default").style.display = 'block';
                document.getElementById("update-user-profile").style.display = 'none';
                window.location.reload('false');
            })
            .catch((err) => {
                console.log("error", err);
                setErrorMes(<ErrorCard code={err.response.status} text={err.response.statusText} />);
                setError(true);
            })
    }

    return (
        <>
            {error ? errorMes :
                <div className="Profile-main-container">
                    {profile}
                    {/* input card for updating user info  */}
                    <div className="profile-update-card" style={{ display: 'none' }} id='update-user-profile'>
                        <Grid container spacing={0}>
                            {/* col 1 */}
                            <Grid xs={2}>
                                {/* image upload goes here */}
                                {/* <img /> */}
                                <img id='previewEdit' style={{ height: 100, width: 100 }} />
                                <Button component="label" variant="outlined" sx={{ color: '#FF3F00', borderColor: '#FF3F00' }} >
                                    Upload Image
                                    <VisuallyHiddenInput type="file" onChange={getImage} />
                                </Button>

                            </Grid>
                            {/* col 2  */}
                            <Grid xs={6}>
                                <div className="profilecard-userInfo-con">
                                    <div>
                                        {/* <h1 style={{ marginTop: 0 }}>User Name & Surname</h1> */}
                                        {/* <input name="username" type="text" placeholder="enter new username" className="update-profile-username-input"></input> */}
                                        <Grid container>
                                            <TextField id="Username" label="New Username" variant="outlined" onChange={(e) => setUserName(e.target.value)} ></TextField>
                                        </Grid>

                                        <h3>ID Number: 000 000 0000</h3>
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
                                            <p>Likes: 00</p>
                                            {/* <p> 00</p> */}
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            {/* col 3 */}
                            <Grid xs={4}>
                                <Button onClick={save} variant="outlined" sx={{ color: 'orange', border: "solid 1px orange" }}>Save</Button>
                            </Grid>
                        </Grid>
                    </div>

                    <h1 className="prev-asked-questions-title">Previously Asked Questions</h1>

                    <div className="prev-asked-questions-card-con">
                        {paq}
                    </div>

                </div>
            }
        </>
    )
}
export default Profile;