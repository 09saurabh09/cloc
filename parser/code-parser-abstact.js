const { CODE_TYPE_ENUM } = require('../utils/constants');

class AbstractCodeParser {
    constructor(fileReader) {
        this.fileReader = fileReader;
        this.commentLines = 0;
        this.codeLines = 0;
        this.blankLines = 0;
    }
    process() {
        throw new Error('process not implemented');
    }
    processLine() {
        throw new Error('processLine Not implemented')
    }
    incrementLineCount(type, value = 1) {
        switch(type) {
            case CODE_TYPE_ENUM.BLANK:
                this.blankLines += value;
                break;
            case CODE_TYPE_ENUM.CODE:
                this.codeLines += value;
                break;
            case CODE_TYPE_ENUM.COMMENTS:
                this.commentLines += value;
                break;
            default:
                throw new Error('Invalid code type');
        }
    }

    getBlankLineCount() {
        return this.blankLines;
    }

    getCodeLineCount() {
        return this.codeLines;
    }

    getCommentLineCount() {
        return this.commentLines;
    }

}

module.exports = AbstractCodeParser;