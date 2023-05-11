import dots from './assets/dots.png';
import './styles.scss';
import Store from './store.js';

class UIList {
  static displayList() {
    const lists = Store.getList();
    lists.forEach((list) => UIList.addList(list));
  }

  static addList(list) {
    const ul = document.getElementById('list');
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.id = list.id;
    li.innerHTML = `
          <div>
            <input type="checkbox" class="form-check-input me-2" ${
  list.completed ? 'checked' : ''
} /> ${list.description}
          </div>
          <img src=${dots} alt="toggle-menu" class="dots" />
    `;
    ul.appendChild(li);

    const checkbox = li.querySelector('.form-check-input');
    checkbox.addEventListener('change', () => {
      list.completed = checkbox.checked;
      list.element = li;
      if (list.completed) {
        UIList.removeCompleted(li);
        Store.removeList(list.id);
      } else {
        Store.addList(list);
      }
    });
  }

  static showAlert() {
    const div = document.createElement('div');
    div.className = 'error';
    const text = document.createTextNode('Please enter a task');
    div.appendChild(text);
    const form = document.getElementById('form');
    const cont = document.getElementById('container');
    cont.insertBefore(div, form);

    setTimeout(() => {
      div.remove();
    }, 1000);
  }

  static clearFields() {
    document.getElementById('input').value = '';
  }

  static removeCompletedOnReload() {
    document.querySelectorAll('.list-group-item').forEach((item) => {
      item.querySelectorAll('div').forEach((childItem) => {
        const checkbox = childItem.querySelectorAll('input');
        if (checkbox[0].checked) {
          item.remove();
          Store.removeList(item.listItem);
        }
      });
    });
  }

  static removeCompletedOnClear() {
    document.getElementById('clearBtn').addEventListener('click', () => {
      document.querySelectorAll('.list-group-item').forEach((item) => {
        item.querySelectorAll('div').forEach((childItem) => {
          const checkbox = childItem.querySelectorAll('input');
          if (checkbox[0].checked) {
            item.remove();
            Store.removeList(item.listItem); // Remove list item from local storage
          }
        });
      });
    });
  }

  static removeCompleted(target) {
    const child = target.querySelectorAll('.checked');
    child.forEach((elem) => {
      if (elem.checked === true) {
        elem.parentElement.parentElement.remove();
      }
    });
  }
}

export default UIList;
