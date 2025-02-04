require('dotenv').config()
const keepAlive = require('./server.js')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Client, GatewayIntentBits } = require("discord.js");
const { exec } = require('child_process');

const MODEL = "gemini-pro";
const API_KEY = process.env.API_KEY
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = '1274193538674069545'

const ai = new GoogleGenerativeAI(API_KEY);
const model = ai.getGenerativeModel({
  model: MODEL,
});

const client = new Client({ intents: Object.keys(	GatewayIntentBits) });

 client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
}); 

client.on("messageCreate", async (message) => {
  try {
    if (
      !message.content ||
      message.author.bot ||
      message.channelId !== CHANNEL_ID
    )
      return;
    const { response } = await model.generateContent(message.cleanContent);

    await message.reply({
      content: response.text(),
      allowedMentions: {
        parse: ['everyone','roles','users']
      } 
    });
  } catch (e) {
    console.log(e);
  }
});

keepAlive()
client.login(BOT_TOKEN);
