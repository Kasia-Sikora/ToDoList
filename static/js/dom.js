import {dataHandler} from "./dataHandler.js";
import {utils} from "./utils.js";

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
        boards.sort(utils.compare);
        console.log(boards)
        for (let board of boards) {
            dom.createBoard(board);
        }
    },

    createBoard: function (board) {
        let card = dom.createCard(board.title, board.id);
        this.container.appendChild(card);
    },

    createCard(title = "New Card", boardId = 0) {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        let cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');
        let cardTitle = document.createElement('h5');
        cardTitle.setAttribute('class', 'card-title');
        let close = document.createElement('button');
        close.setAttribute('type', 'button');
        close.setAttribute('class', 'close');
        close.setAttribute('aria-label', 'Close');
        let inputId = document.createElement('input');
        inputId.setAttribute('value', boardId);
        inputId.setAttribute('class', 'form-control');
        inputId.setAttribute('name', 'id');
        inputId.style.display = 'none';
        let input = document.createElement('input');
        input.setAttribute('value', title);
        input.setAttribute('class', 'form-control');
        input.setAttribute('name', 'title');
        input.setAttribute('id', 'boardTitle')
        let form = document.createElement('form');
        form.setAttribute('action', '#');
        form.setAttribute('method', 'post')
        form.appendChild(input);
        form.appendChild(inputId);
        form.addEventListener('keyup', function (event) {
            if (event.code === 'Enter') {
                dataHandler.sentData({title: input.value, id: inputId.value})
            }
        })
        cardTitle.appendChild(form);
        let span = document.createElement('span');
        span.setAttribute('aria-hidden', 'true');
        span.innerHTML = "&times;";
        span.addEventListener('click', () => {
            dom.removeCard(boardId, card);
        })
        let cardFooter = document.createElement('div');
        cardFooter.setAttribute('class', 'card-footer text-muted');
        let addCardButton = document.createElement('button')
        addCardButton.setAttribute('class', 'btn my-2 my-sm-0')
        addCardButton.setAttribute('id', 'addCard')
        addCardButton.innerText = '+ Add New Card'
        addCardButton.addEventListener('click', () => {
            if (boardId !== 0) {
                this.createNewCard(boardId, cardBody)
            } else {
                alert('You have to name your board first')
            }
        });
        close.appendChild(span);
        cardFooter.appendChild(addCardButton);
        cardTitle.appendChild(close);
        cardBody.appendChild(cardTitle);
        card.appendChild(cardBody);
        card.appendChild(cardFooter)
        return card;
    },

    removeCard: function (boardId, card = null) {
        card.parentNode.removeChild(card);
        if (boardId !== 0) {
            dataHandler.removeBoard(boardId);
        }
    },
    createNewCard(boardId, cardBody) {
        let inputBoardId = document.createElement('input');
        inputBoardId.setAttribute('value', boardId);
        inputBoardId.setAttribute('class', 'form-control');
        inputBoardId.setAttribute('name', 'id');
        inputBoardId.style.display = 'none';
        let inputCard = document.createElement('textarea');
        inputCard.setAttribute('placeholder', 'Enter title of your brand new board :)');
        inputCard.setAttribute('class', 'form-control');
        inputCard.setAttribute('id', 'exampleFormControlTextarea1');
        inputCard.setAttribute('rows', '3');
        inputCard.setAttribute('name', 'cardTitle');
        inputCard.style.resize = 'none';
        let form = document.createElement('form');
        form.setAttribute('action', '#');
        form.setAttribute('method', 'post')
        form.appendChild(inputCard);
        form.appendChild(inputBoardId);
        form.addEventListener('keyup', function (event) {
            if (event.code === 'Enter') {
                dataHandler.sentCardData({title: inputCard.value, id: inputBoardId.value})
            }
        })
        cardBody.appendChild(form)
    },
    showCards() {

    }
}