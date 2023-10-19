import axios from "axios";

export default async function getSumonnerID(summonerName, region = 'euw1') {
    const RiotKeyHeaders = { headers: { 'X-Riot-Token': process.env.RIOT_TOKEN } };

    const link = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`

    const data = await axios.get(link, RiotKeyHeaders);
    return data;
};