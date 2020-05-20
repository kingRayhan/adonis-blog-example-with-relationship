"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ArticleSchema extends Schema {
  up() {
    this.create("articles", (table) => {
      table.increments();
      table.string("title");
      table.text("body");
      table.integer("user_id");
      table.timestamps();
    });
  }

  down() {
    this.drop("articles");
  }
}

module.exports = ArticleSchema;
