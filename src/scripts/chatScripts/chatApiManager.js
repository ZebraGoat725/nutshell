//this is the chat's api manager componenet. It will include all the fetch calls that are directly connected to the
// the chat message

const url = "http://localhost:8088";

const chatApi = {
    postCreateMessage: (userMsg) => {
        return fetch(`${url}/messages`,{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userMsg)
        })
    }
}

export default chatApi;