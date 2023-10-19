import { sendMessage } from '../../utils/discordSendMessage.js';
import { createCommands } from '../../commands/create.js';
import { removeCommands } from '../../commands/remove.js';
import { editCommands } from '../../commands/edit.js';
import { listenCommands } from '../../commands/listen.js';

export const message = (channel, tags, message, self) => {
    sendMessage(message);
    if (self || !message.startsWith('!')) return;

    const args = message.split(' '); // ARGS
    const command = args.shift(); // commandName

    if (command === '!create') return createCommands(channel, tags, args);
    if (command === '!remove') return removeCommands(channel, tags, args);
    if (command === '!edit') return editCommands(channel, tags, args);
    return listenCommands(channel, tags, command);
}