class List {
  constructor(description, completed = false) {
    this.description = description;
    this.completed = completed;
    this.id = Date.now();
  }
}

export default List;