## Wom
The best website maker.

### Is this easy?
Yes. If you edit the settings,
**Works with HTML only**!

### When to use a file called routes.js ?
It is used when making roads.
You can modify the settings to automatically create a path, but
to allow you to go on a different path from the original path, or
Turn off the setting and use it when connecting from the beginning.

### How to use routes.js ?
First, let's edit the settings to disable autoroute. ( options )
Replace page.AutoRoutes with false in settings.json .

Next, we'll write our code in routes.js .
```javascript
web. route("/", function() {
    return {
        "response": readFile("index.html").text,
        "http": 200
    };
});
```

If you write this way, when you enter 127.0.0.1/, the contents of index.html are loaded.

To output without an HTML file:
```javascript
web. route("/", function() {
    return {
        "response": toBuff(`HTML CODE`),
        "http": 200
    };
});
```
This is how you do it.

### So what can settings.json do?
