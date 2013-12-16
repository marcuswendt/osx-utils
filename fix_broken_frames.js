#!/usr/bin/env node

// Here is the specification form http://nodejs.org/docs/latest/api/process.html#process_process_argv
// process.argv
// process.cwd()


var fs = require('fs');
var path = require('path');

var cwd = process.cwd();
console.log(cwd);

function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

fs.readdir(cwd, function(err, files) {
	files.forEach(function(file){
		var filePath = path.join(cwd, file);
		fs.stat(filePath, function(err, stats) {
			if(stats.isFile() && stats.size < 1024) {
				console.log("fixing " + filePath);

				// var frame = file.match('/^.*\((\d+)\)/g');
				// var frame = file.match('/.*/g');
				var p0 = file.lastIndexOf("_");
				var p1 = file.lastIndexOf(".");
				var frame = parseInt(file.substring(p0 + 1, p1));

				prevFile = file.substring(0, p0+1) + "" + (frame - 1) + "" + file.substring(p1);
				var prevFilePath = path.join(cwd, prevFile);

				var fixedFile = file; // + ".test";
				var fixedFilePath = path.join(cwd, fixedFile);

				copyFile(prevFilePath, fixedFilePath, function(err) {
					console.log("copied " + fixedFilePath);
				});

				// if(fs.existsSync(prevFile)) {
				// 	console.log("cur "+ file + " prev " + prevFile);
				// 	fs.unlinkSync(file);
				// }
				// fs.exists(prevFile, function(exists) {
				// 	if(exists) {
				// 		console.log("cur "+ file + "prev " + prevFile);
				// 	}
				// });
				console.log("p0 "+ p0 +" "+ p1 +" frame "+ frame +" f++ "+ (frame + 1) + " prev "+ prevFile);
			}
		});
	});
});