var observable = new ObservableData();
var render = loadRender();
var App = {
  init: () => {
    let config = document.getElementById('config');
    const host = config.innerText;
    const socket = io(host, {forceNew: true});

    socket.on('connect', function(e) {
      console.log(e);
    });

    socket.on('console', function(e) {
      console.log(e);
      observable.next(e);
      // console.log(e);
    });
  },
};
