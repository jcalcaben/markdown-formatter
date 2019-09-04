const rules = require('./rules');
const jekyllLinkTokenizers = require('./tokenizers').jekyllLink;
const {shortcutLinkFixer, listItemFixer} = require('./visitors');

const remark = require('remark');

const toVfile = require('to-vfile');

const path = require('path');

const processFile = file => {
  //console.log(String(file));

  remark()
    .use({
      settings: {
        //        listItemIndent: '1',
        fences: true,
        incrementListMarker: false,
      },
    })
    .use(jekyllLinkTokenizers.jekyllInlineLink)
    .use(jekyllLinkTokenizers.jekyllLinkDefinition)
    .use(rules)
    .use(shortcutLinkFixer)
    .use(listItemFixer)
    .process(file, (error, fileContent) => {
      //      console.log(error);
      toVfile.writeSync(fileContent);
    });
};

module.exports = () => {
  const args = process.argv.slice(2);

  const pathInfo = path.parse(args[0]);

  //console.log(pathInfo);

  console.log('Attempting to fix: ' + args[0]);

  if (pathInfo.ext != '.md') {
    console.error('File must be a markdown file');
    return;
  }

  toVfile
    .read(args[0])
    .then(processFile)
    .then(() => {
      console.log('Done');
    })
    .catch(error => {
      console.error(error);
    });
};
