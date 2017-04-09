var srt2vtt = require("./dist/srt2vtt");
var fs = require("fs");

srt2vtt.srt2vtt(fs.readFileSync("test/example.srt"));
console.log(srt2vtt.srt2vtt(fs.readFileSync("test/example.srt")))