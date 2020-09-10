import {dataHandler} from "./dataHandler.js";
import {dom} from "./dom.js";

export function init() {
    dom.addBoardButton();
    dataHandler.getBoards(dom.showBoards);
    dataHandler.getCards(dom.showCards);
}

init();