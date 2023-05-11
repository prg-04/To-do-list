class Store {
  static getList() {
    const list = localStorage.getItem('list');
    if (list === null) {
      return [];
    }
    return JSON.parse(list);
  }

  static addList(list) {
    const lists = Store.getList();
    lists.push(list);
    localStorage.setItem('list', JSON.stringify(lists));
  }

  static removeList(id) {
    const lists = Store.getList();
    const index = lists.findIndex((list) => list.id === id);

    if (index !== -1) {
      lists.splice(index, 1);
      localStorage.setItem('list', JSON.stringify(lists));
    }
  }
}

export default Store;
