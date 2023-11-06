<!-- Project Info -->
<br>

![GitHub repo size](https://img.shields.io/github/repo-size/Pantonym/DV200_Term4?color=lightblue)
![GitHub watchers](https://img.shields.io/github/watchers/Pantonym/DV200_Term4?color=lightblue)
![GitHub language count](https://img.shields.io/github/languages/count/Pantonym/DV200_Term4?color=lightblue)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Pantonym/DV200_Term4?color=lightblue)

<!-- Logo and link to repository -->
<p align="center">
  <a href="https://github.com/Pantonym/DV200_Term4">
    <img src="client/src/Assets/Images/Logo.svg" width="200px">
  </a>
</p>

<!-- Short Description -->
<h3 align="center">OpenDev: A Questions and Answers Forum</h3>
<p align="center"> This is a questions and answers forum website where MongoDB is used to handle clients, questions, answers and likes.
    <br>
    <!-- Bug and New Feature Links -->
    <a href="https://github.com/Pantonym/DV200_Term4/issues">Report Bug</a>
    <a href="https://github.com/Pantonym/DV200_Term4/issues">Request Feature</a>
    <br>
</p>

<!-- Name and Number In Alphabetical Order -->
<div>
    <h5 align="center" style="padding:0;margin:0;">Nico van Wyk</h5>
    <h5 align="center" style="padding:0;margin:0;">Student Number: 221179</h5>
    <br>
</div>
<div>
    <h5 align="center" style="padding:0;margin:0;">Ryno De Beer</h5>
    <h5 align="center" style="padding:0;margin:0;">Student Number: 221361</h5>
    <br>
</div>
<div>
    <h5 align="center" style="padding:0;margin:0;">Tshwetso Mokgatlhe</h5>
    <h5 align="center" style="padding:0;margin:0;">Student Number: 221411</h5>
    <br>
</div>
<div>
    <h5 align="center" style="padding:0;margin:0;">Ungerer Hattingh</h5>
    <h5 align="center" style="padding:0;margin:0;">Student Number: 221302</h5>
    <br>
</div>
<!-- Subject and Term -->
<h6 align="center">DV200 | Term 4</h6>

<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
- [About the Project](#about-the-project)
  - [Mockup](#mockup)
  - [Project Description](#project-description)
  - [Technologies Used](#technologies-used)
  - [Built With](#built-with)
    - [MERN Stack](#mern-stack)
    - [Axios](#axios)
    - [Material UI](#material-ui)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features and Functionality](#features-and-functionality)
- [Development Process](#development-process)
  - [Architecture](#architecture)
  - [Design Frame](#design-frame)
  - [Solution](#solution)
  - [Theme](#theme)
  - [Development Documents](#development-documents)
    - [Highlights](#highlights)
    - [Challenges](#challenges)
  - [Future Implementation](#future-implementation)
- [Final Outcome](#final-outcome)
  - [Mockups](#mockups)
- [License](#license)
- [Authors](#authors)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)
- [References](#references)

<!-- About the Project -->
## About the Project

<!-- Mockup -->
### Mockup
<img src="/final/mockups/Hero.png" alt="Mockup" style="height: 600px"/>

<!--PROJECT DESCRIPTION-->
### Project Description
OpenDev is a forum where users can ask questions and receive answers regarding Interactive Development. Users can create, update and delete profiles, as well as view other profiles. They can also like or dislike questions, add questions, and answer questions.
### Technologies Used
* MERN Stack
* Axios
* Material UI

### Built With
<!-- MERN Stack -->
#### MERN Stack
* MongoDB: NoSQL Database used to store the information of the web application.
* Express: A Node.js framework that was used to implement HTTP logic.
* React.js: A JavaScript library used to build the front end of the application.
* Node.js: The environment used to handle the server requests.
<p>The MERN Stack was used to build both the database of the web application, as well as the front end.</p>
<img src="/final/images/MERN.jpeg" alt="MERN_Logo" style="width: 300px; height: auto;" />

<!-- Axios & AJAX -->
#### Axios
* Makes Asynchronous JavaScript and XML (AJAX) easier to implement.
* It is a JavaScript library.
* Enables asynchronous requests.
* Used to implement Create, Read, Update and Delete (CRUD) functionality.
<p>AXIOS implemented the requirements of having charts populated with real data that can change asynchronously.</p>
<img src="/final/images/AJAX_Logo.jpg" alt="AJAX-Logo" style="width: 400px; height: 225px;"/>
<img src="/final/images/AXIOS_logo.png" alt="Axios-Logo" style="width: 400px; height: 225px;"/>

<!-- MUI -->
#### Material UI
* Provides CSS frameworks for the implementation of responsive user experience designs.
* Used to implement the front end of the application.
* Uses grid-based layouts similar to Bootstrap.
<p>Material UI (MUI) implemented the requirements of having a responsive, professional design.</p>
<img src="/final/images/MUI.png" alt="Bootstrap-Logo" style="width: 400px; height: auto;"/>

<!-- GETTING STARTED -->
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
For development and testing, a React App is required (`Terminal --> New Terminal --> npx create-react-app appName`). This should download the most recent version of React. In addition, the latest version of Node.js is required, which is available here: [Node.js](https://nodejs.org/en)

### Installation
Here are a couple of ways to clone this repo:

1.  GitHub Desktop </br>
    Enter `https://github.com/Pantonym/DV200_Term4_.git` into the URL field and press the `Clone` button.

2.  Clone Repository </br>
    Run the following in the command-line to clone the project:

    ```sh
    git clone https://github.com/Pantonym/DV200_Term4_.git
    ```
The following installations are required if you do not clone the repository:
* Click on Terminal and open a new terminal
* Type the following:
1. cd appName
2. npm i axios
3. npm i react-router-dom
4. npm i @mui/material @emotion/react @emotion/styled
5. cd serverName
6. npm i nodemon cors multer express mongodb dotenv mongoose
7. npm start
* To close the app: `ctrl+c`, `Y` in the terminal.

<!-- Main Features and Functionality -->
## Features and Functionality
1. Log in and Authenticate users
* UseStates are connected to an OnUpdate event, which update each time an `<input>` is changed. These values are sent to the server using an `axios.post` call, specifically the auth.js route, where it is authenticated. After the data is validated, a JWT is generated for additional safety.
```js
try {
    const url = 'http://localhost:5002/api/auth'
    const { data: res } = await axios.post(url, data);
    sessionStorage.setItem("token", res.data);
    sessionStorage.setItem("useremail", data.email);
    if (data.email === 'Nico@gmail.com' || data.email === 'wetso@gmail.com' || data.email === 'ryno@gmail.com') {
        sessionStorage.setItem('Admin', true);
    } else {
        sessionStorage.setItem('Admin', false);
    }
    window.location = '/Home';
} catch (error) {
```

2. Register Users
* If a user signs up, and their data is validated, they will be taken to the SignIn.js page. The data is validated in the same manner as the sign in functionality, and the data is saved to the database with an `axios.post` call.
```js
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const url = 'http://localhost:5002/api/createUser';
        const { data: res } = await Axios.post(url, data);
        console.log(res.message);
        window.location = '/SignIn';
    } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        const errorData = error.response.data;
        setErrors({
          username: errorData.username ? errorData.username : 'User name already exists!',
          email: errorData.email ? errorData.email : 'Email belongs to an existing account!',
          password: errorData.password ? errorData.password : '',
});}}};
```

3. Log Out Users
* When the Sign Out option is clicked on the Navbar.jsx component, SessionStorage will be cleared and the relevant useState will be updated to change the navbar appearance to remove options that logged out users would not require.
```js
const handleSignOut = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
}
```

4. Protect Users using BCrypt
* When the user registers, the bcrypt password is generated. Using SALT, a random value is added to the end of the encrypted password to further encrypt it. After the SALT is generated, the password is Hashed.
```js
const salt = await bcrypt.genSalt(Number(process.env.SALT));

const hashPassword = await bcrypt.hash(req.body.password, salt);
```
* When the user logs in, because the password is encrypted, it is tested using `bcrypt.compare()`.
```js
const validPassword = await bcrypt.compare(
    req.body.password,
    user2.password
)
```

5. Questions - Post
* If the `<input>` tags are empty, the `axios.post` will not occur. It is linked to a function that is called whenever the submit button is clicked.
```js
const addQuestion = (e) => {
    if (title === '' && content === '') {...} 
    else if (content === '') {...} 
    else if (title === '') {...} 
```
* If the content and title is entered, generate a payload that will be sent to the database. Because of how `Multer` uploads images, the data must be saved to `FormData` and turned into a string with `JSON.stringify()`. Finally, the image is appended at the end and the payload is sent.
```js
else if (title && content) {
    setTitleAlert(false);
    setContentAlert(false);
    const payload = new FormData()
    let data = {
        id: id,
        title: title,
        text: content,
        date: formatDate,
        comments: '',
    }
    console.log(data);
    payload.append('data', JSON.stringify(data));
    payload.append('image', Image);
    Axios.post('http://localhost:5002/api/addquestion', payload).then(
        (response) => {
            console.log(response);       
            const queryParams = new URLSearchParams();
            queryParams.append('id', response.data._id);
            navigate('/question?${queryParams.toString()}');
        },(error) => {
            console.log(error);
            setErrorMessage(<ErrorCard code={error.response.status} text={error.response.statusText} />);
            setErrorS(true);
})
console.log(payload)
}}
```

6. Questions - Answer
* The answer is added by clicking on the button to reveal the `<input>` tags. If the user is not logged in, they will be taken to the SignIn.js page.
```js
const addAnswer = async () => {
    if (logged) {
    try {if (Id === null) {
        window.location = '/signin'
    } else {
```
* The question that is currently displayed will be found and the new data will be saved to an object. Because, in the questions.js model, the comments are an array of objects. 
* The new comment is saved into the object and added to the Payload, which is the data gathered from the question that is currently displayed. The userID is also saved, as it is taken from SessionStorage.
* Finally, the payload is sent to the server with an `axios.post` call. When the answer has been added, the window will reload to display the new data.
```js
    let urlGet = 'http://localhost:5002/api/question_get_single/' + questionID;
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
            let url = 'http://localhost:5002/api/question/' + questionID;
            const result = await Axios.put(url, payload);
            window.location.reload(false);
```

7. Upvote and Downvote Questions
* The downvote function is the upvote function, which I will describe, but reversed.
* First, the user that is currently logged in is found through the users.js route. This route sends the email, which is saved to SessionStorage, to find the ID of the user. 
```js
const handleLike = async () => {
    // Find who is currently logged in 
    let usermail = sessionStorage.getItem('useremail');
    // If the usermail is not set to session storage yet, exit the like function
    if (usermail === null || usermail === undefined) {return;}
    try {Axios.get("http://localhost:5002/api/GetUserID/" + usermail)
    .then((res) => {
        const response = res;
        setId(response.data[0]._id);
        console.log(response.data[0]._id);
        console.log(Id);
    })
```

* Get all the likes (or dislikes) to test if the user has already done one or the other. This is also done to update the values once the page loads or the question has been liked/disliked.
```js
Axios.get('http://localhost:5002/api/like_get_all/')
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
}}}
```
* When the like or dislike button is clicked, do one of the following depending on if the user has not done either yet, has only done one, or has only done the other.
```js
// If the user HASN'T liked this post yet
if (bFound === false) {
    // Increase likes by 1
    addLike(1);
    // Axios post to add another like to the database
    let url = "http://localhost:5002/api/like_add/";
    let data = {
        userID: USER,
        questionID: questionID,
        type: "like"
    };
    Axios.post(url, data);
    document.getElementById("btnLike").style.color = 'gray';
} else if (bFound === true && questionType === "like") {
    // If the user has already liked the post, delete the entry
    // Build the url and the data
    let url = "http://localhost:5002/api/like_delete/" + likeID;
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
        let url = "http://localhost:5002/api/like_update/" + likeID;
        let updata = {
            userID: USER,
            questionID: questionID,
            type: "like"
        };
        // Update the db with the new like
        Axios.put(url, updata).catch(console.log("Axios error"));
        addLike(1);
        addDislike(-1);
        document.getElementById("btnLike").style.color = 'gray';
    }
}
```

8. Show Questions on the Home Page
* Using a `.map()` function, the questions are populated form the database. Using a `axios.get` call, the data is gathered form the database to be sent.
```js
Axios.get(axiosCall)
.then(res => {
    setLoadedEntries(0);
    let renderQuestions = res.data.map((item) =>
        <HomeQuestionCard key={item._id} id={item._id} user={item.user} title={item.title} text={item.text} date={item.date} comments={item.comments} image={item.image} />);
    setSearchR(renderQuestions);
```

9. Search Through Questions
* Through the questions.js route (from the HomePage.js page), the entered words are sent as a parameter to find matches from all titles in the database
```js
const handleSearch = () => {
    if (searcher === '') {
        setAxiosCall('http://localhost:5002/api/question_get_all/');
    } else {
        setAxiosCall('http://localhost:5002/api/searchquestion/' + searcher);
}}
```

* Inside the questions.js route, a `.find` function is called to find the matching text. Then in the response, the matching questions are returned to the client side.
```js
router.get('/api/searchquestion/:search', async (req, res) => {
    try {
        const searchTerm = req.params.search;
        const questions = await QuestionSchema.find({
            $or: [
                { title: new RegExp(searchTerm, 'i') },
                { text: new RegExp(searchTerm, 'i') }
]});
    res.json(questions)
```

10.  Question Images
* The imageURL is set to a usestate, where it accesses image sin the public folder of the website's server.
`const serverURL = 'http://localhost:5002/images';`
`const imageURL = '${serverURL}/${question.image}';`

11.   Administrator Rights
* First, the Administrator emails are tested against the supplied email, and if it is found that the user is an admin, the relevant `SessionStorage` item will be set.
```js
try {
    const url = 'http://localhost:5002/api/auth'
    const { data: res } = await axios.post(url, data);
    sessionStorage.setItem("token", res.data);
    sessionStorage.setItem("useremail", data.email);
    if (data.email === 'Nico@gmail.com' || data.email === 'wetso@gmail.com' || data.email === 'ryno@gmail.com') {
        sessionStorage.setItem('Admin', true);
    } else {
        sessionStorage.setItem('Admin', false);
    }
    window.location = '/Home';
} catch (error) {
```
* The Administrator can see additional buttons on each of the pages which gives them further functionality.
`{dispDel ? <Button variant="contained" sx={{ margin: "auto" }} id="btnDelete" onClick={handleDelete}><BiXCircle />Delete</Button> : null}`

<!-- Development PROCESS -->
## Development Process
### Architecture
The application consists of multiple react pages and components. It communicates with a NoSQL database to receive and send information. `Axios` was used to contact `MongoDB`to create the database used in this project, as well as the application `Insomnia` to test the functionality.
### Design Frame
How might we create a solution to the problem of needing an online web application that hosts a questions and answers forum, while safely managing user data, as well as allowing them to upload questions that they can like and dislike.
### Solution
The OpenDev application, which can Create, Read, Update and Delete (CRUD) entries in a No-SQL Database for users, questions and answers data.
### Theme
We chose a theme matching the Open Window Institute's theme, as the application is meant to be a forum where Interactive Development students can ask and answer questions regarding Interactive Development. We were also inspired by other forum websites, particularly to create the layout for the questions and answers.

### Development Documents
<!-- Style Sheet -->
* Style Sheet
<img src="/final/images/Style%20Sheet.png" alt="StyleSheet" style="height: 800px">

<!-- Object Mapping -->
* Object Mapping
<img src="/final/images/Object%20Mapping.png" alt="Object Mapping" style="height: 600px">

<!-- Wireframes -->
* Wireframes
Home Page
<img src="/final/wireframes/Home.png" alt="Home" style="width: 700px"/>
User Profile Page
<img src="/final/wireframes/User%20Profile.png" alt="Profile" style="width: 700px"/>
Question Editor Page
<img src="/final/wireframes/Question%20Text%20Editor.png" alt="TextEditor" style="width: 700px"/>

<!-- Highlights -->
#### Highlights
* A great highlight was the team working together to create a functioning application. 
* The team brought their understanding together, and ti was satisfying to see everyone do their part as each member had their own specialty.
* It was very satisfying to solve errors as they appeared, making it feel like the project was constantly evolving. 

<!-- Challenges -->
<!-- Explain the challenges faced with the project and why you think you faced it or how you think you'll solve it (if not solved), or how you solved it -->
#### Challenges
* A great challenge was figuring out hosting, as MERN Stack applications are harder to host than simple html/JavaScript projects.
* Errors popping up as the repository was updated was a challenge, as the team had to come together to ensure bug fixes weren't reverted with each update.
* Coordinating team meetings was hard to do as each member had their own subjects they had to work around.

<!-- Future Implementation -->
### Future Implementation
* Implement an awards system.
* Re-Implement the likes system, as the current model is not highly scalable. It would be much better to add the likes to the question itself as an array of users that have liked.disliked.
* We would also like to make the website completely responsive.

<!-- Final Outcome -->
## Final Outcome
* Heroku Deployment
  https://opendevryno-7bf78ce85d24.herokuapp.com/Home
* Firebase Deployment
  https://opendevryno.web.app/
<!-- MOCKUPS -->
### Mockups
<img src="/final/mockups/Hero.png" alt="Mockup" style="height: 600px"/>
<img src="/final/mockups/Profile.png" alt="Mockup" style="height: 600px"/>
<img src="/final/mockups/QuestionsHome.png" alt="Mockup" style="height: 600px"/>
<img src="/final/mockups/Question.png" alt="Mockup" style="height: 600px"/>

<br>

<!-- Video Demonstration -->
<!-- ### Video Demonstration -->
<!-- **Video Demonstration:** <a href="">Google Drive Link</a> -->

<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE` for more information.

<!-- AUTHORS -->
## Authors
* **Nico van Wyk** - [Github](https://github.com/Pantonym)
* **Ryno De Beer** - [Github](https://github.com/Rynoo1)
* **Tshwetso Mokgatlhe** - [Github](https://github.com/TshwetsoMo)
* **Ungerer Hattingh** - [Github](https://github.com/Ungerer221)

<!-- Contact -->
## Contact
**Nico van Wyk** - [221179@virtualwindow.co.za](mailto:221179@virtualwindow.co.za)
**Ryno De Beer** - [221361@virtualwindow.co.za](mailto:221361@virtualwindow.co.za)
**Tshwetso Mokgatlhe** - [221411@virtualwindow.co.za](mailto:221411@virtualwindow.co.za)
**Ungerer Hattingh** - [221302@virtualwindow.co.za](mailto:221302@virtualwindow.co.za)

* **Project Link** - https://github.com/Pantonym/DV200_Term4

<!-- ACKNOWLEDGEMENTS -->
<!-- all resources that you used and Acknowledgements here -->
## Acknowledgements
* [Lecturer](https://github.com/TsungaiKats)
* [Figma](https://www.figma.com/)
* [W3Schools](https://www.w3schools.com)

## References
* https://blog.nextideatech.com/how-to-get-started-with-the-mern-stack-a-comprehensive-guide/ (MERN Stack Logo Image)
* https://www.geekboots.com/story/ajax-and-its-usability-in-web-development (AJAX Logo Image)
* https://blog.openreplay.com/integrating-axios-with-react-hooks/ (AXIOS Logo Image)
* https://medium.com/ms-club-of-sliit/material-ui-a-guide-to-build-modern-and-responsive-web-applications-f2033975da8f (Material UI Logo Image)
