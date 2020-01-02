module.exports = () => {
    return {
        emitChannel: (path, prop,args)=>{
            console.warn("socket", path)
        }
    }
};