import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

// MUI 
import Chip from '@mui/material/Chip';

import { BiLike, BiDislike } from 'react-icons/bi'

// CSS 
import './AskedQuestionsCard.css'

const AskedQuestionsCard = (props) => {

    const navigate = useNavigate();
    const [id, setId] = useState('');

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

    useEffect(() => {

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
                    if (questions[k].questionID === props.id) {
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
    }, []);

    const redirect = () => {
        const queryParams = new URLSearchParams();
        queryParams.append('id', props.id);
        sessionStorage.setItem("QuestionClick", props.id);
        navigate(`/question?${queryParams.toString()}`);
    };

    if (props.user === props.userID) {
        return (
            <div className="askedQuestionCard-Container">
                {/* row 1  */}
                <div className="askedQuestionCard-header-row">

                    {/* card title info  */}
                    <div className="askedQuestionCard-title-info">
                        {/* logo */}
                        <div className="askedQuestionCard-logo">
                            <img src="" alt=""></img>
                        </div>
                        {/* user name & surname  */}
                        <h1 className="askedQuestionsCard-Title"> {props.title} </h1>
                    </div>

                    {/* like and dislike buttons con  */}
                    <div className="askedQuestionCard-like-dislike-btn-con">
                        <button ><BiLike /> Like {like}</button>
                        <button className="askedQuestionCard-dislike-btn"><BiDislike /> Dislike {dislike}</button>
                        {/* <button><BiXCircle/> Delete</button> */}
                    </div>
                </div>

                {/* divider  */}
                <div className="askedQuestionCard-divider"></div>
                <div className="askedQuestionCard-tags">
                    {Array.isArray(props.tags) ? (
                        props.tags.map((tag, index) => (
                            <Chip key={index} label={tag} variant="outlined" />
                        ))
                    ) : (
                        <Chip label={"No Tags"} variant="outlined" />
                    )}
                </div>

                <div className="askedQuestioncard-content">
                    <p>
                        {props.text}
                    </p>
                </div>

                {/* <Nav.Link href='#'>See more</Nav.Link> */}
                <p style={{ color: '#37C5F1', fontWeight: 'bold', cursor: 'pointer' }} onClick={redirect} >See More</p>

            </div>
        )
    } else {
        return (
            <div style={{ display: 'none' }}></div>
        )
    }

}
export default AskedQuestionsCard