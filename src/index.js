// The entry point for your application.
//
// Use this fetch event listener to define your main request handling logic. It could be
// used to route based on the request properties (such as method or path), send
// the request to a backend, make completely new requests, and/or generate
// synthetic responses.
addEventListener('fetch', event => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  
  // Send logs to your custom logging endpoint
  // https://developer.fastly.com/learning/compute/javascript/#logging
  // const logger = fastly.getLogger("my-logging-endpoint-name");
  // logger.log("log message");

  // Get the client request from the event
  const req = event.request;

  // Make any desired changes to the client request.
  req.headers.set("Host", "example.com");

  // We can filter requests that have unexpected methods.
  const VALID_METHODS = ["GET"];
  if (!VALID_METHODS.includes(req.method)) {
    const response = new Response("This method is not allowed", {
      status: 405
    });

    // Send the response back to the client.
    return response;
  }

  const method = req.method;
  const url = new URL(event.request.url);

  // If request is a `GET` to the `/` path, send a default response.
  if (method == "GET" && url.pathname == "/") {
    const headers = new Headers();
    headers.set('Content-Type', 'text/html; charset=utf-8');
    const response = new Response("<iframe src='https://developer.fastly.com/compute-welcome' style='border:0; position: absolute; top: 0; left: 0; width: 100%; height: 100%'></iframe>\n", {
      status: 200,
      headers
    });

    // Send the response back to the client.
    return response;
  }

  // Catch all other requests and return a 404.
  const response = new Response("The page you requested could not be found", {
    status: 404
  });

  // Send the response back to the client.
  return response;
};
