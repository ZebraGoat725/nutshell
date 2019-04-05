
const url = "http://localhost:8088"

const apiCall = {
    getArticles: (userId) => {
        return fetch(`${url}/articles?userId=${userId}`)
            .then(r => r.json())
    },
    getArticle: (articleId) => {
        return fetch(`${url}/articles/${articleId}`)
        .then(r => r.json())

    },
    postArticle: (newArticle) => {
        return fetch(`${url}/articles`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newArticle)
        }).then(a => a.json())
    },
    deleteArticle: (articleId) => fetch(`${url}/articles/${articleId}`, {
        method: "DELETE"
    }),
    patchArticle: (articleId, updatedArticle) => fetch(`${url}/articles/${articleId}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(updatedArticle)
    })
}

export default apiCall
