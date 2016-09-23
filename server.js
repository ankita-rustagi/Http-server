var http=require("http");
var path=require("path");
var fs=require("fs");

var readline = require('readline');
function readFile(fileName, response){
	reader = readline.createInterface({
	input : fs.createReadStream(fileName)
	});

	var content = "";


	reader.on('line', function(line){
		content += line;
	})

	reader.on('close', function(){

		response.end(content);
	})
}

var app=http.createServer(function(req,res){
	
	r=req.url;
	c="text/html";
	if(r == "/" ||r == "/index.html"){
		
		res.writeHead(200,{"Content-Type":c});
		readFile("../html/index.html", res);
	}
	else{
		dir=__dirname;
		console.log(dir);
		p=path.join(dir,path.sep,"../",r);
		ext=r.split(".").pop();
		switch(ext){
			case "css":
			c="text/css";
			res.writeHead(200,{"Content-Type":c});
			readFile(p,res);
			break;

			case "js":
			c="text/js";
			res.writeHead(200,{"Content-Type":c});
			readFile(p,res);
			break;

			default:
			c="text/html";
			res.writeHead(404,{"Content-Type":c});
			res.end("<H1>404: File not found</H1>");
			break;
			
		}

	}

});
app.listen(8000);