import { discordClient } from '../../main.js';

export const sendMessage = (message) => {
    discordClient.channels.cache.get(process.env.CHANNEL_ID).send(message);
};