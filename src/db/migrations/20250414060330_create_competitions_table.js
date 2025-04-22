/**********************************
 * Desc: Migration for creating competitions table
 * Auth: Krunal Dodiya
 * Date: Current Date
 **********************************/

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("competitions", function (table) {
    table.uuid("uuid").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name").notNullable();
    table.text("description").nullable();

    table.string("balance_size").notNullable();
    table.string("step_type").notNullable();
    table.string("risk_setting").notNullable();
    table.string("platform").notNullable();
    table.boolean("rules_applicable").notNullable().defaultTo(false);

    table.bigint("max_participants").notNullable().defaultTo(0);
    table.timestamp("start_date").notNullable();
    table.timestamp("end_date").notNullable();
    table.timestamp("registration_open_till").nullable();

    // Prize Type
    table.string("prize_type").notNullable();
    table.decimal("entry_fee", 15, 2).notNullable().defaultTo(0);
    table.string("entry_currency").defaultTo("USD");

    table.string("status").defaultTo("active");

    table.timestamps(true, true); // created_at, updated_at

    // Indexes
    table.index("start_date");
    table.index("end_date");
    table.index("registration_open_till");
    table.index("prize_type");
    table.index("entry_fee");
    table.index("status");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable("competitions");
}
