"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ArticleTagSchema extends Schema {
  up() {
    this.create("article_tags", (table) => {
      table.increments();
      table.integer("article_id");
      table.integer("tag_id");
      table.timestamps();
    });
  }

  down() {
    this.drop("article_tags");
  }
}

module.exports = ArticleTagSchema;
