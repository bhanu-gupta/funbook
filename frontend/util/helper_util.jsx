import React from 'react';

export const getCurrentFullDate = () => {
    const today = new Date();
    return {
        year: today.getFullYear(),
        month: today.getMonth(),
        date: today.getDate()
    };
};

export const getSelectOptions = (start, end, reverseOrder = false, valuesArr = []) => {
    const options = [];

    for (let i = start; i <= end; i++) {
        const optionVal = valuesArr[i - 1] ? valuesArr[i - 1] : i;
        options.push(<option key={i} value={i}>{optionVal}</option>)
    }

    if (reverseOrder === true) {
        options.reverse();
    }
    return options;
}