export let dataHandler = {

    init: function fetchData() {
        fetch('/get_boards', {
            method: 'GET',
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }
}