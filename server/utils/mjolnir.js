require('dotenv').config();

const generatePIN = () => {
    let pin = Math.floor(100000 + Math.random() * 900000);
    console.log(`PIN Generated: ${pin}`)
    return pin;
}

async function getPagination (page, size){
    const limit = size ? +size : 1;
    const offset = page ? page * limit : 0;
    return { limit, offset };
}

async function getPaginateData (dataPayload, page, limit){
    const totalItems = dataPayload.count;
    const dataObject = dataPayload.rows;
    const currentPage = page ? ++page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    var hasNextPage = false;
    if(currentPage < totalPages) hasNextPage = true;
    return { totalItems, dataObject, totalPages, currentPage, limit, hasNextPage}


}

const mjolnirTools = {
    generatePIN,
    getPagination,
    getPaginateData
}

module.exports = {mjolnirTools}