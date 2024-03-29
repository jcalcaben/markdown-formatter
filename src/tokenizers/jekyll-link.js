/**
 * A remark-parse tokenizer to add support for jekyll style link definitions
 * These definitions have spaces in the link and are not correctly parsed
 *
 * For more information see:
 * - https://github.com/remarkjs/remark/tree/master/packages/remark-parse#extending-the-parser
 */

function jekyllLinkDefinition() {
  const TOKENIZER_NAME = 'jekyllLinkDefinition';

  const Parser = this.Parser;
  const tokenizers = Parser.prototype.inlineTokenizers;
  const methods = Parser.prototype.inlineMethods;

  // Add a new inline tokenizer
  tokenizers[TOKENIZER_NAME] = linkDefinitionTokenizer;

  // Run it just before the `link` tokenizer.
  methods.splice(methods.indexOf('link'), 0, TOKENIZER_NAME);
}

function jekyllInlineLink() {
  const TOKENIZER_NAME = 'jekyllInlineLink';
  const Parser = this.Parser;
  const tokenizers = Parser.prototype.inlineTokenizers;
  const methods = Parser.prototype.inlineMethods;

  // Add a new inline tokenizer
  tokenizers[TOKENIZER_NAME] = inlineLinkTokenizer;

  // Run it just before the `link` tokenizer.
  methods.splice(methods.indexOf('link'), 0, TOKENIZER_NAME);
}

/**
 * The tokenizer function to use during parsing
 * @param eat (function) A function used for consuming parts of a string and returning
 *                       a function for adding a node to a syntax tree
 * @param value (string) A value that may contain the value we are looking for
 * @param silent (boolean) Whether the parser should just detect the existence of the pattern
 *                       or also consume it
 */
function linkDefinitionTokenizer(eat, value, silent) {
  // This regex checks to see if a value looks like a markdown link definition
  // Example: [link definition]: {{site.baseurl}}{% link /some/topic/index.md %}
  const match = /^\[([^\]]+)\]:\s?(.*)/.exec(value);

  if (match) {
    if (silent) {
      return true;
    }

    // Create new definition node based on captured values
    // See: https://github.com/syntax-tree/mdast#definition
    let newNode = {
      type: 'definition',
      identifier: match[1],
      label: match[1],
      url: match[2],
    };

    //console.log(newNode);

    // Consume the matching text from value (returns a function for adding a new node)
    // See: https://github.com/remarkjs/remark/tree/master/packages/remark-parse#eatsubvalue
    const add = eat(match[0]);

    // Add the new node to the currently processed node
    // See: https://github.com/remarkjs/remark/tree/master/packages/remark-parse#addnode-parent
    return add(newNode);
  }
}

// Add a locator for the tokenizer. This is required for inline tokenizers.
// See: https://github.com/remarkjs/remark/tree/master/packages/remark-parse#tokenizerlocatorvalue-fromindex
linkDefinitionTokenizer.locator = (value, fromIndex) => {
  return value.indexOf('[', fromIndex);
};

function inlineLinkTokenizer(eat, value, silent) {
  const match = /^\[([^\]]+)\]\(({{[^)]+)\)/.exec(value);

  if (match) {
    if (silent) {
      return true;
    }

    // Create new definition node based on captured values
    // See: https://github.com/syntax-tree/mdast#definition
    let newNode = {
      type: 'link',
      url: match[2],
      children: [{type: 'text', value: match[1]}],
    };

    // console.log(newNode);

    // Consume the matching text from value (returns a function for adding a new node)
    // See: https://github.com/remarkjs/remark/tree/master/packages/remark-parse#eatsubvalue
    const add = eat(match[0]);

    // Add the new node to the currently processed node
    // See: https://github.com/remarkjs/remark/tree/master/packages/remark-parse#addnode-parent
    return add(newNode);
  }
}

inlineLinkTokenizer.locator = (value, fromIndex) => {
  return value.indexOf('[', fromIndex);
};

//module.exports = jekyllLinkDefinition;
module.exports = {jekyllInlineLink, jekyllLinkDefinition};
