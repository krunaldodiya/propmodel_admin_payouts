/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("user_devices", function (table) {
    table.uuid("uuid").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid("user_uuid").notNullable();
    table.string("browser", 255).nullable();
    table.string("os", 255).nullable();
    table.string("device", 255).nullable();
    table.string("ip", 255).nullable();
    table.string("location", 255).notNullable();
    table.datetime("created_at").notNullable();

    table
      .foreign("user_uuid")
      .references("uuid")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.index("user_uuid");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable("user_devices");
}
