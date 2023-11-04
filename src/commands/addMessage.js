import { SchemaMessage } from '../database/schemas/autoMessage.js';
import { dateString } from '../utils/time.js';
import { twitchClient } from '../../main.js';
import mongoose from 'mongoose';

function removeMessagePrefix(message) {
    let result = message.replace(/!addmessage/, '');
    result = result.replace(/--timer \d+/, '');
    result = result.trim();
    return result;
};

export const addMessage = async (channel, tags, message) => {
    try {
        if (message.length < 2) return twitchClient.say(channel, 'Il manque des arguments a ta command !');

        let timerValue = message.indexOf("--timer");
        if (timerValue !== -1) {
            const timerArgs = message.indexOf(" ", timerValue + 7); // +7 pour sauter "--timer "
            if (timerArgs !== -1) {
                timerValue = parseFloat(message.substring(timerArgs + 1));
                if (isNaN(timerValue)) {
                    return twitchClient.say(channel, "Merci de rentrer un nombre valide !");
                };
            } else {
                return twitchClient.say(channel, "Il manque un argument après '--timer'.");
            };
        };

        const DBMessage = mongoose.model('message', SchemaMessage);

        const newMessage = new DBMessage({
            message: removeMessagePrefix(message),
            author: tags.username,
            isActive: false,
            time: {
                rotate: timerValue === -1 ? true : false,
                timer: timerValue === -1 ? 900000 : (timerValue * 1000)
            },
            date: dateString()
        });

        await newMessage.save();
        twitchClient.say(channel, 'Le message a bien été créée !');
    } catch (error) {
        console.log(error);
        twitchClient.say(channel, 'Il y a eu une erreur !');
    };
};