class Directory {
  constructor() {
    this.dir = [
      {
        name: "",
        id: 1,
        parentId: null,
        children: [2]
      },
      {
        name: "projects",
        id: 2,
        parentId: 1,
        children: [3, 4]
      },
      {
        name: "my-website",
        id: 3,
        parentId: 2,
        children: [null]
      },
      {
        name: "battleships",
        id: 4,
        parentId: 2,
        children: [null]
      },
    ];
  }

  getParent(id) {
    const parentId = this.dir.find(x => x.id === id).parentId;
    const parent = this.dir.find(x => x.id === parentId);
    return parent;
  }

  getChildren(id) {
    const childrenIds = this.dir.find(x => x.id === id).children;
    return childrenIds;
  }

  getName(id) {
    const name = this.dir.find(x => x.id === id).name;
    return name;
  }

  getId(name) {
    const id = this.dir.find(x => x.name === name).id;
    return id;
  }

}

export default Directory;