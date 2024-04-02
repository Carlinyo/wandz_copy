export const getFlattenedTreeNodes = (node, filterFunction, list = []) => {
  list.push(node);
  const children = node.children
    ? filterFunction
      ? node.children
          .filter((child) => filterFunction(child))
          // Filter the children of the children
          .map((dp) =>
            !dp.children
              ? dp
              : {
                  ...dp,
                  children: dp.children.filter((child) => filterFunction(child)),
                  // Filter the directories with empty children
                },
          )
          .filter((dp) => !dp.children || dp.children.length)
      : node.children
    : [];
  children.forEach((n) => getFlattenedTreeNodes(n, filterFunction, list));
  return list;
};

// eslint-disable-next-line consistent-return
export const getNodeAncestorBranches = (root, targetId) => {
  const stack = [[root, []]];
  while (stack.length) {
    const [nodeInfo, path] = stack.pop();
    const children = nodeInfo.children || [];
    if (nodeInfo.id === targetId) {
      if (!children.length) {
        path.pop();
      }
      return path;
    }
    stack.push(...children.map((node) => [node, [...path, node]]));
  }
};

export const searchNodeByText =
  (searchText) =>
  ({ displayName }) => {
    return displayName && displayName.toLowerCase().includes(searchText.toLowerCase());
  };

export default {
  getFlattenedTreeNodes,
  getNodeAncestorBranches,
  searchNodeByText,
};
