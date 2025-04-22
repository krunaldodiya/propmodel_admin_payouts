/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("mt5_users", (table) => {
    table.uuid("uuid").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid("user_uuid").notNullable();
    table.uuid("purchase_uuid").notNullable();
    table.integer("mt5_login_id").defaultTo(0);
    table.string("group_name", 50).defaultTo(0);
    table.decimal("initial_balance", 8, 2).notNullable();
    table.integer("profit_target").defaultTo(0);
    table.float("profit_split").defaultTo(0);
    table.integer("max_drawdown").defaultTo(0);
    table.integer("max_daily_drawdown").defaultTo(0);
    table
      .enum("account_stage", ["trial", "single", "double", "triple", "instant"])
      .defaultTo(null);
    table.enum("account_type", ["standard", "aggressive"]).defaultTo(null);
    table.integer("account_leverage").defaultTo(0);
    table.tinyint("status").defaultTo(1).index(); // 0: inactive, 1: active, 2: banned
    table.timestamp("funded_at").defaultTo(null).index();
    table.tinyint("is_contract_sign").defaultTo(0);
    table.tinyint("is_trades_check").defaultTo(0);
    table.string("contract_sign_id").defaultTo(null);
    table.text("reason").defaultTo(null);
    table.timestamps(true, true);

    table.index("created_at");
    // Foreign Keys
    table
      .foreign("user_uuid")
      .references("uuid")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .foreign("purchase_uuid")
      .references("uuid")
      .inTable("purchases")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable("mt5_users");
}
