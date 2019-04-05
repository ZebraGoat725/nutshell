// this component will call the getFriends fetch call and then parse it so that it will grab all the friends if and check for friend's id


const parsed = {
    getFriendId: (parsedFriendsArray) => {
        let userId = sessionStorage.getItem("userID")
        console.log("the friends",parsedFriendsArray)
        
    }
}

export default parsed