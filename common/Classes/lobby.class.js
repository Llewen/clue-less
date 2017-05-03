"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_class_1 = require("./game.class");
class Lobby {
    constructor(lobbyName, host) {
        this.name = lobbyName;
        this.host = host;
        this.players = new Array();
        this.game = new game_class_1.Game();
    }
}
exports.Lobby = Lobby;
//# sourceMappingURL=lobby.class.js.map