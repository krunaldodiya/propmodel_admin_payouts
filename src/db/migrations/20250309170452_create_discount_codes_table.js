/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("discount_codes", (table) => {
    table.uuid("uuid").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code").defaultTo(null);
    table.tinyint("status").defaultTo(0);
    table.integer("max_usages_count").defaultTo(0);
    table.integer("current_usages_count").defaultTo(0);
    table.double("discount").defaultTo(0);
    table.timestamp("end_date").defaultTo(null);
    table.string("group_key").defaultTo(null);
    table.decimal("account_balance", 8, 2).defaultTo(0);
    table.timestamps(true, true);

    //Index
    table.index("code");
    table.index("end_date");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable("discount_codes");
}
