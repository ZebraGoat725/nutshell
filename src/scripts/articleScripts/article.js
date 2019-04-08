import HTMLFactory from "./../HTMLFactory"
import loginHandler from "../loginScripts/loginHandler"
import apiCall from "../articleScripts/articleApi"
import articleHandler from "../articleScripts/articleEventHanlder"

// The buildArticleFragment function builds up the html and appends to the article
// fragment

const articleSection = {
    buildArticleWithObj: function (articleArray) {
        // building out thr object returned from the fetch call
        let fragment = document.createDocumentFragment()
        let articleBody = document.querySelector("#articleBody")
        const userID = sessionStorage.getItem("userID")
        articleArray.forEach(obj => {
            const eachArticleConatainer = HTMLFactory.createElementWithText("div")
            const objectTitle = HTMLFactory.createElementWithText("p", `${obj.title}`, "objectTitle")
            const objectSynopsis = HTMLFactory.createElementWithText("p", `${obj.synopsis}`, "objectSynopsis")
            const objectUrl = HTMLFactory.createElementWithText("p", `${obj.url}`, "objectUrl")
            eachArticleConatainer.appendChild(objectTitle)
            eachArticleConatainer.appendChild(objectSynopsis)
            eachArticleConatainer.appendChild(objectUrl)
            fragment.appendChild(eachArticleConatainer)
            articleBody.appendChild(fragment)
            if(obj.userId === Number(userID)) {
                eachArticleConatainer.classList.add("myArticles")
                const articleEdit = HTMLFactory.createElementWithText("button", "Edit Article", `articleEdit--${obj.id}`)
                articleEdit.addEventListener("click", articleHandler.handleEdit)
                const articleDelete = HTMLFactory.createElementWithText("button", "Delete Article", `articleDelete--${obj.id}`)
                articleDelete.addEventListener("click", articleHandler.handeDelete)
                fragment.appendChild(articleEdit)
                fragment.appendChild(articleDelete)
                articleBody.appendChild(fragment)
            }else {
                eachArticleConatainer.classList.add("friendArticles")
            }
        })
                let articleDom = document.getElementById("articles-section")
                articleDom.appendChild(fragment)
    },
    buildArticle: function () {
        // creating html template
        const articleFragment = document.createDocumentFragment();
        const articleCard = HTMLFactory.createElementWithText("div", undefined, "articleCard");
        const articleTitle = HTMLFactory.createElementWithText("h1", "Articles", "articleTitle");
        const articleBody = HTMLFactory.createElementWithText("div", undefined, "articleBody");
        const createArticleButton = HTMLFactory.createElementWithText("button", "Create New Article", "newArticle");
        articleCard.appendChild(articleTitle);
        articleCard.appendChild(articleBody)
        articleCard.appendChild(createArticleButton)

        createArticleButton.setAttribute("type", "button")
        createArticleButton.addEventListener("click", function () {
            HTMLFactory.clearContainer(articleCard)
            articleCard.appendChild(articleSection.newArticleForm())
        })
        articleFragment.appendChild(articleCard);
        return articleFragment;

    },
    listArticles: function (articleArray) {
        const divContainer = document.querySelector("#articles-section")
        if (!divContainer.firstChild) {
            divContainer.appendChild(articleSection.buildArticle())
            articleSection.buildArticleWithObj(articleArray)
        } else {
            articleSection.buildArticleWithObj(articleArray)
        }
    },
    newArticleForm: () => {
        let newArticleFragment = document.createDocumentFragment()
        const articleTitleLabel = HTMLFactory.createElementWithText("label", "Title: ", "articleTitleLabel");
        const articleTitleInput = HTMLFactory.createElementWithText("input", undefined, "articleTitleInput");
        const articleSynopsisLabel = HTMLFactory.createElementWithText("label", "Synopsis: ", "articleSynopsisLabel");
        const articleSynopsisInput = HTMLFactory.createElementWithText("input", undefined, "articleSynopsisInput");
        const articleUrlLabel = HTMLFactory.createElementWithText("label", "URL: ", "articleUrlLabel");
        const articleUrlInput = HTMLFactory.createElementWithText("input", undefined, "articleUrlInput");
        const submitButton = HTMLFactory.createElementWithText("button", "Submit New Article", "submitArticle");
        submitButton.addEventListener("click", articleHandler.createNewArticle);
        newArticleFragment.appendChild(articleTitleLabel);
        newArticleFragment.appendChild(articleTitleInput);
        newArticleFragment.appendChild(articleSynopsisLabel);
        newArticleFragment.appendChild(articleSynopsisInput);
        newArticleFragment.appendChild(articleUrlLabel);
        newArticleFragment.appendChild(articleUrlInput);
        newArticleFragment.appendChild(submitButton)
        return newArticleFragment
    },
    createNewArticleObj: (title, synopsis, url, activeUser) => {
        return {
            title: title,
            synopsis: synopsis,
            url: url,
            userId: activeUser,
            timeStamp: new Date()

        }
    },
    articleEditForm: (articleObject) => {
        let editFormFragment = document.createDocumentFragment()

        editFormFragment.appendChild(HTMLFactory.createElementWithText("label", "Title: ", undefined));
        const titleInput = HTMLFactory.createElementWithText("input", undefined, `edit-article-title--${articleObject.id}`);
        titleInput.value = articleObject.title
        editFormFragment.appendChild(titleInput)

        editFormFragment.appendChild(HTMLFactory.createElementWithText("label", "Synopsis: ", undefined));
        const synopsisInput = HTMLFactory.createElementWithText("input", undefined, `edit-article-synopsis--${articleObject.id}`);
        synopsisInput.value = articleObject.synopsis
        editFormFragment.appendChild(synopsisInput)

        editFormFragment.appendChild(HTMLFactory.createElementWithText("label", "Url: ", undefined));
        const urlInput = HTMLFactory.createElementWithText("input", undefined, `edit-article-url--${articleObject.id}`);
        urlInput.value = articleObject.url
        editFormFragment.appendChild(urlInput)

        const updateArticleButton = HTMLFactory.createElementWithText("button", "Update", "updateArticleButton")
        updateArticleButton.addEventListener("click", () => {
            articleHandler.handleUpdate(event)
        })
        editFormFragment.appendChild(updateArticleButton)

        return editFormFragment
    }

}

export default articleSection;