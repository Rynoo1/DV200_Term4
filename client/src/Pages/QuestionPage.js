import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Axios from "axios";
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { BiXCircle } from 'react-icons/bi';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

import './QuestionPage.css';
import AnswerCards from "../Components/AnswerCards";
import ErrorCard from "../Components/ErrorCard";
// import answer from "../../../server/models/answer";

function QuestionPage() {
    // const questionID = sessionStorage.getItem("QuestionClick");
    const [question, setQuestion] = useState({});
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const [errorS, setErrorS] = useState(false);
    const navigate = useNavigate();

    // for the user avatar image
    const [userImage, setUserImage] = useState();

    // Get the user id
    const [Id, setId] = useState('');
    const [userAskedID, setUserAskedID] = useState('');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const questionID = searchParams.get('id');

    // Initialize as null in case there are no comments
    const [answers, setAnswers] = useState();
    const [renderAnswers, setRenderAnswers] = useState(null);

    const [AnswerTitle, setAnswerTitle] = useState();
    const [AnswerText, setAnswerText] = useState();
    const [updateAnswers, setUpdateAnswers] = useState();

    const [error, setError] = useState("");
    const [dispDel, setDispDel] = useState(false);
    const [logged, setLogged] = useState(false);

    // likes & dislike counter function 
    // likes 
    const [like, setLike] = useState(0); // here we can fetch the number from the database

    function addLike(Amount) {
        setLike(like + Amount);
    };

    // dislikes 
    const [dislike, setDislike] = useState(0);

    function addDislike(Amount) {
        setDislike(dislike + Amount);
    };

    // TODO Handles the like clicking
    const handleLike = async () => {

        // Find who is currently logged in 
        let usermail = sessionStorage.getItem('useremail');

        // If the usermail is not set to session storage yet, exit the like function
        if (usermail === null || usermail === undefined) {
            return;
        }

        try {
            Axios.get("https://opendevweb-51212536012a.herokuapp.com/api/GetUserID/" + usermail)
                .then((res) => {
                    const response = res;
                    setId(response.data[0]._id);
                    console.log(response.data[0]._id);
                    console.log(Id);
                })

        } catch (error) {
            console.log(error);
            console.log('User ID not found');
        }

        // Get all likes
        Axios.get('https://opendevweb-51212536012a.herokuapp.com/api/like_get_all/')
            .then((res) => {
                // --Set the likes to a variable to see which questions this user has liked. 
                // --This prevents the same person from liking the same post more than once.
                let questions = res.data;

                // --Call session storage once to ensure it is never lagging behind.
                // --Set a variable to the ID of the logged in user.
                let USER = Id;

                // --Used to test if the user has been found
                let bFound = false;
                let questionType = "";
                let likeID = "";

                // --Run through the array of liked posts to see which posts this user has liked.
                for (let k = 0; k < questions.length; k++) {
                    // ---If the user has been found
                    if (USER === questions[k].userID) {

                        // ----If the user liked this specific question
                        if (questionID === questions[k].questionID) {
                            bFound = true;
                            questionType = questions[k].type;
                            likeID = questions[k]._id;
                        }

                    }
                }

                // If the user HASN'T liked this post yet
                if (bFound === false) {
                    // Increase likes by 1
                    addLike(1);

                    // Axios post to add another like to the database
                    let url = "https://opendevweb-51212536012a.herokuapp.com/api/like_add/";
                    let data = {
                        userID: USER,
                        questionID: questionID,
                        type: "like"
                    }

                    Axios.post(url, data);
                    document.getElementById("btnLike").style.color = 'gray';

                } else if (bFound === true && questionType === "like") {
                    // If the user has already liked the post, delete the entry

                    // Build the url and the data
                    let url = "https://opendevweb-51212536012a.herokuapp.com/api/like_delete/" + likeID;

                    // Delete the entry to unlike the post
                    Axios.delete(url).catch("Error deleting");

                    // Decrease likes with one
                    addLike(-1);

                    // Set the button to gray to discourage like spamming
                    document.getElementById("btnLike").style.color = 'gray';

                } else if (bFound === true && questionType === 'dislike') {
                    // if the user changes from a dislike to a like
                    try {

                        // Build the url and the data
                        let url = "https://opendevweb-51212536012a.herokuapp.com/api/like_update/" + likeID;
                        let updata = {
                            userID: USER,
                            questionID: questionID,
                            type: "like"
                        }

                        // Both are correct
                        // console.log(url);
                        // console.log(updata);

                        // Update the db with the new like
                        Axios.put(url, updata).catch(console.log("Axios error"));

                        addLike(1);
                        addDislike(-1);

                        document.getElementById("btnLike").style.color = 'gray';

                    } catch (error) {
                        console.log('error adding like')
                    }

                }

            })
            .catch((err) => {
                console.error(`Error fetching user data: ${err.message}`);
            });

    }

    // TODO Handles the dislike clicking
    const handleDislike = async () => {

        // Find who is currently logged in 
        let usermail = sessionStorage.getItem('useremail');

        // If the usermail is not set to session storage yet, exit the like function
        if (usermail === null || usermail === undefined) {
            return;
        }

        try {
            Axios.get("https://opendevweb-51212536012a.herokuapp.com/api/GetUserID/" + usermail)
                .then((res) => {
                    const response = res;
                    setId(response.data[0]._id);
                })

        } catch (error) {
            console.log(error);
            console.log('User ID not found');
        }

        // Get all dislikes
        Axios.get('https://opendevweb-51212536012a.herokuapp.com/api/like_get_all/')
            .then((res) => {
                let questions = res.data;

                let USER = Id;

                let bFound = false;
                let questionType = "";
                let likeID = "";

                // --Run through the array of liked posts to see which posts this user has liked.
                for (let k = 0; k < questions.length; k++) {
                    // ---If the user has been found
                    if (USER === questions[k].userID) {

                        // ----If the user liked this specific question
                        if (questionID === questions[k].questionID) {
                            bFound = true;
                            questionType = questions[k].type;
                            likeID = questions[k]._id;
                        }

                    }
                }

                // If the user HASN'T liked this post yet
                if (bFound === false) {
                    // Increase likes by 1
                    addDislike(1);

                    // Axios post to add another like to the database
                    let url = "https://opendevweb-51212536012a.herokuapp.com/api/like_add/";
                    let data = {
                        userID: USER,
                        questionID: questionID,
                        type: "dislike"
                    }

                    Axios.post(url, data);
                    document.getElementById("btnDislike").style.color = 'gray';

                } else if (bFound === true && questionType === "dislike") {
                    // If the user has already disliked the post, delete the entry

                    // Build the url and the data
                    let url = "https://opendevweb-51212536012a.herokuapp.com/api/like_delete/" + likeID;

                    // Delete the entry to unlike the post
                    Axios.delete(url).catch("Error deleting");

                    // Decrease likes with one
                    addDislike(-1);

                    // Set the button to gray to discourage like spamming
                    document.getElementById("btnDislike").style.color = 'gray';

                } else if (bFound === true && questionType === "like") {
                    // if the user changes from a like to a dislike
                    try {

                        // Build the url and the data
                        let url = "https://opendevweb-51212536012a.herokuapp.com/api/like_update/" + likeID;
                        let updata = {
                            userID: USER,
                            questionID: questionID,
                            type: "dislike"
                        }

                        // Update the db with the new like
                        Axios.put(url, updata).catch(console.log("Axios error"));

                        addDislike(1);
                        addLike(-1);

                        document.getElementById("btnDislike").style.color = 'gray';

                    } catch (error) {
                        console.log('error adding dislike')
                    }

                }

            })
            .catch((err) => {
                console.error(`Error fetching user data: ${err.message}`);
            });

    }

    const handleDelete = async () => {
        let url = 'https://opendevweb-51212536012a.herokuapp.com/api/question_get_single/' + questionID;

        Axios.get(url).then(res => {
            let FoundUser = res.data.user;
            console.log(FoundUser);

            if (sessionStorage.getItem("admin") === true || FoundUser === Id) {

                if (window.confirm('Are you sure you want to delete this question? This cannot be undone.') === true) {
                    // Build the url and the data
                    let url = "https://opendevweb-51212536012a.herokuapp.com/api/question_delete/" + questionID;

                    // Delete the entry to unlike the post
                    Axios.delete(url)
                        .then(res => {
                            console.log(res);
                            window.alert(res.data.message);
                            window.location = '/Home';
                        })
                        .catch("Error deleting");
                }

            } else {
                window.alert("You do not have permissions to delete this question.")
            }
        })
            .catch(err => {
                console.error("Error getting question: ", err);
                window.alert("Error getting question");
            });

    }

    useEffect(() => {
        // Fetch the question
        Axios.get(`https://opendevweb-51212536012a.herokuapp.com/api/question_get_single/${questionID}`)
            .then((result) => {
                setQuestion(result.data);
                // console.log(result.data);
                setUserAskedID(result.data.user);

                // If there are no tags
                if (result.data.tags === undefined) {
                    result.data.tags = ["No Tags"];
                }

                // Fetch the question asking user
                Axios.get(`https://opendevweb-51212536012a.herokuapp.com/api/getUser/${result.data.user}`)
                    .then((userResult) => {
                        setUsername(userResult.data.username);
                        const serverURLUser = 'https://opendevweb-51212536012a.herokuapp.com/userImages';
                        setUserImage(`${serverURLUser}/${userResult.data.image}`);
                        console.log('User Image: ' + userImage);
                        console.log(userResult.data.image);
                    })
                    .catch((err) => {
                        console.error("Error fetching user:", err);
                    });

                // If the comments array is not empty, do the following:
                if (result.data.comments.length > 1) {
                    setRenderAnswers(
                        result.data.comments.slice(1).map((item) => (
                            <AnswerCards key={item._id} id={item._id} user={item.user} title={item.title} text={item.text} />
                        ))
                    );
                    setAnswers(true)
                }

                Axios.get('https://opendevweb-51212536012a.herokuapp.com/api/like_get_all/')
                    .then((res) => {
                        // --Gather all liked questions and set them to the variable here
                        let questions = res.data;
                        // ---console.log(questions);

                        // variable to count the amount of likes and dislikes
                        let iLikes = 0;
                        let iDislikes = 0;

                        // Count how many likes there are
                        for (let k = 0; k < questions.length; k++) {
                            if (questions[k].questionID === questionID) {
                                switch (questions[k].type) {
                                    case "like":
                                        // increase like amount by one
                                        iLikes++;
                                        // console.log('Found Like');
                                        break;

                                    case "dislike":
                                        iDislikes++;
                                        // console.log('Found Dislike');
                                        break;

                                    case "none":
                                        break;
                                }
                            }
                        }

                        // set the amount of likes equal to the amount counted
                        addLike(iLikes);
                        addDislike(iDislikes);

                    })
                    .catch((err) => {
                        console.error(`Error fetching user data: ${err.message}`);
                    });


                const usermail = sessionStorage.getItem('useremail');
                if (usermail) {
                    Axios.get("https://opendevweb-51212536012a.herokuapp.com/api/GetUserID/" + usermail)
                        .then((response) => {
                            setId(response.data[0]._id);
                            setLogged(true);
                            const spid = response.data[0]._id;

                            // Now that we have the user's ID, check for admin status and show the delete button if applicable
                            Axios.get('https://opendevweb-51212536012a.herokuapp.com/api/question_get_single/' + questionID)
                                .then((res) => {
                                    const FoundUser = res.data.user;
                                    console.log(FoundUser);
                                    if (sessionStorage.getItem("admin") === true || FoundUser === spid) {
                                        setDispDel(true);
                                    }
                                })
                                .catch((err) => {
                                    console.error("Error checking for admin status:", err);
                                    setErrorS(true);
                                    setErrorMessage(<ErrorCard code={err.response.status} text={err.response.statusText} />);
                                });
                        })
                        .catch((error) => {
                            console.error("Error fetching user ID:", error);
                            setErrorS(true);
                            setErrorMessage(<ErrorCard code={error.response.status} text={error.response.statusText} />);
                        });
                } else {
                    setDispDel(false);
                    setLogged(false);
                }
            })
            .catch((err) => {
                console.error("Error fetching question:", err);
                setErrorS(true);
                setErrorMessage(<ErrorCard code={err.response.status} text={err.response.statusText} />);
            });

        // let usermail = sessionStorage.getItem('useremail');

        // // If the usermail is not set to session storage yet, exit the like function
        // try {
        //     Axios.get("http://localhost:5002/api/GetUserID/" + usermail)
        //         .then((response) => {
        //             setId(response.data[0]._id);
        //             console.log(response.data[0]._id);
        //             console.log(Id + ' id');
        //         })
        // } catch (error) {
        //     console.log(error);
        //     console.log('User ID not found');
        // };

        // Axios.get('http://localhost:5002/api/question_get_single/' + questionID)
        //     .then((res) => {
        //         let FoundUser = res.data.user;
        //         console.log(FoundUser);
        //         if (sessionStorage.getItem("admin") === true || FoundUser === Id) {
        //             setDispDel(true);
        //         }
        //     })

    }, []);

    const serverURL = 'https://opendevweb-51212536012a.herokuapp.com/images';
    const imageURL = `${serverURL}/${question.image}`;

    // answer question
    const AnswerQ = (e) => {
        document.getElementById("answer-title-field").style.display = "block"
        document.getElementById("answer-main-field").style.display = "block"
        document.getElementById("answer-question-submit").style.display = "block"
    }

    const CancelQ = (e) => {
        document.getElementById("answer-title-field").style.display = "none"
        document.getElementById("answer-main-field").style.display = "none"
        document.getElementById("answer-question-submit").style.display = "none"
    }

    const getAnswerTitle = (e) => {
        let value = e.target.value;
        setAnswerTitle(value);
    }

    const getAnswerText = (e) => {
        let value = e.target.value;
        setAnswerText(value);
    }

    // add answer functionality
    const addAnswer = async () => {
        // let usermail = sessionStorage.getItem('useremail');
        if (logged) {
        try {
            if (Id === null) {
                window.location = '/signin'
            } else {
                // let usermail = sessionStorage.getItem('useremail');
                // console.log(usermail);

                // const res = await Axios.get("http://localhost:5002/api/GetUserID/" + usermail);
                // const userID = res.data[0]._id;
                // console.log(res.data);

                let urlGet = 'https://opendevweb-51212536012a.herokuapp.com/api/question_get_single/' + questionID;

                const response = await Axios.get(urlGet);
                const Comments = response.data.comments;

                let push = {
                    user: Id,
                    title: AnswerTitle,
                    text: AnswerText
                }

                Comments.push(push);

                const userData = response.data.user;
                const title = response.data.title;
                const text = response.data.text;
                const date = response.data.date;

                let payload = {
                    user: userData,
                    title: title,
                    text: text,
                    date: date,
                    comments: Comments
                }

                let url = 'https://opendevweb-51212536012a.herokuapp.com/api/question/' + questionID;
                const result = await Axios.put(url, payload);
                window.location.reload(false);
            }
        } catch (err) {
            console.log(err);
            setError(err);
        }} else {
            window.alert("Please log in to answer");
            window.location = "/signin";
        }
    }

    // Go to a user who asked the question's page
    const usernameClick = () => {
        const queryParams = new URLSearchParams();
        queryParams.append('userid', userAskedID);
        sessionStorage.setItem("UserIDQuestionPage", userAskedID);
        navigate(`/profile?${queryParams.toString()}`);
    }

    return (
        <>
            {errorS ? errorMessage :
                <div className="question-page-con">
                    <Grid container spacing={0}>
                        {/* Render user information */}
                        <Grid item xs={2}>
                            <Grid item xs={12}>
                                <Avatar
                                    sx={{ width: '110px', height: '110px', margin: 'auto' }}
                                    src={userImage}>
                                </Avatar>
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={usernameClick}>{username}</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <p>{question.date}</p>
                            </Grid>
                        </Grid>
                        {/* Render question information */}
                        <Grid item xs={8}>
                            <h1>{question.title}</h1>
                            <p>{question.text}</p>
                            <div>
                                {Array.isArray(question.tags) ? (
                                    question.tags.map((tag, index) => (
                                        <Chip key={index} label={tag} variant="outlined" />
                                    ))
                                ) : (
                                    <Chip label={"No Tags"} variant="outlined" />
                                )}
                            </div>
                        </Grid>
                        {/* Render delete button */}
                        <Grid item xs={2}>
                            {dispDel ? <Button variant="contained" sx={{ margin: "auto" }} id="btnDelete" onClick={handleDelete}><BiXCircle />Delete</Button> : null}
                            <br></br>
                            <br></br>

                            <Button onClick={handleLike} id="btnLike">Like &nbsp;&nbsp;&nbsp; {like}</Button>
                            <br></br>
                            <Button onClick={handleDislike} id="btnDislike">Dislike &nbsp;&nbsp;&nbsp; {dislike}</Button>

                        </Grid>
                    </Grid>

                    {/* Image row */}
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <img src={imageURL} alt={question.title} className="question_img"></img>
                        </Grid>
                    </Grid>

                    {/* answer question form section  */}
                    <Grid container spacing={0}>
                        <Grid xs={12} sx={{ marginBottom: '20px' }}>
                            {/* //? when you first click the button it pops up with a weird error but if you close the error it functions fine */}
                            <Button onClick={AnswerQ} variant="contained">Answer</Button>
                        </Grid>
                        <Grid id="answer-title-field" xs={12} sx={{ marginTop: '10px' }} style={{ display: 'none' }}>
                            <TextField
                                sx={{ width: '50%', maxWidth: '700px', }}
                                label="Answer Title"
                                variant="outlined"
                                onChange={getAnswerTitle}
                            ></TextField>
                        </Grid>
                        <Grid id="answer-main-field" xs={12} sx={{ marginTop: '20px', marginBottom: '20px' }} style={{ display: 'none' }}>
                            <TextField
                                sx={{ width: '50%', maxWidth: '700px', }}
                                label="Answer field"
                                // this is what is causing the resize loop error
                                // multiline
                                // rows={5}
                                onChange={getAnswerText}
                            ></TextField>
                        </Grid>
                        <Grid id="answer-question-submit" xs={12} sx={{ marginBottom: '20px' }} style={{ display: "none" }}>
                            <Button onClick={addAnswer} variant="outlined">Submit</Button>
                            <Button onClick={CancelQ} sx={{ fontSize: '24px' }}><BiXCircle /></Button>
                        </Grid>
                    </Grid>

                    {/* Answers section */}
                    <div className="answers_bg">
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={2}>
                                        <p id="answers_text">Answers:</p>
                                    </Grid>
                                    <Grid item xs={10}></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Render answers here */}
                        <Grid>
                            {answers}
                        </Grid>
                        {/* If there are no answers, do the following: */}
                        {answers ? renderAnswers : <p>No answers available yet.</p>}

                    </div>
                </div>
            }
        </>
    );
}

export default QuestionPage;