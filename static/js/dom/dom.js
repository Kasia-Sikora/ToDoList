import {dataHandler} from "../dataHandler.js";
import {utils} from "../utils/utils.js";
import {url} from "../utils/urls.js"
import {domElements} from "./dom-elements.js";
import {events} from "./events.js";

export let dom = {

    container: document.getElementById('container'),

    addBoardButton: function () {
        let addCardButton = domElements.createAddButton('+ Add new Board');
        addCardButton.setAttribute('id', 'addBoard')
        addCardButton.addEventListener('click', this.createNewBoard);
        this.container.appendChild(addCardButton)
    },

    createNewBoard: function () {
        let card = dom.displayBoard();
        dom.container.appendChild(card);
    },

    showBoards(boards) {
        boards.sort(utils.compare);
        for (let board of boards) {
            dom.createBoard(board);
        }
    },

    createBoard: function (board) {
        let card = dom.displayBoard(board.title, board.id);
        this.container.appendChild(card);
    },

    displayBoard(title = "New Card", boardId = 0) {

        let card = domElements.createCard()
        let cardBody = domElements.createCardBody();
        let cardTitle = domElements.createCardTitle('board-title');
        if (boardId !== 0) {
            cardTitle.setAttribute('id', 'board ' + boardId);
        }
        let close = domElements.createCloseButton()
        let inputId = domElements.createInputWithId(boardId)
        let input = domElements.createBoardTitleInput(title);
        let form = domElements.createForm();
        let span = domElements.createCloseSpan()

        form.appendChild(input);
        form.appendChild(inputId);
        form.addEventListener('keyup', (event) => {
            events.updateTitle(event, input, inputId, cardTitle)
        })

        cardTitle.appendChild(form);

        span.addEventListener('click', () => {
            events.removeBoard(boardId, card);
        })
        let cardFooter = domElements.createCardFooter();
        let addCardButton = domElements.createAddButton('+ Add New Card');
        addCardButton.setAttribute('id', 'addCard')
        addCardButton.addEventListener('click', () => {
            events.addCardAction(inputId, addCardButton, cardBody);
        });
        close.appendChild(span);
        cardFooter.appendChild(addCardButton);
        cardTitle.appendChild(close);
        cardBody.appendChild(cardTitle);
        card.appendChild(cardBody);
        card.appendChild(cardFooter)
        return card;
    },

    createNewCard(addCardButton, boardId, cardBody) {
        let inputBoardId = domElements.createInputWithId(boardId);
        let inputCardTextarea = domElements.createCardTextarea();
        let form = domElements.createForm();
        let innerCardCardButton = domElements.createAddButton('Add Card');
        innerCardCardButton.style.float = 'left';
        innerCardCardButton.addEventListener('click', function () {
            dataHandler.sentData(url.createCard, {
                title: inputCardTextarea.value,
                id: inputBoardId.value
            }, async (data) => {
                events.close(addCardButton, form, innerCardCardButton, close)
                await dom.createCard(data)
            })
        });

        let span = domElements.createCloseSpan();
        span.addEventListener('click', () => {
            events.close(addCardButton, form, innerCardCardButton, close)
        })
        let close = domElements.createCloseButton();
        close.style.float = 'left';

        form.appendChild(inputCardTextarea);
        form.appendChild(inputBoardId);
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
        let board = document.getElementById('board ' + card.board_id)
        let cardInBoard = document.createElement('div');
        cardInBoard.setAttribute('class', 'card inner-card');
        let cardTitle = domElements.createCardTitle('card-title');
        cardTitle.innerText = card.title.trim();
        let cardSubtitle = domElements.createCardSubtitle(card.creation_date);
        let close = domElements.createCloseButton();
        let span = domElements.createCloseSpan();
        span.addEventListener('click', () => {
            events.removeCard(cardInBoard, card.id);
        })
        close.appendChild(span)
        cardTitle.appendChild(close);
        cardInBoard.appendChild(cardTitle);
        cardInBoard.appendChild(cardSubtitle);
        board.parentNode.appendChild(cardInBoard)
    },
}