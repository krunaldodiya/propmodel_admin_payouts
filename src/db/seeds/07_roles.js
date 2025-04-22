import { faker } from "@faker-js/faker";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("roles").del();

  // Define standard roles
  const roles = [
    {
      uuid: faker.string.uuid(),
      name: "admin",
      description: "Full access to all system features",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      uuid: faker.string.uuid(),
      name: "user",
      description: "Regular user with limited access",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      uuid: faker.string.uuid(),
      name: "master_admin",
      description: "Super admin with all privileges including role management",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      uuid: faker.string.uuid(),
      name: "subadmin",
      description: "Admin with restricted privileges",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      uuid: faker.string.uuid(),
      name: "customer_support",
      description: "Support staff with view-only access to most features",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  // Insert roles into the roles table
  await knex("roles").insert(roles);
};
