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
    getEvents: (userId) => {
        return fetch(`${url}/events?userId=${userId}`).then(response => response.json());
    }
}

export default API;