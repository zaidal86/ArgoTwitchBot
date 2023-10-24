import { SchemaCommand } from '../database/schemas/command.js';
import getRank from '../api/leagueOfLegends/getRank.js';
import getUser from '../api/Osu/getUser.js';
import { financial } from '../utils/financial.js';
import { twitchClient } from '../../main.js';
import mongoose from 'mongoose';

const extractQueueData = (queueData) => {
    return {
        tier: queueData ? queueData.tier : 'undefined',
        rank: queueData ? queueData.rank : 'undefined',
        wins: queueData ? queueData.wins : 'undefined',
        losses: queueData ? queueData.losses : 'undefined',
        leaguePoints: queueData ? queueData.leaguePoints : 'undefined',
        winRate: queueData ? financial(((queueData.wins / (queueData.wins + queueData.losses)) * 100), 0) : 'undefined'
    };
};

export const listenCommands = async (channel, tags, command) => {
    console.log(command)
    const SchemaCommands = mongoose.model('command', SchemaCommand);

    const data = await SchemaCommands.findOne({ name: command.replace('!', '') });
    if (data) {
        if (data.func) {
            switch (data.func) {
                case 'osu':
                    const { levelOSU, accuracy, pp: { raw: pp, rank: rankOSU, countryRank }, counts: { A, S, SH, SS, SSH, plays } } = await getUser();
                    const outputOSU = data.output.replace('{rank}', rankOSU).replace('{pp}', pp).replace('{rankPays}', countryRank).replace('{level}', financial(levelOSU, 0))
                        .replace('{accuracy}', financial(accuracy)).replace('{A}', A).replace('{S}', S).replace('{SS}', SS).replace('{SH}', SH).replace('{SSH}', SSH)
                        .replace('{plays}', plays)
                    twitchClient.say(channel, outputOSU);
                    break;

                case 'lol':
                    const UserStats = await getRank('missargo');

                    const soloQueueData = UserStats.find(entry => entry.queueType === 'RANKED_SOLO_5x5');
                    const flexQueueData = UserStats.find(entry => entry.queueType === 'RANKED_FLEX_SR');

                    const extractedSoloQueueData = extractQueueData(soloQueueData);
                    const extractedFlexQueueData = extractQueueData(flexQueueData);

                    const outputLOL = data.output
                        .replace('{soloRank}', extractedSoloQueueData.rank)
                        .replace('{soloTier}', extractedSoloQueueData.tier)
                        .replace('{soloLeaguePoints}', extractedSoloQueueData.leaguePoints)
                        .replace('{soloWins}', extractedSoloQueueData.wins)
                        .replace('{soloLosses}', extractedSoloQueueData.losses)
                        .replace('{soloWinRate}', extractedSoloQueueData.winRate)
                        .replace('{flexRank}', extractedFlexQueueData.rank)
                        .replace('{flexTier}', extractedFlexQueueData.tier)
                        .replace('{flexLeaguePoints}', extractedFlexQueueData.leaguePoints)
                        .replace('{flexWins}', extractedFlexQueueData.wins)
                        .replace('{flexLosses}', extractedFlexQueueData.losses)
                        .replace('{flexWinRate}', extractedFlexQueueData.winRate);
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