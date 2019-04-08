import HTMLFactory from "./../HTMLFactory"
import registerForm from "./registerForm"
import API from "./../apiManager.js"
import loadPage from "./loadPage"

//createNewUserObj is meant to be a factory function that is used by the post new user method.
const createNewUserObj = (userName, userEmail) => {
    return {
        userName: userName,
        email: userEmail,
        image: "images/racoon.jpg"
    }
}

const checkUserName = (userArray, searchBy) => {
    let isMatch = userArray.find(user => user.userName === searchBy);
    if(!isMatch){
        return false;
    } else {
        return true;
    }
}

const loginHandler = {
    // Function to handle user clicking login button. Function clears page and loads dashboard
    login() {
        const section = document.querySelector("#login-section");
        const userName = document.getElementById("userNameInput").value.toLowerCase();
        const userEmail = document.getElementById("emailInput").value.toLowerCase();
        let isMatch = false;
        if(userName === "" || userEmail === ""){
            alert("You left an input field blank");
        } else{
            API.getUsers().then(users => {
            users.forEach(user => {
                if (userName === user.userName.toLowerCase() && userEmail === user.email.toLowerCase()) {
                    sessionStorage.setItem("userID", user.id);
                    sessionStorage.setItem("userName", user.userName);
                    HTMLFactory.clearContainer(section);
                    loadPage.load()
                    return isMatch = false;
                } else {
                    return isMatch = true;
                }
            })
        }).then(() => {
            if(isMatch === true){
                return alert("Username or Email is invalid")
            }
        })
        }
    },
    // Function to handle user clicking register button. Function clears page, calls registerForm and appends to registerSection and then appends to body
    register() {
        const section = document.querySelector("#login-section");
        HTMLFactory.clearContainer(section);
        section.appendChild(registerForm.buildRegisterForm());
    },
    // Submit function creates an object with the user input and posts the new object into the database.
    submit() {
        const section = document.querySelector("#login-section");
        const newNameInput = document.querySelector("#registerName-input");
        const newEmailInput = document.querySelector("#registerEmail-input");
        let isUserNameMatch = false;
        let isEmailMatch = false;
        if(newNameInput.value === "") {
            return alert("You left the Username input blank");
        }else if(newEmailInput.value === "") {
            return alert("You left the Email input blank");
        }
        API.getUsers().then(users => users.forEach(user => {
            if(newNameInput.value.toLowerCase() === user.userName.toLowerCase()){
                alert("This username has been taken.")
                return isUserNameMatch = true;
            }
        })).then(() => API.getUsers())
            .then(users => users.forEach(user => {
                if(newEmailInput.value.toLowerCase() === user.email.toLowerCase()){
                    alert("This email is already registered.")
                    return isEmailMatch = true;
                }
            }))
        .then(() => {
            if(isUserNameMatch === false && isEmailMatch === false){
            API.postCreateUser(createNewUserObj(newNameInput.value, newEmailInput.value)).then((entry) => {
                sessionStorage.setItem("userID", entry.id)
                sessionStorage.setItem("userName", entry.userName)
                //return sessionStorage
            }).then(() => {
                HTMLFactory.clearContainer(section);
                loadPage.load();
            })
        }
        })
    }
};

export default loginHandler