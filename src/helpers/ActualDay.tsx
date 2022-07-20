export const today = new Date();

export let day = today.getDate().toString();
if(day.length === 1) {
    day = '0' + day;
}

export let month = (today.getMonth() + 1).toString();
if(month.length === 1) {
    month = '0' + month;
}

export let year = today.getFullYear().toString();

export const fullDate = `${month}/${day}/${year}`;