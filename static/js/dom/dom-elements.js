export let domElements = {

    createCard: function () {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        return card;
    },

    createCardBody: function () {
        let cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');
        return cardBody;
    },

    createCardTitle: function (className) {
        let cardTitle = document.createElement('h5');
        cardTitle.setAttribute('class', className);
        cardTitle.style.display = 'inline-block';
        return cardTitle;
    },
    createCloseButton: function () {
        let close = document.createElement('button');
        close.setAttribute('type', 'button');
        close.setAttribute('class', 'close');
        close.setAttribute('aria-label', 'Close');
        return close;
    },

    createCloseSpan: function () {
        let span = document.createElement('span');
        span.setAttribute('aria-hidden', 'true');
        span.innerHTML = "&times;";
        return span;
    },

    createInputWithId(id) {
        let input = document.createElement('input');
        input.setAttribute('value', id);
        input.setAttribute('class', 'form-control');
        input.setAttribute('name', 'id');
        input.style.display = 'none';
        return input;
    },

    createForm: function () {
        let form = document.createElement('form');
        form.setAttribute('action', '#');
        form.setAttribute('method', 'post')
        return form;
    },
    createBoardTitleInput(title) {
        let input = document.createElement('input');
        input.setAttribute('value', title);
        input.setAttribute('class', 'form-control');
        input.setAttribute('name', 'title');
        input.setAttribute('id', 'boardTitle')
        return input;
    },
    createAddButton(text) {
        let button = document.createElement('button');
        button.setAttribute('class', 'btn my-2 my-sm-0');
        button.innerText = text;
        return button;
    },
    createCardFooter() {
        let cardFooter = document.createElement('div');
        cardFooter.setAttribute('class', 'card-footer text-muted');
        return cardFooter;
    },
    createCardTextarea() {
        let inputCardTextarea = document.createElement('textarea');
        inputCardTextarea.setAttribute('placeholder', 'Enter title of your brand new card :)');
        inputCardTextarea.setAttribute('class', 'form-control');
        inputCardTextarea.setAttribute('id', 'exampleFormControlTextarea1');
        inputCardTextarea.setAttribute('rows', '3');
        inputCardTextarea.setAttribute('name', 'cardTitle');
        inputCardTextarea.style.resize = 'none';
        return inputCardTextarea;
    },
    createCardSubtitle(creationDate) {
        let cardSubtitle = document.createElement('h6');
        cardSubtitle.setAttribute('class', 'card-subtitle mb-2 text-muted')
        cardSubtitle.innerText = creationDate;
        return cardSubtitle;
    }
}