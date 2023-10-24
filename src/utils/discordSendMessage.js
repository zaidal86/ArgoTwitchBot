import { discordClient } from '../../main.js';

export const sendMessageForLogs = (message) => {
    if (process.env.NODE_ENV === 'LOG') discordClient.channels.cache.get(process.env.CHANNEL_ID).send(message);
};