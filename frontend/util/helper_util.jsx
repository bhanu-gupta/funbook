import React from 'react';

export const getCurrentFullDate = () => {
    const today = new Date();
    return {
        year: today.getFullYear(),
        month: today.getMonth(),
        date: today.getDate()
    };
};

export const getSelectOptions = (start, end, reverseOrder) => {
    const options = [];

    for (let i = start; i <= end; i++) {
        options.push(<option key={i}>{i}</option>)
    }

    if (reverseOrder === true) {
        options.reverse();
    }
    return options;
}