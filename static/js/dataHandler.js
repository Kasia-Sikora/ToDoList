export let dataHandler = {

    getBoards: function (callback) {
        fetch('/get_boards', {
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
    removeBoard: function (boardId) {
        fetch('/remove_board/' + boardId, {
            method: 'DELETE',
            credentials: 'same-origin',
            body: boardId
        })
            .then(response => response.json())
            .then(data => console.log(data))
    },
    sentData(form) {
        fetch('/change_title', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(form)
        })
            .then(response => response.json())
            .then(data => console.log(JSON.parse(data)))
    },

    sentCardData(form) {
        fetch('/new_card', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(form)
        })
            .then(response => response.json())
            .then(data => console.log(data))
    },
    getCards() {
        console.log('dupa')
        fetch('/get_cards', {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }
}