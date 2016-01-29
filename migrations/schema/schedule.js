//Schema for the setInterval stock prices update
//Key value store to upsert data into 
//----------------------------------------------
module.exports = function (knex) {
    return knex.schema.createTableIfNotExists('schedule', function (table) {
        table.string('key')
            .notNull()
            .unique()
            .primary();
        table.json('value');
    });
};
