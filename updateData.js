import cron from 'node-cron';
import importData from './utils/importData.js';

cron.schedule('0 0 * * *', async () => {
  console.log('Updating data...');
  await importData();
  console.log('Data update completed.');
});
