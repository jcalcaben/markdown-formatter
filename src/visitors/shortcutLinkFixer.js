function shortcutLinkFixer() {
  const Compiler = this.Compiler;
  const visitors = Compiler.prototype.visitors;

  const original = visitors.linkReference;

  visitors.linkReference = linkReference;

  function linkReference(node) {
    const type = node.referenceType;

    var result = original.apply(this, arguments);

    if (type === 'shortcut') {
      result += '[]';
    }

    return result;
  }
}
module.exports = shortcutLinkFixer;
