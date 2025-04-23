# BOLT12 User Guide Server Status

## Server Status Check - April 23, 2025

### Vite Development Server
```bash
> bolt12-username-guide@0.0.0 dev
> vite --host 0.0.0.0
  VITE v6.2.2  ready in 239 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.31.230:5173/
  ➜  press h + enter to show help
```

### HTTP Status Check
Testing the PDF export page:
```bash
curl -I http://localhost:5173/src/pdf-export.html
HTTP/1.1 200 OK
Vary: Origin
Content-Type: text/html
Cache-Control: no-cache
Etag: W/"2a9a-Y3XlD4kfwXRJMoM3PN3EFEIF9Pg"
Date: Wed, 23 Apr 2025 20:46:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

Testing the main guide page:
```bash
curl -I http://localhost:5173/src/index.html
HTTP/1.1 200 OK
Vary: Origin
Content-Type: text/html
Cache-Control: no-cache
Etag: W/"d98-hR+33rO7gwSJOWMtjkvQ2fVa5Gc"
Date: Wed, 23 Apr 2025 20:46:59 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### Running Processes
```bash
ps aux | grep vite
ayushsrivastava  75070   0.2  0.4 432948512  34416 s004  S+    2:08AM   0:04.71 node /Users/ayushsrivastava/Downloads/bolt12-username-guide/node_modules/.bin/vite --host 0.0.0.0
ayushsrivastava  77675   0.0  0.0 410059488    752 s003  R+    2:17AM   0:00.00 grep vite
```

## Summary

The server is functioning correctly. Both the main guide page (`/src/index.html`) and the PDF export page (`/src/pdf-export.html`) are accessible and returning HTTP 200 OK responses.

To access the guide:
1. Open a web browser
2. Navigate to http://localhost:5173/src/index.html for the main guide
3. Navigate to http://localhost:5173/src/pdf-export.html for the printable version

The guide successfully implements the steps from Seth for Privacy's article on setting up a human-readable BOLT12 offer with Bitcoin usernames using BIP353. 
