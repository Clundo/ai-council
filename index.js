const { Client } = require('discord.js');
const env = require('dotenv').config().parsed;
const client = new Client();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', message => {
    if (message.content === 'ping') {
        message.reply('Pong!');
    }
});

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
client.login(env.BOT_TOKEN);
