import { osuClient } from '../../../main.js';

export default async function getUser() {
    const data = await osuClient.getUser({ u: '6935521' });
    return data;
};