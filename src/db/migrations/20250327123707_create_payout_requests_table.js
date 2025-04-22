
export async function up(knex) {
  await knex.schema.createTable("payout_requests", (table) => {
    table.uuid("uuid").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid('user_uuid').notNullable(); 
    table.enum('type', ['program', 'affiliate']).defaultTo(null);
    table.integer('mt5_login').defaultTo(0);
    table.decimal('amount', 8, 2).defaultTo(0); 
    table.string('method').notNullable();
    table.smallint('status').notNullable().defaultTo(0); 
    table.jsonb('data');
    table.timestamps(true, true);

    table.index(['status', 'created_at']);
    table.index('created_at');
    table.index('method');

     // Foreign Keys
     table.foreign('user_uuid')
     .references('uuid')
     .inTable('users')
     .onDelete('CASCADE')
     .onUpdate('CASCADE');
    
  });
}

export async function down(knex) {
  await knex.schema.dropTable("payout_requests");
}
