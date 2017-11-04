const fs = require('fs');
const path = require('path');

module.exports = async (language) => {
  const file = path.join(__dirname, `locales/locale-${language}.json`);
  if (fs.existsSync(file)) {
    const pack = JSON.parse(fs.readFileSync(file, 'utf-8'));
    return pack;
  }
  return {};
};
