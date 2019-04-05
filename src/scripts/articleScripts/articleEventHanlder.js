import articleSection from "../articleScripts/article"
import apiCall from "../articleScripts/articleApi"
import HTMLFactory from "../HTMLFactory";


const articleHandler = {
    createNewArticle: () => {
        const title = document.getElementById("articleTitleInput").value;
        const synopsis = document.getElementById("articleSynopsisInput").value;
        const url = document.getElementById("articleUrlInput").value
        let activeUser = Number(sessionStorage.getItem("userID"))
        apiCall.postArticle(articleSection.createNewArticle(title, synopsis, url, activeUser));
    },
}
    export default articleHandler