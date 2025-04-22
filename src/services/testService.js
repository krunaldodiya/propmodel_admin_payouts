/**********************************
 * Desc: Provide services for test module.
 * Auth: Krunal Dodiya
 * Date: 09/04/2025
 **********************************/

import { knex } from "propmodel_api_core";

const greet = async (params = {}, tokenData) => {
  try {
    try {
      return await knex("users").select("*");
    } catch (error) {
      console.error(error);
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Challenges fetch failed");
  }
};

export default {
  greet,
};
