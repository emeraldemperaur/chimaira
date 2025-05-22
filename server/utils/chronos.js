const { DateTime } = require("luxon");

const getDateTime = () => {
    let dateTime = DateTime.now().setZone('Canada/Mountain');
    console.log(`Chronos timestamp generated: ${dateTime}`)
    return dateTime;
}

const chronosTools = {
    getDateTime
}

module.exports = {chronosTools}