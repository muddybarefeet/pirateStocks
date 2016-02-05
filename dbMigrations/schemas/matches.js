//Schema from the matches table
//-------------------------------------
module.exports = function (knex) {
    return knex.schema.createTableIfNotExists('matches', function (table) {
        table.increments('m_id')
            .primary();
        table.string('title')
            .unique();
        table.integer('creator_id')
            .references('u_id')
            .inTable('users')
            .notNullable();
        table.integer('starting_funds')
            .notNullable();
        table.integer('challengee')
            .references('u_id')
            .inTable('users');
        table.string('startdate')
            .notNullable();
        table.string('enddate')
            .notNullable();
        table.enu('status', ['Pending', 'Active', 'Rejected', 'Complete'])
            .notNullable();
        table.enu('type', ['Solo', 'Head to Head'])
            .notNullable();
        table.integer('winner');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};
