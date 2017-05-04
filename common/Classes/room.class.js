"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(name, capacity, neighbors) {
        this.name = name;
        if (capacity) {
            this.capacity = capacity;
        }
        else {
            this.capacity = 6;
        }
        this.players = new Array();
        if (neighbors) {
            this.neighbors = neighbors;
        }
    }
}
exports.Room = Room;
//# sourceMappingURL=room.class.js.map