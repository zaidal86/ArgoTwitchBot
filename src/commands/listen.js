import { SchemaCommand } from '../database/schemas/command.js';
import getRank from '../api/leagueOfLegends/getRank.js';
import getUser from '../api/Osu/getUser.js';
import { financial } from '../utils/financial.js';
import { twitchClient } from '../../main.js';
import mongoose from 'mongoose';

export const listenCommands = async (channel, tags, command) => {
    console.log(command)
    const SchemaCommands = mongoose.model('command', SchemaCommand);

    const data = await SchemaCommands.findOne({ name: command.replace('!', '') });
    if (data) {
        if (data.func) {
            switch (data.func) {
                case 'osu':
                    const { levelOSU, accuracy, pp: { raw: pp, rankOSU, countryRank }, counts: { A, S, SH, SS, SSH, plays } } = await getUser();
                    const outputOSU = data.output.replace('{rank}', rankOSU).replace('{pp}', pp).replace('{rankPays}', countryRank).replace('{level}', financial(levelOSU, 0))
                        .replace('{accuracy}', financial(accuracy)).replace('{A}', A).replace('{S}', S).replace('{SS}', SS).replace('{SH}', SH).replace('{SSH}', SSH)
                        .replace('{plays}', plays)
                    twitchClient.say(channel, outputOSU);
                    break;

                case 'lol':
                    const UserStats = await getRank('missargo');
                    const extractedData = UserStats.map(entry => ({
                        tier: entry.tier,
                        rank: entry.rank,
                        leaguePoints: entry.leaguePoints,
                        wins: entry.wins,
                        losses: entry.losses
                    }));
                    const outputLOL = data.output.replace('{rank}', extractedData[0].rank).replace('{tier}', extractedData[0].tier)
                        .replace('{leaguePoints}', extractedData[0].leaguePoints).replace('{wins}', extractedData[0].wins).replace('{losses}', extractedData[0].losses);
                    twitchClient.say(channel, outputLOL);
                    break;

                default:
                    twitchClient.say(channel, 'Cette commande contient une fonction que le bot ne connaît pas.');
                    break;
            }
        }
        twitchClient.say(channel, data.output);
    };
};