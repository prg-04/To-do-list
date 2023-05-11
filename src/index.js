import './styles.scss';
import reload from './assets/refresh.png';
import enter from './assets/enter.png';
import addList from './addList.js';
import List from './List.js';
import Store from './store.js';

const heading = document.getElementById('reloadImg');
heading.src = reload;

document.getElementById('addBtn').innerHTML = `
<img src=${enter} alt="enter" />
`;

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('input').value;
  if (input === '') {
    addList.showAlert();
  } else {
    const list = new List(input);
    addList.addList(list);
    Store.addList(list);
    addList.clearFields();
  }
});

const removeElem = () => {
  document.querySelectorAll('.list-group-item').forEach((elem) => {
    elem.querySelectorAll('.form-check-input').forEach((item) => {
      if (item.checked === true) {
        item.parentNode.parentNode.remove();
        addList.removeCompleted(item);
        Store.removeList(item); // pass the id of the removed item
      }
    });
  });
};
document.getElementById('reloadImg').addEventListener('click', removeElem);

document.getElementById('clearBtn').addEventListener('click', removeElem);

document.addEventListener('DOMContentLoaded', () => {
  addList.displayList();
});
