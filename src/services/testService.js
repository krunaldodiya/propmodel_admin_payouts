/**********************************
 * Desc: Provide services for test module.
 * Auth: Krunal Dodiya
 * Date: 22/04/2025 (Updated)
 **********************************/

import { knex } from "propmodel_api_core";

/**
 * Get users with cursor-based pagination
 *
 * @param {Object} params - Query parameters
 * @param {Object} tokenData - Token data containing user information
 * @returns {Object} - Paginated users with next cursor
 */
const getUsers = async (params = {}, tokenData) => {
  try {
    const { limit = 10, cursor = null, status } = params;

    // Get total count of users
    const totalCount = await knex("users")
      .count("* as total")
      .modify((queryBuilder) => {
        if (status !== undefined) {
          queryBuilder.where("status", status);
        }
      })
      .first();

    // Build the query for paginated results
    const query = knex("users")
      .select("*")
      .orderBy("created_at", "desc")
      .modify((queryBuilder) => {
        // Apply cursor-based pagination
        if (cursor) {
          // Find the creation date of the cursor record
          const subQuery = knex("users")
            .select("created_at")
            .where("uuid", cursor)
            .first();

          // Find records created at the same time or before the cursor record
          queryBuilder.where(function () {
            this.where(
              "created_at",
              "<",
              knex.raw(`(${subQuery.toQuery()})`)
            ).orWhere(function () {
              this.where(
                "created_at",
                "=",
                knex.raw(`(${subQuery.toQuery()})`)
              ).andWhere("uuid", "<", cursor);
            });
          });
        }

        // Apply filters if provided
        if (status !== undefined) {
          queryBuilder.where("status", status);
        }
      })
      .limit(parseInt(limit) + 1); // Fetch one extra to determine if there are more

    // Execute the query
    const results = await query;

    // Determine if there are more records
    const hasMore = results.length > parseInt(limit);
    const users = hasMore ? results.slice(0, parseInt(limit)) : results;

    // Use the UUID of the last record as the next cursor
    const nextCursor =
      hasMore && users.length > 0 ? users[users.length - 1].uuid : null;

    return {
      data: users,
      pagination: {
        total: parseInt(totalCount.total),
        has_more: hasMore,
        next_cursor: nextCursor,
        per_page: parseInt(limit),
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

export default {
  getUsers,
};
