const parseRecordFields = function (fields) {

    const obj = {
        title: fields.title ? fields.title[0] : '', 
        description: fields.description ? fields.description[0] : '', 
        emoji_id: fields.emoji_id ? parseInt(fields.emoji_id[0]) : 0, 
        hashtags: fields.hashtags ? JSON.parse(fields.hashtags[0]) : [], 
    };
    return obj;
}

module.exports = parseRecordFields;