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
        const userName = document.getElementById("userNameInput").value.toLowerCase();
        const userEmail = document.getElementById("emailInput").value.toLowerCase();
        API.getUsers().then(users => {
            users.forEach(user => {
                if (userName === user.userName.toLowerCase() && userEmail === user.email.toLowerCase()) {
                    sessionStorage.setItem("userID", user.id);
                    sessionStorage.setItem("userName", user.userName);
                }
            })
        }).then(() => {
            // let userID = sessionStorage.getItem("userID");
            const section = document.querySelector("#login-section");
            HTMLFactory.clearContainer(section)
        }).then(() => {
            // Calling function to build all sections of DOM
            loadPage.load()
        })


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
        let matches = [];
        if(newNameInput.value === "") {
            return alert("You left the Username input blank");
        }else if(newEmailInput.value === "") {
            return alert("You left the Email input blank");
        }
        API.getUsers().then(users => users.forEach(user => {
            if(newNameInput.value.toLowerCase() === user.userName.toLowerCase()){
                alert("This username has been taken.")
                return matches.push(user.userName)
            }
        }))
        API.getUsers().then(users => users.forEach(user => {
            if(newEmailInput.value.toLowerCase() === user.email.toLowerCase()){
                alert("This email is already registered.")
                return matches.push(user.email);
            }
        })).then(() => {
            if(matches.length === 0){
            API.postCreateUser(createNewUserObj(newNameInput.value, newEmailInput.value)).then((entry) => {
                return sessionStorage.setItem("userID", entry.id)
            }).then(() => {
                HTMLFactory.clearContainer(section);
                loadPage.load();
            })
        }
        })
    }
};

export default loginHandler