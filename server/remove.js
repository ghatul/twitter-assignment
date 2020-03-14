var fs = require('fs');
var path = require('path').resolve();

var removeDir = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse directory
        removeDir(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

var remove = (path) => {
  if (fs.lstatSync(path).isDirectory()) {
    removeDir(path);
  } else {
    fs.unlinkSync(path);
  }
}

var args = process.argv.slice(2);

args.forEach(item => {
  try {
    remove(item)
  } catch (e) {
    console.error(e);
  }
});

