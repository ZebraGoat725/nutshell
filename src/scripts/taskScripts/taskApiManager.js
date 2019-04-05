const url = "http://localhost:8088";

export default {
    getTask (userId) {
        return fetch (`${url}/tasks?userId=${userId}`)
        .then(r => r.json())
    },
    postTask (object) {
        return fetch (`${url}/tasks`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(object)
        }).then(r => r.json())
    },
    getOneTask (id) {
        return fetch (`${url}/tasks/${id}`)
        .then(r => r.json())
    },
    putTask (id, object) {
        return fetch (`${url}/tasks/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(object)
        }).then(r => r.json())
    },
    patchTask (id, object) {
        return fetch (`${url}/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(object)
        }).then(r => r.json())
    }
}
