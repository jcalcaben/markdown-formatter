/**
 * Enforces the 2 space between lists
 */
function listItemFixer() {
  const Compiler = this.Compiler;
  const visitors = Compiler.prototype.visitors;

  const originalListItem = visitors.listItem;
  const originalList = visitors.list;

  visitors.listItem = listItem;
  visitors.list = list;

  function listItem(node) {
    var result = originalListItem.apply(this, arguments);

    if (node.ordered) {
      result = result.replace(/\.  /, '. ');
    } else {
      result = result.replace(/   /, '  ');
    }

    return result;
  }

  function list(node) {
    node.children = node.children.map(child => {
      child.ordered = node.ordered;
      return child;
    });

    var result = originalList.apply(this, arguments);

    return result;
  }
}

module.exports = listItemFixer;
