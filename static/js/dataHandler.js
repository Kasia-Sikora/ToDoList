export let dataHandler = {

    getBoards: function fetchBoards(callback) {
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
    }
}