# Wom
WebsiteMaker

# What?
Wom is a website maker!

# Is it easy?
Yes, Wom can run a server without routes.js!

# What's routes.js?
It can make some routes!

# How to use routes.js?
Go to settings.json file.
And Edit page.lock.NotInRoutes to true.
Then you can use routes.js file.
Go to routes.js

Write:
[code]web.route("/", function() {
  return {
    "response": readFile("index.html").text,
    "http": 200
  }
})[/code]
