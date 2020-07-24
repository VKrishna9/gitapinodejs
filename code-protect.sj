var codeProtect = require('code-protect');
const  fs  =  require('fs-extra')
var path = require("path");
var Promise = require("bluebird");

// destinationDir: './dist-final/',
var option = {
    sourceDir: './dist/',
   
    uglify: true,
    debug: true
};



var finalPath = __dirname + path.sep + "dist-final";
var distPath = __dirname + path.sep + "dist";
console.log("Dist Path =>", distPath);

function mkFinalDir() {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(finalPath)) {
            console.log("Removed path  =>", finalPath);
            fs.remove(finalPath)
                .then(()  => {
                    console.log('mkFinalDir success!');
                    fs.mkdir(finalPath);
                    resolve(true);
                } )
                .catch(err  => {
                    console.log("mkFinalDir Error:", err);
                    reject(false);
                });

        } else {
            fs.mkdir(finalPath);
            console.log('mkFinalDir Path created!');
            resolve(true);
        }
    })

}

var promise = mkFinalDir();

promise
    .then(result => {
        return processProtect();
    }).then(data => {
        console.log('Path created!', data);
        var distPath = finalPath + path.sep + "dist" + path.sep + "config";
        var srcpath = __dirname + path.sep + "src" + path.sep + "config";

        fs.copy(srcpath,  distPath)
            .then((result)  => {
                console.log('success!');
            })
            .catch(err  =>  console.log(err));
    }).catch( err =>{
        console.log("Error ===========>",err);
    })

function processProtect() {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(distPath)) {
            codeProtect(option, function (err, data) {
                if (err) {
                    console.log("Code-Protect Error:", err);
                    reject(err);
                } else {
                    console.log("Build success ==>");
                  //  fs.remove(distPath);
                    resolve("ok");
                }
            });
        } else {
            console.log("dist folder not.Please recheck build process..");
            reject("Dist Folder not found");
        }
    });
}