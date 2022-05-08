function children2Null(tree){
    tree.map(item => {
      if (Array.isArray(item.children)) {
        item.children.length === 0
          ? (item.children = null)
          : children2Null(item.children)
      }
    })
    return tree
  }
export function treeing(arr) {
    let tree = [];
    const map = {};
    for (let item of arr) {
      // 一个新的带children的结构
      let newItem = (map[item.id] = {
        ...item,
        children: [],
      });
      if (map[item.parentId]) {
        // 父节点已存进map则在父节点的children添加新元素
        let parent = map[item.parentId];
        parent.children.push(newItem);
      } else {
        // 没有父节点，在根节点添加父节点
        tree.push(newItem);
      }
    }
    return  children2Null(tree)
  
  }