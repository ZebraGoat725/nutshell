//Main URL
const url = "http://localhost:8088";

const apiFriends = {
    // Function to GET and expand all friends user information of current user
    getFriends: (currentUser) => {
        return fetch(`${url}/friends?currentUserId=${currentUser}&_expand=user`)
            .then(r => r.json())
    },
    // Function to DELETE friend connection
    deleteFriend: (friendToDelete) => {
        return fetch(`${url}/friends/${friendToDelete}`, {
            method: "DELETE"
        })
    }
}

export default apiFriends;