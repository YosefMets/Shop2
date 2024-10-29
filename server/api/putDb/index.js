import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const fs = require('node:fs');

  const folder = 'public/db'

  try {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }

  fs.writeFile(`${folder}/ru.json`, query.foo, { flag: 'w+' }, err => {
    if (err) {
      console.error(err);
    } else {
      console.log( 'File written successfully' );
    }
  });

  let testReading = 'No'
  fs.readFile(`${folder}/ru.json`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
    testReading = data;
  });

  return 'Look: ' + testReading
})