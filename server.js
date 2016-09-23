//IMPORT MODULES
var http=require("http");
var path=require("path");
var fs=require("fs");

var readline = require('readline');

//Function to read file and store content of file in a variable 
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
//Creating server
var app=http.createServer(function(req,res){
	// finding url
	r=req.url;
	c="text/html";

	//mapping of url
	if(r == "/" ||r == "/index.html"){
		
		res.writeHead(200,{"Content-Type":c});
		readFile("../html/index.html", res);
	}
	else{
		dir=__dirname;
		console.log(dir);
		p=path.join(dir,path.sep,"../",r);
		ext=r.split(".").pop();
		//changing the content type of resp according to extention of url(request)
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
//assign port 8000 to server
app.listen(8000);