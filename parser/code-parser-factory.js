const JavaScriptParser = require('./javascript-code-parser');

const FileReader = require('../utils/FileReader');

class CodeParserFactory {

    static getParser(path) {
      const file = new FileReader(path);
      const extension = file.getLanguageByExtension();
      if (extension === 'javascript')
        return new JavaScriptParser(file);
    }
  }
  
  class Bmw {
    constructor(model, price, maxSpeed) {
      this.model = model;
      this.price = price;
      this.maxSpeed = maxSpeed;
    }
  }
  
 module.exports = CodeParserFactory;