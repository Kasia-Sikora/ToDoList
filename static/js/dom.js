export let dom = {

    container: document.getElementsByClassName('container')[0],

    addBoardButton: function () {
        let addCardButton = document.createElement('button')
        addCardButton.setAttribute('class', 'btn my-2 my-sm-0')
        addCardButton.setAttribute('id', 'addBoard')
        addCardButton.innerText = '+ Add new Board'
        addCardButton.addEventListener('click', this.createNewBoard);
        this.container.appendChild(addCardButton)
    },

    createNewBoard: function () {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        let cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');
        let cardTitle = document.createElement('h5');
        cardTitle.innerText = "New Board"
        cardTitle.setAttribute('class', 'card-title');
        let cardSubtitle = document.createElement('h5');
        cardSubtitle.setAttribute('class', 'card-subtitle mb-2 text-muted');
        cardSubtitle.innerText = (new Date()).toDateString();
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardSubtitle);
        card.appendChild(cardBody);
        dom.container.appendChild(card);
    },

    showBoards(boards) {
        boards.sort(dom.compare);
        console.log(boards)
        for (let board of boards) {
            dom.createBoard(board);
        }
    },

    createBoard: function (board) {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        let cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');
        let cardTitle = document.createElement('h5');
        cardTitle.setAttribute('class', 'card-title');
        cardTitle.innerText = board.title;
        let cardSubtitle = document.createElement('h5');
        cardSubtitle.setAttribute('class', 'card-subtitle mb-2 text-muted');
        cardSubtitle.innerText = board.date;
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardSubtitle);
        card.appendChild(cardBody);
        this.container.appendChild(card);
    },

    compare: function (a, b) {
        if (a.order < b.order) {
            return -1;
        }
        if (a.order > b.order) {
            return 1;
        }
        return 0;
    }
}