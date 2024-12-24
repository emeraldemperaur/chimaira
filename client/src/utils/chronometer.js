import { DateTime } from "luxon";

export const userGreeting = (userName) => {
    let greeting;
    const currentTime = DateTime.now();
    if(currentTime.hour >= 0 && currentTime.hour < 12) greeting = `Good Morning, ${userName}`;
    if(currentTime.hour >= 12 && currentTime.hour < 17) greeting = `Good Afternoon, ${userName}`;
    if(currentTime.hour >= 17 && currentTime.hour < 23) greeting = `Good Evening, ${userName}`;
    if(currentTime.hour >= 23 && currentTime.hour < 0) greeting = `Good Evening, ${userName}`
    return greeting;
}