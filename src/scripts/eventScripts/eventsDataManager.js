const url = "http://localhost:8088";

const eventsData = {
    getEvents: (userId) => {
        return fetch(`${url}/events?userId=${userId}`).then(response => response.json());
    },
    postEvent: (eventObj) => {
        return fetch(`${url}/events`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(eventObj)
        }).then(response => response.json());
    },
    putEvent: (id, eventObj) => {
        return fetch(`${url}/events/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(eventObj)
        }).then(response => response.json());
    },
    deleteEvent: (eventID) => {
        return fetch(`${url}/events/${eventID}`, {
            method: "DELETE"
        }).then(response => response.json());
    },
    getFriendEvents: (userID) => {
        return fetch(`${url}/friends?currentUserId=${userID}&_expand=user`).then(response => response.json()).then(response => {
            let newArray = response.map(users => users.user.id);
            return newArray
        })
    }
}

export default eventsData


// .then(response => response.forEach(event => {
//             eventsData.getEvents(event)})response.map(response => response.user.id)).then(response => console.log(response));