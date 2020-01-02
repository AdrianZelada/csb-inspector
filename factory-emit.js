module.exports = () =>{
    let channels = [];
    return {
        addChamnel: (channel) =>{
            channels.push(channel);
        },
        emitChannels:(path, p,args)=>{
            channels.forEach((channel) => {
                channel.emitChannel(path, p,args);
            });
        }
    }
}