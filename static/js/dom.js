import {dataHandler} from "./dataHandler.js";

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
        let card = dom.createCard();
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
        let card = dom.createCard(board.title, board.date, board.id);
        this.container.appendChild(card);
    },

    createCard(title = "New Card", date = (new Date()).toDateString(), boardId = 0) {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        let cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');
        let cardTitle = document.createElement('h5');
        cardTitle.innerText = title;
        cardTitle.setAttribute('class', 'card-title');
        let close = document.createElement("button");
        close.setAttribute('type', 'button');
        close.setAttribute('class', 'close');
        close.setAttribute('aria-label', 'Close');
        let span = document.createElement('span');
        span.setAttribute('aria-hidden', 'true');
        span.innerHTML = "&times;";
        span.addEventListener('click', () => {
            dom.removeCard(boardId, card);
        })
        close.appendChild(span);
        cardTitle.appendChild(close);
        cardBody.appendChild(cardTitle);
        card.appendChild(cardBody);
        return card;
    },
    compare: function (a, b) {
        if (a.order < b.order) {
            return -1;
        }
        if (a.order > b.order) {
            return 1;
        }
        return 0;
    },
    removeCard: function (boardId, card=null) {
        card.parentNode.removeChild(card);
        if (boardId !== 0){
            dataHandler.removeBoard(boardId);
        }
    }
}