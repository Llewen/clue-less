"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CaseFile {
    constructor(inputWho, inputWhat, inputWhere) {
        this.who = inputWho;
        this.what = inputWhat;
        this.where = inputWhere;
    }
    getWho() {
        return this.who;
    }
    getWhat() {
        return this.what;
    }
    getWhere() {
        return this.where;
    }
    getWhoWhatWhere() {
        return [this.getWho(), this.getWhat(), this.getWhere()];
    }
}
exports.CaseFile = CaseFile;
//# sourceMappingURL=caseFile.class.js.map