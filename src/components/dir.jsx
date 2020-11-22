class Directory {
  constructor() {
    this.dir = [
      {
        name: "",
        path: "/",
        id: 1,
        parentId: null,
        children: [2, 12, 13]
      },
      {
        name: "skills",
        path: "/skills",
        id: 12,
        parentId: 1,
        children: [null]
      },
      {
        name: "cv",
        path: "/cv",
        id: 13,
        parentId: 1,
        children: [null]
      },
      {
        name: "projects",
        path: "/projects",
        id: 2,
        parentId: 1,
        children: [3, 4, 5, 6, 7, 8, 9, 10, 11]
      },
      {
        name: "battleships-game",
        path: "/projects/battleships-game",
        id: 3,
        parentId: 2,
        children: [null]
      },
      {
        name: "freefall-model-calculator",
        path: "/projects/freefall-model-calculator",
        id: 4,
        parentId: 2,
        children: [null]
      },
      {
        name: "homeworks-website",
        path: "/projects/homeworks-website",
        id: 5,
        parentId: 2,
        children: [null]
      },
      {
        name: "img-to-spreadsheet",
        path: "/projects/img-to-spreadsheet",
        id: 6,
        parentId: 2,
        children: [null]
      },
      {
        name: "multiplayer-quiz",
        path: "/projects/multiplayer-quiz",
        id: 7,
        parentId: 2,
        children: [null]
      },
      {
        name: "my-website",
        path: "/projects/my-website",
        id: 8,
        parentId: 2,
        children: [null]
      },
      {
        name: "name-that-colour",
        path: "/projects/name-that-colour",
        id: 9,
        parentId: 2,
        children: [null]
      },
      {
        name: "tabletime-website",
        path: "/projects/tabletime-website",
        id: 10,
        parentId: 2,
        children: [null]
      },
      {
        name: "text-adventure",
        path: "/projects/text-adventure",
        id: 11,
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