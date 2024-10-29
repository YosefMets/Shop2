import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default defineEventHandler( async (event) => {
  const body = await readBody(event)
  const fs = require('node:fs');
  const fsP = require('node:fs/promises');

  const folder = 'public/db'

  try {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }

  fs.writeFile(`${folder}/ru.json`, body, { flag: 'w+' }, err => {
    if (err) {
      console.error(err);
    } else {
      console.log( 'File written successfully' );
    }
  });

  let testReading;
  try {
    testReading = await fsP.readFile(`${folder}/ru.json`, { encoding: 'utf8' });
  } catch (err) {
    console.log(err);
  }
  console.log('W:', testReading);

  return 'Look: '+testReading
})