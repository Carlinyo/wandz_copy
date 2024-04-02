// const { s3, logger } = require('@namogoo/nmg-utils');
// TODO import s3, logger from the new common libs
(async () => {
  try {
    await s3.uploadFolder('nmg-book.namogoo.com', null, 'storybook-static', 'public-read');
    logger.debug('nmg-book upload static site success 🤠');
    console.log('Visit: http://nmg-book.namogoo.com');
  } catch (err) {
    logger.error('nmg-book upload static site', err);
  }
  process.exit(0);
})();
//
// import {  S3Service } from '@namogoo/ibp-utils';
// import { config as envConfig } from 'dotenv';
//
// envConfig();
//
// const run = async () => {
//   try {
//
//     console.log('Uploading to S3');
//     const s3 = new S3Service(process.env.NX_AWS_ACCESS_KEY, process.env.NX_AWS_SECRET_KEY);
//     await s3.uploadDir('storybook-static', 'nmg-book.namogoo.com');
//     await s3.uploadFile('storybook-static/index.html', 'nmg-mai-templates.namogoo.com', { isPublicRead: true, contentType: 'text/html' });
//     console.log('nmg-mai-templates.namogoo.com upload static site success 🤠');
//     console.log('Visit: http://nmg-book.namogoo.com');
//   } catch (err) {
//     console.error('Fail to upload static site - nmg-book.namogoo.com', err);
//   }
// };
//
// run();
