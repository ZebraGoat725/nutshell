// this is the object for the api fetch calls.

//the main url
const url = "http://localhost:8088";

const API = {
    getUser: () => { // this will get all the users not sure if this will get used
        return fetch(`${url}/users`)
        .then(r => r.json())
    },
    getFriend: () => {
        return fetch (`${url}/`)
    }
}

export default API;