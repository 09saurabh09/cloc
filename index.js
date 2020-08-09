/*
Starting point for counter
/*
check
*/


const CodeParserFactory = require('./parser/code-parser-factory');
const CodeParserComposite = require('./parser/code-parser-composite');

const FileReader = require('./utils/FileReader');
const source = process.env.SOURCE;

(async () => {
    try {
        const codeParserComp = new CodeParserComposite();
        console.log(source, __dirname)
        const files = await FileReader.getFiles(source, __dirname);
        files.forEach(file => {
            const parser = CodeParserFactory.getParser(file);
            codeParserComp.addParser(parser);
        });
        // console.log(files);
        codeParserComp.process();
        codeParserComp.printLineCount();
        // await new Promise(resolve => setTimeout(resolve, 5000));

    } catch(err) {
        console.log(err.message, err.stack);
    }
}
)()