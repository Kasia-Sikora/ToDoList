import {dataHandler} from "../dataHandler.js";
import {url} from "../utils/urls.js";
import {dom} from "./dom.js";

export let events = {
    removeBoard: function (boardId, card = null) {
        card.parentNode.removeChild(card);
        if (boardId !== 0) {
            dataHandler.removeItem(url.removeBoard, boardId);
        }
    },

    removeCard: function (card, cardId) {
        console.log(card)
        card.parentNode.removeChild(card);
        dataHandler.removeItem(url.removeCard, cardId);
    },

    close: function (addCardButton, form, innerCardCardButton, close) {
        addCardButton.style.display = 'block';
        form.parentNode.removeChild(form);
        innerCardCardButton.parentNode.removeChild(innerCardCardButton)
        close.parentNode.removeChild(close)
    },

    updateTitle: function (event, input, inputId, cardTitle) {
        if (event.code === 'Enter') {
            dataHandler.sentData(url.updateBoardTitle, {title: input.value, id: inputId.value}, async (data) => {
                await cardTitle.setAttribute('id', 'board ' + data)
                inputId.setAttribute('value', data);
            })
        }
    },

    addCardAction: function (inputId, addCardButton, cardBody) {
        if (inputId.getAttribute('value') !== '0') {
            addCardButton.style.display = 'none';
            dom.createNewCard(addCardButton, inputId.getAttribute('value'), cardBody)
        } else {
            alert('You have to name your board first')
        }
    }
}