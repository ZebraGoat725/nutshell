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
        .then(() => articleSection.buildArticleWithObj())
    },
    handeDelete: () => {
        console.log("clicked")
        let articleId = event.target.id
        const hi = articleId.split("--")[1];
        console.log(articleId)
        apiCall.deleteArticle(hi).then(articleSection.buildArticleWithObj());
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
        console.log(hello)
        const titleValue = document.querySelector(`#edit-article-title--${hello}`).value
        const synopsisValue = document.querySelector(`#edit-article-synopsis--${hello}`).value
        const urlValue = document.querySelector(`#edit-article-url--${hello}`).value
        const patchObject = {
            title: titleValue,
            synopsis: synopsisValue,
            url: urlValue
        }
        apiCall.patchArticle(hello, patchObject).then(articleSection.buildArticleWithObj())
    }
}
export default articleHandler