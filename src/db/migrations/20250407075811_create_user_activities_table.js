
export async function up(knex) {
  await knex.schema.createTable("user_activities", (table) => {
    table.uuid("uuid").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid('user_uuid').notNullable(); 
    table.string('action').notNullable();
    table.text('metadata').defaultTo(null);
    table.string('ip_address', 45);
    table.text('user_agent');
    table.timestamps(true, true);

    table.index(['action', 'created_at']);
    table.index('created_at');
  
    // Foreign Keys
    table.foreign('user_uuid')
    .references('uuid')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE');
  });
}

export async function down(knex) {
  await knex.schema.dropTable("user_activities");
}
      