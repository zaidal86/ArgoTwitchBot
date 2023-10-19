export const time = () => {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000 * +2));
    return nd.toLocaleString();
};

export const dateString = () => {
    var m = new Date();
    return m.getUTCDate() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCFullYear() + " " + (m.getUTCHours() + 2) + ":" + m.getUTCMinutes();
};