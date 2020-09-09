import {dataHandler} from "./dataHandler.js";
import {dom} from "./dom.js";

function init() {
    dom.addBoardButton();
    dataHandler.getBoards(dom.showBoards);
}

init();