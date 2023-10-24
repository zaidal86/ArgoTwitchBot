import { sendMessageForLogs } from '../../utils/discordSendMessage.js';
import { createCommands } from '../../commands/create.js';
import { removeCommands } from '../../commands/remove.js';
import { listenCommands } from '../../commands/listen.js';
import { editCommands } from '../../commands/edit.js';
import { twitchClient } from '../../../main.js';

const user = [];

const sayHello = (channel, tags) => {
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

export const message = (channel, tags, message, self) => {
    sayHello(channel, tags, self);
    sendMessageForLogs(message);
    if (self || !message.startsWith('!')) return;

    const args = message.split(' '); // ARGS
    const command = args.shift(); // commandName

    if (command === '!create') return createCommands(channel, tags, args);
    if (command === '!remove') return removeCommands(channel, tags, args);
    if (command === '!edit') return editCommands(channel, tags, args);
    return listenCommands(channel, tags, command);
}