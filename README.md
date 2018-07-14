# Internet Notifier
It will Create a toast notification to notify if Internet is Down or not based on ping request to google.com/yahoo.com
<a name="InternetStateChangeNotifier"></a>

# Getting Started
The package can be used as a standalone app or can be included in your app using `require` or `import`  
## Run Standalone
Clone the Repository or Install the Package
>  
> #### From Git using clone
>```bash
>$ git clone git@github.com:legndery/internet-notifier.git
>```

> #### From Git using NPM
###
## Class: <code>InternetStateChangeNotifier</code>
InternetStateChangeNotifier Class: which checks with ping or dns if a remote host is reachable or not
and emits an event called 'internet_state_changed' with `{ alive: boolean }`

* [InternetStateChangeNotifier](#InternetStateChangeNotifier)
    * [new InternetStateChangeNotifier(_config, emitter, handler)](#new_InternetStateChangeNotifier_new)
    * [.emitter](#InternetStateChangeNotifier+emitter) : <code>EventEmitter</code>
    * [.run()](#InternetStateChangeNotifier+run)
    * [.onInternetStateChanged(data)](#InternetStateChangeNotifier+onInternetStateChanged)

<a name="new_InternetStateChangeNotifier_new"></a>

### new InternetStateChangeNotifier(_config, emitter, handler)
Create the notifier class intstance with params


| Param | Type |
| --- | --- |
| _config | <code>Object</code> | 
| emitter | <code>EventEmitter</code> | 
| handler | <code>function</code> \| <code>boolean</code> | 

<a name="InternetStateChangeNotifier+emitter"></a>

### internetStateChangeNotifier.emitter : <code>EventEmitter</code>
**Kind**: instance property of [<code>InternetStateChangeNotifier</code>](#InternetStateChangeNotifier)  
<a name="InternetStateChangeNotifier+run"></a>

### internetStateChangeNotifier.run()
run the notification service

**Kind**: instance method of [<code>InternetStateChangeNotifier</code>](#InternetStateChangeNotifier)  
<a name="InternetStateChangeNotifier+onInternetStateChanged"></a>

### internetStateChangeNotifier.onInternetStateChanged(data)
The default handler provided. Which creates a toast notification

**Kind**: instance method of [<code>InternetStateChangeNotifier</code>](#InternetStateChangeNotifier)  

| Param | Type |
| --- | --- |
| data | <code>Object</code> | 

