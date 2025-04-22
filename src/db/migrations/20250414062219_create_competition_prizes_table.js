/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("competition_prizes", function (table) {
    table.uuid("uuid").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("competition_uuid")
      .notNullable()
      .references("uuid")
      .inTable("competitions")
      .onDelete("CASCADE");

    table.integer("prize_rank").notNullable();
    table.jsonb("prize_details").notNullable();

    table.boolean("is_claimed").defaultTo(false);
    table.uuid("winner_uuid").references("uuid").inTable("users");
    table.timestamps(true, true);

    // Indexes
    table.index("competition_uuid");
    table.index("prize_rank");
    table.index("winner_uuid");
    table.index("is_claimed");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable("competition_prizes");
}
