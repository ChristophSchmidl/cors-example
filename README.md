# CORS Example

This repo demonstrates how CORS (Cross-Origin Resource Sharing) works in a browser environment using a simple Express API and two static frontend pages.

The project shows:

- How cross-origin `fetch()` requests behave in the browser,
- How cookies can be included in cross-origin requests,
- How improper CORS configuration can expose private user data,
- How CORS protects users — not the server — by controlling access to responses in the browser.

🔧 **Components**

- `api-server.js`: Express server with cookie-based login and CORS config
  
- `trusted/index.html`: Legit frontend (localhost:4000) allowed by CORS
  
- `evil/index.html`: Malicious site (localhost:5000) trying to steal user data

🧪 **Great for teaching or experimenting with**

- CORS headers
  
- Credentialed requests (credentials: "include")
  
- Cross-origin exploits and protections

## Install

`npm install express cors cookie-parser`

## api-server.js

Start the server: `node api-server.js`

## index.html

Start index.html on port 4000: `npx serve ./trusted -l 4000`

## evil.html

Start evil.html on port 5000: `npx serve ./evil -l 5000`

## 🧪 Demo Instructions

- Open http://localhost:4000 → click Login, then Get Private Data

  - ✅ You should see the secret!

- Open http://localhost:5000 → click Try to Steal Data

  - ❌ Browser blocks the response due to CORS!

- Now try misconfiguring the API to allow all origins in api-server.js:

```
app.use(cors({
  origin: '*', // ⚠️ Dangerous
  credentials: true // ❌ INVALID combo (browser blocks it)
}));
```

→ This actually causes the browser to throw a CORS error because `*` cannot be used with `credentials: true`.

So you test:

`origin: ['http://localhost:4000', 'http://localhost:5000']`

...and now the evil page can steal the response data!

Keep in mind that this only instructs the Browser to apply CORS policies and blocks responses that are not in the allowed origins. However, if you use POSTMAN and set the cookie yourself, then CORS won't work and you can access the secret. 