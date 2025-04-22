/**********************************
 * Desc: Provide services for payout module.
 * Auth: GitHub Copilot
 * Date: 22/04/2025
 **********************************/

import { knex } from "propmodel_api_core";

/**
 * Get payouts with cursor-based pagination
 *
 * @param {Object} params - Query parameters
 * @param {Object} tokenData - Token data containing user information
 * @returns {Object} - Paginated payouts with next cursor
 */
const getPayouts = async (params = {}, tokenData) => {
  try {
    const { limit = 10, cursor = null, status, type } = params;

    // Get total count of payouts
    const totalCount = await knex("payout_requests")
      .count("* as total")
      .modify((queryBuilder) => {
        if (status !== undefined) {
          queryBuilder.where("status", status);
        }
        if (type) {
          queryBuilder.where("type", type);
        }
      })
      .first();

    // Build the query for paginated results
    const query = knex("payout_requests")
      .select(["payout_requests.*", knex.raw("to_json(users.*) as user")])
      .leftJoin("users", "payout_requests.user_uuid", "users.uuid")
      .orderBy("payout_requests.created_at", "desc")
      .modify((queryBuilder) => {
        // Apply cursor-based pagination
        if (cursor) {
          // Find the creation date of the cursor record
          const subQuery = knex("payout_requests")
            .select("created_at")
            .where("uuid", cursor)
            .first();

          // Find records created at the same time or before the cursor record
          queryBuilder.where(function () {
            this.where(
              "payout_requests.created_at",
              "<",
              knex.raw(`(${subQuery.toQuery()})`)
            ).orWhere(function () {
              this.where(
                "payout_requests.created_at",
                "=",
                knex.raw(`(${subQuery.toQuery()})`)
              ).andWhere("payout_requests.uuid", "<", cursor);
            });
          });
        }

        // Apply filters if provided
        if (status !== undefined) {
          queryBuilder.where("payout_requests.status", status);
        }

        if (type) {
          queryBuilder.where("payout_requests.type", type);
        }
      })
      .limit(parseInt(limit) + 1); // Fetch one extra to determine if there are more

    // Execute the query
    const results = await query;

    // Determine if there are more records
    const hasMore = results.length > limit;
    const payouts = hasMore ? results.slice(0, limit) : results;

    // Use the UUID of the last record as the next cursor
    const nextCursor =
      hasMore && payouts.length > 0 ? payouts[payouts.length - 1].uuid : null;

    return {
      data: payouts,
      pagination: {
        total: parseInt(totalCount.total),
        has_more: hasMore,
        next_cursor: nextCursor,
        per_page: parseInt(limit),
      },
    };
  } catch (error) {
    console.error("Error fetching payouts:", error);
    throw new Error("Failed to fetch payouts");
  }
};

export default {
  getPayouts,
};
