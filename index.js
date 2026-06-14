const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');
const express = require('express');

const client = new Client();
const app = express();

// Web Server
app.get('/', (req, res) => {
  res.send(`
    <body>
      <center><h1>Bot 24H ON!</h1></center>
    </body>
  `);
});

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
  console.log("I'm Ready To Work..! 24H");
});

// Discord Ready
client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);

  try {
    const channel = await client.channels.fetch(process.env.channel);

    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfMute: false,
      selfDeaf: true,
    });

    console.log('Connected to voice channel');
  } catch (err) {
    console.error('Voice connection error:', err);
  }
});

// Error Logs
process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

client.login(process.env.token);
