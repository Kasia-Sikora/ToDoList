import {dataHandler} from "./dataHandler.js";
import {dom} from "./dom/dom.js";
import {url} from "./utils/urls.js";

export function init() {
    dom.addBoardButton();
    dataHandler.getData(url.getBoards, dom.showBoards);
    dataHandler.getData(url.getCards, dom.showCards);
}

init();