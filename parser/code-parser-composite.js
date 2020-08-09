class CodeParserComposite {
    constructor() {
        this.parsers = [];
    }
    addParser(parser) {
        this.parsers.push(parser);
    }

    async process() {
        for (const parser of this.parsers) {
            parser.process();
        }
    }

    getBlankLineCount() {
        return this.parsers.map(parser => {
            return parser.getBlankLineCount();
        }).reduce((a, b) => {
            return a + b;
        });
    }

    getCodeLineCount() {
        return this.parsers.map(parser => {
            return parser.getCodeLineCount();
        }).reduce((a, b) => {
            return a + b;
        });
    }

    getCommentLineCount() {
        return this.parsers.map(parser => {
            return parser.getCommentLineCount();
        }).reduce((a, b) => {
            return a + b;
        });
    }

    printLineCount() {
        const blankLines = this.getBlankLineCount();
        const codeLines = this.getCodeLineCount();
        const commentLines = this.getCommentLineCount();

        console.log(`Blank: ${blankLines}`);
        console.log(`Comments: ${commentLines}`);
        console.log(`Code: ${codeLines}`);
        console.log(`Total: ${codeLines + blankLines + commentLines}`);
    }
}

module.exports = CodeParserComposite;