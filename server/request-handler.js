var returnObj = {results: []};

exports.requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  console.log("path: " + request.url);

  var url = request.url;
  var statusCode;
  if (request.method === "GET") {
    if(url === '/classes/messages' || url === '/classes/room1') {
      statusCode = 200;
    } else {
      statusCode = 404;
    }
  }

  
  if (request.method ==="POST") {
      //console.log('dude', request);
    var requestData="";

    request.on('data', function(chunk) {
      requestData += chunk;
    });

    request.on('end', function(){
      var ob = (JSON.parse(requestData));
      returnObj.results.push(ob);
      //console.log(returnObj);
    });
    console.log("OB", returnObj);

    if(url === '/classes/messages' || url === '/classes/room1') {
      

      statusCode = 201;
    } else {
      statusCode = 404;
    }
  }

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  

  // headers['Content-Type'] = "text/plain";
  headers['Content-Type'] = "application/JSON";
  var json = JSON.stringify(returnObj);
  response.writeHead(statusCode, headers);

  response.end(json);
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};