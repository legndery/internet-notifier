# Internet Notifier
It will Create a toast notification to notify if Internet is Down or not based on ping request to google.com/yahoo.com

# Getting Started
The package can be used as a standalone app or can be included in your app using `require` or `import`  
## Run Standalone
* ### Using Git CLone
    1. Clone the Repository
        ```bash
        $ git clone git@github.com:legndery/internet-notifier.git
        ```
    2. NPM install dependencies
        ```bash
        $ cd internet-notifier
        $ npm i
        ```
    3. Run it
        ```bash
        $ npm start
        # optionally you can make it a background process by 
        # $ npm start &
        ```
* ### Using NPM global package
    1. NPM install from Git
        ```bash
        $ npm i -g legndery/internet-notifier.git
        ```
    2. Run the package
        ```bash
        $ inotifier # or internet-notifier
        ```
## Include in your module
1. NPM install it as a module
    ```bash
    $ npm i legndery/internet-notifier.git
    ```
2. Import the class in your script and use it.
    ```js
    const InternetStateChangeNotifier = require('internet-notifier');
    const customHandler = (data) => { console.log(data); }
    new InternetStateChangeNotifier(customHandler).run()
    ```
# Reference
### `Class: InternetStateChangeNotifier`
which checks with ping or dns if a remote host is reachable or not and emits an event called 'internet_state_changed' with `{ alive: boolean }`  

### `new InternetStateChangeNotifier(handler, emitter, _config)`
Create the notifier class intstance with params

| Param | Type | Description |
| --- | --- |---|
| handler | <code>function</code> \| <code>boolean</code> | Handler for the `internet_state_changed` event. When `false` there will be no handler, if `true` it will use the default handler i.e the notification handler, if `function` will use the given function as the custom handler|
| emitter | <code>EventEmitter</code> | An EventEmitter instance. If none provided a `new Event.EventEmitter()` is created, `getEmitter()` returns the emitter instance, if any `EventEmitter` is provided it will use that `EventEmitter` |
| _config | <code>Object</code> | A configuration object for the class | 
| _config.host| <code>String</code> | Default: `'8.8.8.8'`, A host or IP which is pinged or resolved|
|_config.interval| <code>Number</code> | Default: `1000`, Probing the Host every `_config.interval` ms|
|_config.debounce_time|  <code>Number</code> | Default: `4`, How many consecutive same status requests are returned before internet state change is determined, i.e if atleast 4 consecutive dead or alive responses gets returned then we determine internet is down or up|
|_config.check_method| <code>String</code> | Default: `"PING"`, Possible Value: `"DNS"`, Determines if it will Ping or Lookup the Host |

### Methods
### `run(): void`
    runs the notification service
### `getEmitter(): EventEmitter`
    returns the EventEmitter instance


