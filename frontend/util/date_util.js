import {getCurrentFullDate} from './helper_util';

export const formatDate = date => {
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
    };
    const today = getCurrentFullDate();
    const obj = new Date(date);
    const month = months[obj.getMonth()];
    const day = obj.getUTCDate();
    const year = obj.getFullYear();
    let formattedDate = `${month} ${day}`;
    if (year < today.year) {
        formattedDate += `, ${year}`;
    }
    if (today.month - month > 1) {
        formattedDate += ` at ${formatTime(date)}`;
    }
    return formattedDate;
};

export const formatTime = date => {
    const obj = new Date(date);
    const fullHours = obj.getHours();
    let hours = fullHours % 12;
    if (hours === 0) hours = 12;
    const minutes = obj.getMinutes();
    const tmp = `0${minutes}`;
    const paddedMinutes = tmp.slice(tmp.length - 2);
    const ampm = fullHours < 12 || fullHours === 0 ? 'am' : 'pm';
    return `${hours}:${paddedMinutes}${ampm}`;
};
