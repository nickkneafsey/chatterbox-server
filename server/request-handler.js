var objIdCounter = 1;

var returnObj = {results: [{
    createdAt: "2015-12-15T03:29:29.994Z",
    objectId: "Mf14QKvyPD",
    roomname: "Ice Fortress",
    text: "what up dog",
    updatedAt: "2015-12-15T03:29:29.994Z",
    username: "Mr. Freeze"
  }
]};

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var responseSender = function(statusCode, response){
  headers['Content-Type'] = "application/JSON";
  var json = JSON.stringify(returnObj);
  response.writeHead(statusCode, headers);
  response.end(json);
};

exports.requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode;
  if (request.method === "GET") {
    responseSender(200, response);
  }
  
  if (request.method ==="POST") {
    var requestData="";
    request.on('data', function(chunk) {
      requestData += chunk;
    });
    request.on('end', function(){
      var ob = (JSON.parse(requestData));
      ob.objectId = objIdCounter++;
      returnObj.results.push(ob);
    });
    responseSender(201, response);
  }

  if (request.method === 'OPTIONS'){
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();
  }
  
};



