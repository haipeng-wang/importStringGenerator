var fs = require('fs')
   ,readline = require('readline')
   ,_ = require('underscore');

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var stringTemplate = _.template(
'<data name="CampaignImport_ColumnHeader{{key}}" xml:space="preserve">\n\
  <value>{{value}}</value>\n\
</data>');

var lineReader = readline.createInterface({
  input: fs.createReadStream(process.argv.slice()[2])
});


lineReader.on('line', function (line) {
  if (line.includes('=')) {
    var key = line.split('=')[0].trim();
    var value = key.match(/([A-Z|\d][a-z|$]*)/g).join(' ');
    console.log(stringTemplate({
      key: key,
      value: value,
    }))
  }
});