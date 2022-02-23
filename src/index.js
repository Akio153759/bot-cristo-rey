require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const schedule = require('node-schedule');
const tasks = require('./tasks');

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
  
  schedule.scheduleJob('slp-schedule', process.env.CRON_SCHEDULE_EXPRESSION_REQUEST_SLP_PRICE, () => {
    tasks.checkSlpPriceTask(client);
  });

});

client.login(process.env.TOKEN);