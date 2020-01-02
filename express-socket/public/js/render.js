
function itemListComponent(data) {

  const click = function (e) {
    console.log(e);

  };

  return `
    <div class="option">
      <input type="checkbox" id="${data['__id']}" class="toggle" />
           <label class="title" for="${data['__id']}">${data.file}
      </label>
      <div class="content">
        <p>${data.args[0]}</p>
      </div>
    </div>
  `;
}

function Render(id) {
  this.el = document.getElementById(id);
  console.log(this.el, id);
  this.add = (obj) => {
    const item = itemListComponent(obj);
    const template = document.createElement('template');
    template.innerHTML = item;
    const component = template.childNodes;
    // this.el.appendChild(component);
    this.el.insertAdjacentHTML('afterBegin', item);
  };
}
function loadRender() {
  const render = new Render('list');
  let ind = 0;
  observable.subscribe((data) => {
    console.log(data)
    data['__id'] = 'toggle'+ ind;
    ind++;
    render.add(data);
  })
}

function itemClick(data){
  console.log(data);
}

function content() {
  const container = document.createElement('div');

}


