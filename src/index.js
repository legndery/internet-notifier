import ping from "ping";
import config from './../config/config';
import notifier from "node-notifier";

config.hosts.forEach(function(host){
    setInterval(function() {
        ping.sys.probe(host, function(active){
            var info = active ? 'IP ' + host + ' = Active' : 'IP ' + host + ' = Non-Active';
            try{
                notifier.notify({
                    title: 'Internet Status',
                    message: info,
                    sound: 'Funk',
                    timeout:1
                  });
            }catch(err){
                console.log(err);
            }
        });
    }, config.interval);
});