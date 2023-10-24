import { osuClient } from '../../../main.js';

export const getBeatmaps = async (ID) => {
    const data = await osuClient.getBeatmaps({ b: ID });
    if (data.length > 0) {
        const beatmap = data[0];
        const string = `The Beatmap is: [${beatmap.approvalStatus}] ${beatmap.title} [${beatmap.version}] (by ${beatmap.artist}), ${beatmap.bpm} BPM, ${beatmap.difficulty.rating}*`;
        return string;
    };
    return;
};