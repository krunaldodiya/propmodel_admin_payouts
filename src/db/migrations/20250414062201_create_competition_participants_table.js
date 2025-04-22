export async function up(knex) {
  await knex.schema.createTable("competition_participants", (table) => {
    table.uuid("uuid").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("competition_uuid")
      .notNullable()
      .references("uuid")
      .inTable("competitions")
      .onDelete("CASCADE");

    table.uuid("user_uuid").notNullable().references("uuid").inTable("users");

    table.string("platform_user_id").nullable();
    table.jsonb("platform_user_data").nullable();

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("competition_participants");
}
