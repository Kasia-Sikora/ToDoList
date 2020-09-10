import {dataHandler} from "./dataHandler.js";
import {utils} from "./utils.js";
import {init} from "./main.js"

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
        let card = dom.displayBoard();
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
        let card = dom.displayBoard(board.title, board.id);
        this.container.appendChild(card);
    },

    displayBoard(title = "New Card", boardId = 0) {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        let cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');
        let cardTitle = document.createElement('h5');
        cardTitle.setAttribute('class', 'board-title');
        cardTitle.style.display = 'inline-block';
        if (boardId !== 0) {
            cardTitle.setAttribute('id', 'board ' + boardId);
        }
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
                dataHandler.sentData({title: input.value, id: inputId.value}, async (data) => {
                    await cardTitle.setAttribute('id', 'board ' + data)
                })
            }
        })
        cardTitle.appendChild(form);
        let span = document.createElement('span');
        span.setAttribute('aria-hidden', 'true');
        span.innerHTML = "&times;";
        span.addEventListener('click', () => {
            dom.removeBoard(boardId, card);
        })
        let cardFooter = document.createElement('div');
        cardFooter.setAttribute('class', 'card-footer text-muted');
        let addCardButton = document.createElement('button')
        addCardButton.setAttribute('class', 'btn my-2 my-sm-0')
        addCardButton.setAttribute('id', 'addCard')
        addCardButton.innerText = '+ Add New Card'
        addCardButton.addEventListener('click', () => {
            if (boardId !== 0) {
                addCardButton.style.display = 'none';
                this.createNewCard(addCardButton, boardId, cardBody)
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

    removeBoard: function (boardId, card = null) {
        card.parentNode.removeChild(card);
        if (boardId !== 0) {
            dataHandler.removeBoard(boardId);
        }
    },
    createNewCard(addCardButton, boardId, cardBody) {
        let inputBoardId = document.createElement('input');
        inputBoardId.setAttribute('value', boardId);
        inputBoardId.setAttribute('class', 'form-control');
        inputBoardId.setAttribute('name', 'id');
        inputBoardId.style.display = 'none';
        let inputCard = document.createElement('textarea');
        inputCard.setAttribute('placeholder', 'Enter title of your brand new card :)');
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

        let innerCardCardButton = document.createElement('button')
        innerCardCardButton.setAttribute('class', 'btn my-2 my-sm-0')
        innerCardCardButton.innerText = 'Add Card'
        innerCardCardButton.addEventListener('click', function (event) {
            dataHandler.sentCardData({title: inputCard.value, id: inputBoardId.value}, async (data) => {
                dom.close(addCardButton, form, innerCardCardButton, close)
                await dom.createCard(data)
            })
        });
        innerCardCardButton.style.float = 'left';

        let span = document.createElement('span');
        span.setAttribute('aria-hidden', 'true');
        span.innerHTML = "&times;";
        span.addEventListener('click', () => {
            dom.close(addCardButton, form, innerCardCardButton, close)
        })
        let close = document.createElement('button');
        close.setAttribute('type', 'button');
        close.setAttribute('class', 'close');
        close.setAttribute('aria-label', 'Close');
        close.style.float = 'left';

        close.appendChild(span);
        cardBody.parentNode.lastChild.appendChild(innerCardCardButton)
        cardBody.parentNode.lastChild.appendChild(close)
        cardBody.parentNode.insertBefore(form, cardBody.nextSibling)
    },
    showCards(cards) {
        cards.sort(utils.compare);
        for (let card of cards) {
            dom.createCard(card);
        }
    },
    createCard(card) {
        console.log(card.title)
        let board = document.getElementById('board ' + card.board_id)
        let cardInBoard = document.createElement('div');
        cardInBoard.setAttribute('class', 'card inner-card');
        let cardTitle = document.createElement('h5');
        cardTitle.setAttribute('class', 'card-title');
        cardTitle.innerText = card.title.trim();
        cardTitle.style.display = 'inline-block';
        let cardSubtitle = document.createElement('h6');
        cardSubtitle.setAttribute('class', 'card-subtitle mb-2 text-muted')
        cardSubtitle.innerText = card.creation_date;
        let close = document.createElement('button');
        close.setAttribute('type', 'button');
        close.setAttribute('class', 'close');
        close.setAttribute('aria-label', 'Close');

        let span = document.createElement('span');
        span.setAttribute('aria-hidden', 'true');
        span.innerHTML = "&times;";
        span.addEventListener('click', () => {
            dom.removeCard(cardInBoard, card.id);
        })

        close.appendChild(span)
        cardTitle.appendChild(close);
        cardInBoard.appendChild(cardTitle);
        cardInBoard.appendChild(cardSubtitle);
        board.parentNode.appendChild(cardInBoard)
    },
    removeCard(card, cardId) {
        console.log(card)
        card.parentNode.removeChild(card);
        dataHandler.removeCard(cardId);
    },

    close(addCardButton, form, innerCardCardButton, close) {
        addCardButton.style.display = 'block';
        form.parentNode.removeChild(form);
        innerCardCardButton.parentNode.removeChild(innerCardCardButton)
        close.parentNode.removeChild(close)
    }
}