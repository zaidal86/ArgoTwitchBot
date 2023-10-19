import * as discordEvent from './src/event/discord/index.js';
import * as twitchEvent from './src/event/twitch/index.js';
import { Client, GatewayIntentBits } from 'discord.js';
import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
import dotenv from 'dotenv';
dotenv.config();
import osu from 'node-osu';
import tmi from 'tmi.js';

const osuClient = new osu.Api(process.env.OSU_TOKEN);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const discordClient = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates],
});

discordClient.login(process.env.DISCORD_TOKEN);

const twitchClient = new tmi.Client({
    options: { debug: false },
    identity: {
        username: 'ZaidalBot',
        password: process.env.TWITCH_TOKEN
    },
    channels: ['missargo']
});

twitchClient.connect();

for (const key in twitchEvent) {
    twitchClient.on(key, twitchEvent[key]);
};

for (const key in discordEvent) {
    discordClient.on(key, discordEvent[key]);
};

export { twitchClient, discordClient, osuClient };