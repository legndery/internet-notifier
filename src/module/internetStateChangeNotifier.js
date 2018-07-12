import ping from "ping";
import config from './../../config/config';
import notifier from "node-notifier";
import { EventEmitter } from 'events'
class InternetStateChangeNotifier {

    constructor(_config, emitter, handler){
        this.pastData = {
            alive: false
        };
        this.config = _config || config;
        /** @type {EventEmitter} */
        this.emitter = emitter || new EventEmitter();
        this.handler = handler || this.onInternetStateChanged;
    }
    run(){
        this.emitter.on('internet_state_changed', (data)=> {
            this.handler(data);
        });
        this.config.hosts.forEach((host)=>{
            setInterval(()=> {
                ping.promise.probe(host)
                .then((result)=>{
                    if(this.isStateChanged(result)){
                        this.emitInternetStateChanged(result)
                    }
                });
            }, config.interval);
        });
    }
    isStateChanged(data){
        return (this.pastData.alive !== data.alive);
    }
    emitInternetStateChanged(data){
        this.emitter.emit('internet_state_changed', data);
    }

    onInternetStateChanged(data){
        var info = !data.alive ? 'Internet Down lol! lul! lolz!' : 'Internet Up. Time to work :\'(';
        try{
            notifier.notify({
                title: 'Internet Status',
                message: info
              });
        }catch(err){
            console.log(err);
        }
        this.pastData.alive = data.alive;
    }
}

export default InternetStateChangeNotifier;