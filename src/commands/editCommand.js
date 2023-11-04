import { SchemaCommand } from '../database/schemas/command.js';
import { dateString } from '../utils/time.js';
import { twitchClient } from '../../main.js';
import mongoose from 'mongoose';

export const editCommands = async (channel, tags, args) => {
    try {
        let functionName;
        if (args.length < 1) return twitchClient.say(channel, 'Il manque des arguments a ta command !');
        if (args[0].startsWith('!')) args[0] = args[0].replace('!', '');

        const commandName = args.shift();

        if (args[0] === '--function') { functionName = args[1]; args.splice(0, 2); }

        const output = args.join(' ');

        const SchemaCommands = mongoose.model('command', SchemaCommand);

        const data = await SchemaCommands.findOne({ name: commandName });
        if (data) {
            data.output = output || data.output;
            data.func = functionName || data.func;
            data.save();
            return twitchClient.say(channel, `La commande a bien été modifiée.`);
        } else {
            return twitchClient.say(channel, `Aucune command portant le nom ${commandName} n'a été trouvée.`);
        }
    } catch (error) {
        console.log(error);
        twitchClient.say(channel, 'Il y a eu une erreur !');
    };
};