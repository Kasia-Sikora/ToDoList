export let dataHandler = {

    getData: function (url, callback) {
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    callback(data)
                }
            })
    },
    removeItem: function (url, boardId) {
        fetch(url + boardId, {
            method: 'DELETE',
            credentials: 'same-origin',
            body: boardId
        })
            .then(response => response.json())
            .then(data => console.log(data))
    },
    sentData(url, form, callback) {
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(form)
        })
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    callback(data)
                }
            })
    },
}