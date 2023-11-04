import { sendMessageForLogs } from '../../utils/discordSendMessage.js';
import { createCommands } from '../../commands/createCommand.js';
import { removeCommands } from '../../commands/removeCommand.js';
import { listenCommands } from '../../commands/listen.js';
import { getBeatmaps } from '../../api/Osu/getBeatmap.js';
import { editCommands } from '../../commands/editCommand.js';
import { addMessage } from '../../commands/addMessage.js';
import { twitchClient } from '../../../main.js';

const user = [];

const sayHello = (channel, tags, self) => {
    if (self) return;
    if (!user.includes(tags.username)) {
        user.push(tags.username);
        twitchClient.say(channel, `${tags.username} KonCha`);
        setTimeout(() => {
            const index = user.indexOf(tags.username);
            if (index !== -1) {
                user.splice(index, 1);
            };
        }, 36000000);
    };
};

const linkOsu = async (channel, tags, message, self) => {
    if (!(process.env.NODE_OSU === 'true')) return;
    if (self) return;
    const osuLinkRegex = /(https?:\/\/)?osu\.ppy\.sh\/(beatmapsets\/(\d+)#osu\/(\d+))/i;

    const match = message.match(osuLinkRegex);

    if (match) {
        const lastNumber = match[4];
        const string = await getBeatmaps(lastNumber);
        twitchClient.say(channel, string);
    }
};

export const message = (channel, tags, message, self) => {
    sayHello(channel, tags, self);
    linkOsu(channel, tags, message, self);
    sendMessageForLogs(message);
    if (self || !message.startsWith('!')) return;

    const args = message.split(' '); // ARGS
    const command = args.shift(); // commandName

    if (command === '!create') return createCommands(channel, tags, args);
    if (command === '!remove') return removeCommands(channel, tags, args);
    if (command === '!edit') return editCommands(channel, tags, args);
    if (command === '!addmessage') return addMessage(channel, tags, message);
    return listenCommands(channel, tags, command);
}