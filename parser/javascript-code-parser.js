const { CODE_TYPE_ENUM } = require('../utils/constants');
const AbstractParser = require('./code-parser-abstact');

class JavascriptParser extends AbstractParser {
    constructor(fileReader) {
        super(fileReader);
        this.mlcStart = null;
    }
    process() {
        const liner = this.fileReader.getLiner();
        let lineNumber = 1;
        let eof = false;
        while (!eof) {
            const line = liner.next();
            eof = !line;
            if(!eof) {
                this.processLine(line.toString(), lineNumber)            
            }
            lineNumber += 1;
        }
    }

    processLine(line, lineNumber) {
        const l = line.trim();
        // check if multiline comment starts
        if (l[0] == '/' && l[1] == '*') {
            if (!this.mlcStart) this.mlcStart = lineNumber;
            return;
        }

        // check if multiline comment ends
        if (l[0] == '*' && l[1] == '/') {
            this.incrementLineCount(CODE_TYPE_ENUM.COMMENTS, lineNumber - this.mlcStart + 1);
            this.mlcStart = null;
            return;
        }

        // If not multiline comment, go with normal flow
        if (!this.mlc) {
            if (!l) {
                this.incrementLineCount(CODE_TYPE_ENUM.BLANK);
                return;
            }
            if (l[0] == '/' && l[1] == '/') {
                this.incrementLineCount(CODE_TYPE_ENUM.COMMENTS);
                return;
            }
            // console.log(line,lineNumber)
            this.incrementLineCount(CODE_TYPE_ENUM.CODE);
        }
        

    }
}

module.exports = JavascriptParser;