import '../style/reset.scss';
import '../style/common.scss';

function start(el) {
    var title = document.createElement('h1');
    title.textContent = 'index';
    document.querySelector(el).appendChild(title);
}

start('#app');
