import articleSection from "../articleScripts/article"
import apiCall from "../articleScripts/articleApi"
import HTMLFactory from "../HTMLFactory";


const articleHandler = {
    createNewArticle: () => {
        const title = document.getElementById("articleTitleInput").value;
        const synopsis = document.getElementById("articleSynopsisInput").value;
        const url = document.getElementById("articleUrlInput").value
        let activeUser = Number(sessionStorage.getItem("userID"))
        const divContainer = document.querySelector("#articles-section")
        HTMLFactory.clearContainer(divContainer)
        apiCall.postArticle(articleSection.createNewArticleObj(title, synopsis, url, activeUser))
        .then(() => apiCall.getArticles(activeUser)).then(r =>{
            return articleSection.listArticles(r)
        }).then(() => apiCall.getFriendArticles(activeUser)).then(r =>{
            r.forEach(article => {
                apiCall.getArticles(article).then(r => {
            articleSection.listArticles(r)
        })
            });
        })
    },
    handeDelete: () => {
        console.log("clicked")
        let articleId = event.target.id
        const divContainer = document.querySelector("#articles-section")
        const hi = articleId.split("--")[1];
        let activeUser = Number(sessionStorage.getItem("userID"))
        console.log(articleId)
        HTMLFactory.clearContainer(divContainer)
        apiCall.deleteArticle(hi).then(() => apiCall.getArticles(activeUser)).then(r =>{
            return articleSection.listArticles(r)
        }).then(() => apiCall.getFriendArticles(activeUser)).then(r =>{
            r.forEach(article => {
                apiCall.getArticles(article).then(r => {
            articleSection.listArticles(r)
        })
            });
        })
    },
    handleEdit: () => {
        console.log("clicked edit")
        let articleId = event.target.id
        const hi = articleId.split("--")[1];
        const divContainer = document.querySelector("#articles-section")
        HTMLFactory.clearContainer(divContainer)
        apiCall.getArticle(hi).then(entry => {
            console.log(entry)
            divContainer.appendChild(articleSection.articleEditForm(entry))
        })
    },
    handleUpdate: (event) => {
        const updateTarget = event.target.previousSibling.id
        const hello= updateTarget.split("--")[1]
        let activeUser = Number(sessionStorage.getItem("userID"))
        const divContainer = document.querySelector("#articles-section")
        const titleValue = document.querySelector(`#edit-article-title--${hello}`).value
        const synopsisValue = document.querySelector(`#edit-article-synopsis--${hello}`).value
        const urlValue = document.querySelector(`#edit-article-url--${hello}`).value
        const patchObject = {
            title: titleValue,
            synopsis: synopsisValue,
            url: urlValue
        }
        HTMLFactory.clearContainer(divContainer)
        apiCall.patchArticle(hello, patchObject).then(() => apiCall.getArticles(activeUser)).then(r =>{
            return articleSection.listArticles(r)
        }).then(() => apiCall.getFriendArticles(activeUser)).then(r =>{
            r.forEach(article => {
                apiCall.getArticles(article).then(r => {
            articleSection.listArticles(r)
        })
            });
        })
    }
}
export default articleHandler