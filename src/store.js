class Store {
  static getList() {
    let list;
    if (localStorage.getItem("list") === null) {
      return (list = []);
    } else {
      list = JSON.parse(localStorage.getItem("list"));
    }
    return list;
  }

  static addList(list) {
    const lists = Store.getList();
    lists.push(list);
    localStorage.setItem("list", JSON.stringify(lists));
  }

  static removeList(id) {
    const lists = Store.getList();
    const index = lists.findIndex((list) => list.id === id);

    if (index !== -1) {
      lists.splice(index, 1);
      localStorage.setItem("list", JSON.stringify(lists));
    }
  }
}

export default Store;
