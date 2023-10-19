import { SchemaCommand } from '../database/schemas/command.js';
import { twitchClient } from '../../main.js';
import mongoose from 'mongoose';

export const removeCommands = async (channel, tags, args) => {
    if (args.length < 1) return twitchClient.say(channel, 'Il manque des arguments a ta command !');
    if (args[0].startsWith('!')) args[0] = args[0].replace('!', '');

    const commandName = args.shift();

    const SchemaCommands = mongoose.model('command', SchemaCommand);

    const data = await SchemaCommands.findOneAndDelete({ name: commandName });
    try {
        if (data) {
            twitchClient.say(channel, `Command ${commandName} supprimée avec succès.`);
        } else {
            twitchClient.say(channel, `Aucune command portant le nom ${commandName} n'a été trouvée.`);
        }
    } catch (error) {
        console.log(error);
        twitchClient.say(channel, 'Il y a eu une erreur !');
    }
};