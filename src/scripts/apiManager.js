// this is the object for the api fetch calls.


//the main url
const url = "http://localhost:8088";

const API = {
    getUsers: () => { // this will get all the users not sure if this will get used
        return fetch(`${url}/users`)
            .then(r => r.json())
    },
    getUser: (id) => { // this will get all the users not sure if this will get used
        return fetch(`${url}/users/${id}`)
            .then(r => r.json())
    },
    postCreateUser: (newUserObj) => {
        return fetch(`${url}/users`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newUserObj)
        }).then(r => r.json())
    },
    // Function to GET all of a resource that is passed in as a parameter
    getResources: (resources) => {
        return fetch(`${url}/${resources}`)
            .then(r => r.json())
    },
    // Function to GET one resource with ID using two parameters
    getResource: (resources, id) => {
        return fetch(`${url}/${resources}/${id}`)
            .then(r => r.json())
    },
    // Function to GET and expand all friends user information of current user
    getFriends: (currentUser) => {
        return fetch(`${url}/friends?currentUserId=${currentUser}&_expand=user`)
            .then(r => r.json())
    },
    // Function to GET friend connection ID
    getFriend: (currentUser, friendToDelete) => {
        return fetch(`${url}/friends?currentUserId=${currentUser}&userId=${friendToDelete}`)
            .then(r => r.json())
    },
    // Function to DELETE friend connection
    deleteFriend: (friendToDelete) => {
        return fetch(`${url}/friends/${friendToDelete}`, {
            method: "DELETE"
        })
    }
}

export default API;