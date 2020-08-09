const assert = require('assert');

const CodeParserFactory = require('../parser/code-parser-factory');
const CodeParserComposite = require('../parser/code-parser-composite');

const FileReader = require('../utils/FileReader');

describe('Code counter test for folder', () => {
    it('should return number of comments', async () => {
        const codeParserComp = new CodeParserComposite();
        const files = await FileReader.getFiles('test/folder-line-count');
        files.forEach(file => {
            const parser = CodeParserFactory.getParser(file);
            codeParserComp.addParser(parser);
        });
        codeParserComp.process();
        const numberOfComments= codeParserComp.getCommentLineCount();
        assert.equal(numberOfComments, 7);
    });

    it('should return number of lines of code', async () => {
        const codeParserComp = new CodeParserComposite();
        const files = await FileReader.getFiles('test/folder-line-count');
        files.forEach(file => {
            const parser = CodeParserFactory.getParser(file);
            codeParserComp.addParser(parser);
        });
        codeParserComp.process();
        const numberOfComments= codeParserComp.getCodeLineCount();
        assert.equal(numberOfComments, 17);
    });

    it('should return number of blank lines', async () => {
        const codeParserComp = new CodeParserComposite();
        const files = await FileReader.getFiles('test/folder-line-count');
        files.forEach(file => {
            const parser = CodeParserFactory.getParser(file);
            codeParserComp.addParser(parser);
        });
        codeParserComp.process();
        const numberOfComments= codeParserComp.getBlankLineCount();
        assert.equal(numberOfComments, 6);
    });
});