import getSummonerID from './getSummonerID.js';
import axios from 'axios';

export default async function getRank(accounts, region = 'euw1') {
    const RiotKeyHeaders = { headers: { 'X-Riot-Token': process.env.RIOT_TOKEN } };

    const dataSummonerID = await getSummonerID(accounts, region);

    if (dataSummonerID.status === 200);

    const accountsID = dataSummonerID.data.id;

    const link = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${accountsID}`
    const data = await axios.get(link, RiotKeyHeaders);

    if (data.status === 200);

    return data.data;
};