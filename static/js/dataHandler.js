export let dataHandler = {

    getBoards: function(callback) {
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
    }
}