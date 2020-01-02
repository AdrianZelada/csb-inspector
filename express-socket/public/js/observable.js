function ObservableData() {
  this.handlers = [];
  this.subscribe = (cb) => {
    const unsub = this.unsubsribe(cb);
    this.handlers.push(cb);
    return {
      unsubscribe: unsub,
    };
  };

  this.unsubsribe = (cb) =>{
    return () => {
      this.handlers = this.handlers.filter((fn) => {
        return fn !== cb;
      });
    };
  };

  this.next = (data) => {
    this.handlers.forEach((subs) => {
      subs(data);
    });
  };
}
