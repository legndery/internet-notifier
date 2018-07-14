import ping from "ping";
import config from './../../config/config';
import notifier from "node-notifier";
import { EventEmitter } from 'events'
import {resolve} from 'path'
import dns from 'dns';
/**
 * InternetStateChangeNotifier Class: which checks with ping or dns if a remote host is reachable or not
 * and emits an event called 'internet_state_changed' with { alive: boolean }
 */
class InternetStateChangeNotifier {
    /**
     * Create the notifier class intstance with params
     * 
     * @param { {host, interval, debounce_time, check_method} } _config 
     * @param { EventEmitter } emitter
     * @param { (function|boolean) } handler
     */
    constructor(handler, emitter, _config){
        this.pastData = {
            alive: undefined
        };
        this.config = _config || config;
        /** @type {EventEmitter} */
        this.emitter = emitter || new EventEmitter();

        if(handler === true || handler === undefined || handler === null){
            this.handler = this.onInternetStateChanged;
        }else if(handler === false || typeof handler === 'function'){
            this.handler = handler;
        }
        this.stateCache = {
            counter:0
        }
    }
    /**
     * run the notification service
     */
    run(){
        if(typeof this.handler === 'function'){
            this.emitter.on('internet_state_changed', (data)=> {
                this.handler(data);
            });
        }
        setInterval(()=> {
            this.checkInternet(config.check_method, config.host)
            .then((result)=>{
                if(this.isStateChanged(result)){
                    this.emitInternetStateChanged(result)
                }
            })
            .catch((err)=>{
                console.error(err)
            });
        }, config.interval);
    }

    checkInternet(type, host){
        switch(type){
            case 'PING': return this.checkInternetWithPing(host);
            case 'DNS' : return this.checkInternetWithDNS(host);
        }
    }
    checkInternetWithDNS(host){
        return new Promise((res, rej)=>{
            try{
                dns.lookup(host, (err)=>{
                    if (err && err.code === "ENOTFOUND") {
                        res({ alive: false })
                    } else {
                        res({ alive: true });
                    }
                })
            }catch(err){
                rej(err);
            }
        });
    }
    checkInternetWithPing(host){
        return ping.promise.probe(host);
    }
    isStateChanged(data){
        if(this.pastData.alive !== data.alive){
            this.stateCache.counter++;
        }else{
            this.stateCache.counter= 0;
        }
        if(this.stateCache.counter === this.config.debounce_time){
            this.pastData.alive = data.alive;
            this.stateCache.counter = 0;
            return true;
        }
        return false;
    }
    emitInternetStateChanged(data){
        this.emitter.emit('internet_state_changed', { alive: data.alive });
    }
    /**
     * The default handler provided. Which creates a toast notification
     * @param {{alive}} data 
     */
    onInternetStateChanged(data){
        const info = data.alive ? 'Internet Up. Time to work :\'(' : 'Internet Down lol! lul! lolz!';
        let icon = resolve(__dirname,'../../assets/img');
        icon = data.alive? resolve(icon, 'error-flat.png'): resolve(icon, 'icons8-ok-256.png')
        try{
            notifier.notify({
                title: 'Internet Status',
                message: info,
                icon
              });
        }catch(err){
            console.log(err);
        }
        this.pastData.alive = data.alive;
    }
}

export default InternetStateChangeNotifier;