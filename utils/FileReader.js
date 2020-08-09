const path = require('path');
const fs = require('fs');
const { resolve } = require('path');
const { readdir } = require('fs').promises;
const lineByLine = require('n-readlines');


const readFilePromise = function (file) {
    return new Promise(function (ok, notOk) {
        fs.readFile(file, { encoding: 'utf8' }, function (err, data) {
            if (err) {
                notOk(err)
            } else {
                ok(data)
            }
        })
    })
}

class FileReader {
    constructor(path) {
        this.path = path;
    }

    getLanguageByExtension() {
        const extension = path.extname(this.path);
        if (extension == '.js') return 'javascript';
        throw new Error(extension, 'is not supported');
    }

    readFileAsync() {
        return readFilePromise(this.path)
    }

    getLiner() {
        return new lineByLine(this.path);
    }

    static async getFiles(source, dir) {
        console.log(source, dir)
        if (dir && !fs.lstatSync(`${dir}/${source}`).isDirectory()) return [`${dir}/${source}`];
        const dirents = await readdir(source, { withFileTypes: true });
        const files = await Promise.all(dirents.map((dirent) => {
            const res = resolve(source, dirent.name);
            return dirent.isDirectory() ? getFiles(res) : res;
        }));
        return Array.prototype.concat(...files);

    }
}

module.exports = FileReader;