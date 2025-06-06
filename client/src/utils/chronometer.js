import { DateTime } from "luxon";

export const userGreeting = (userName) => {
    let greeting;
    const currentTime = DateTime.now();
    if(currentTime.hour >= 0 && currentTime.hour < 12) greeting = `Good Morning, ${userName}`;
    if(currentTime.hour >= 12 && currentTime.hour < 17) greeting = `Good Afternoon, ${userName}`;
    if(currentTime.hour >= 17 && currentTime.hour < 23) greeting = `Good Evening, ${userName}`;
    if(currentTime.hour >= 23 && currentTime.hour < 24) greeting = `Good Evening, ${userName}`
    return greeting;
}

export const getDateTime = () => {
    let dateTime = DateTime.now().setZone('Canada/Mountain');
    console.log(`Chronos timestamp generated: ${dateTime}`)
    return dateTime;
}