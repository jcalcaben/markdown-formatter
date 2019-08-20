module.exports.plugins = [
  require('remark-frontmatter'),
  [require('remark-lint-fenced-code-marker'),[1,'`']],
  // MD001
  require('remark-lint-heading-increment'), // Headings should increment sequentially
  // MD003
  [require('remark-lint-heading-style'), [1, 'atx']], // Use 'atx' style headings
  // MD004
  [require('remark-lint-unordered-list-marker-style'), [1, '-']], // // Use a minus ('-') for unordered lists
  // MD005 and MD030
  require('remark-lint-list-item-indent'), // Use tab-size to separate list bullet and content
  // MD006
  require('remark-lint-list-item-bullet-indent'), // Do not indent bullets
  // MD007
  require('remark-lint-list-item-content-indent'), // Do not use mixed indentations in lists
  // MD009 (only partially)
  require('remark-lint-hard-break-spaces'),
  // MD010
  require('remark-lint-no-tabs'), // Use spaces instead of hard tabs
  // MD011
  require('remark-lint-no-shortcut-reference-link'), // Use trailing [] on link references
  // MD012
  require('remark-lint-no-consecutive-blank-lines'), // No consecutive blank lines
  // MD018 and MD019
  require('remark-lint-no-heading-content-indent'), // Use a single space to indent headings
  // MD022 and MD031 and MD032
  require('remark-lint-no-missing-blank-lines'), // Use blank lines to separate content blocks
  // MD023
  require('remark-lint-no-heading-indent'), // No heading indents
  // MD024, :allow_different_nesting => true
  require('remark-lint-no-duplicate-headings-in-section'), // No duplicate headings in the same section
  // MD025
  [require('remark-lint-first-heading-level'), [1, 2]], // Headings start at level 2, so there can be no multiple h1 headers
  // MD029
  [require('remark-lint-ordered-list-marker-value'), 'one'], // Ordered list markers should all be '1'
  // MD035
  require('remark-lint-rule-style'),
  // MD036
  require('remark-lint-no-emphasis-as-heading'), // Do not use emphasis as a paragraph heading
  // MD037 and MD038 and MD039
  require('remark-lint-no-inline-padding'), // Do not add padding to inline markdown nodes
  // MD040
  require('remark-lint-fenced-code-flag'), // Fenced code blocks must have a language associated with it
  // MD046
  [require('remark-lint-code-block-style'), 'fenced'], // Code blocks need to be fenced, not indented
];
