class Directory {
  constructor() {
    this.dir = [
      {
        name: "",
        path: "/",
        id: 1,
        parentId: null,
        children: [2]
      },
      {
        name: "projects",
        path: "/projects",
        id: 2,
        parentId: 1,
        children: [3, 4]
      },
      {
        name: "my-website",
        path: "/projects/my-website",
        id: 3,
        parentId: 2,
        children: [null]
      },
      {
        name: "battleships",
        path: "/projects/battleships",
        id: 4,
        parentId: 2,
        children: [null]
      },
    ];
  }

  getParent(id) {
    const parentId = this.dir.find(x => x.id === id).parentId;
    return parentId;
  }

  getChildren(id) {
    const childrenIds = this.dir.find(x => x.id === id).children;
    return childrenIds;
  }

  getName(id) {
    const name = this.dir.find(x => x.id === id).name;
    return name;
  }

  getId(path) {
    const id = this.dir.find(x => x.path === path).id;
    return id;
  }

  getPath(id) {
    const path = this.dir.find(x => x.id === id).path;
    return path;
  }

}

export default Directory;