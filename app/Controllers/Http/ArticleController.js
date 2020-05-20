"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Tag = use("App/Models/Tag");

const Article = use("App/Models/Article");

/**
 * Resourceful controller for interacting with articles
 */
class ArticleController {
  /**
   * Show a list of all articles.
   * GET articles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let articles = await Article.query()
      .with("user")
      .with("tags")
      .orderBy("created_at", "desc")
      .fetch();

    return view.render("articles.index", { articles: articles.toJSON() });
  }

  /**
   * Render a form to be used for creating a new article.
   * GET articles/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    let tags = await Tag.all();
    return view.render("articles.create", { tags: tags.toJSON() });
  }

  /**
   * Create/save a new article.
   * POST articles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth, session }) {
    delete request.all()._csrf;
    let tags = request.all().tags;

    delete request.all().tags;
    let article = await Article.create({
      ...request.all(),
      user_id: auth.user.id,
    });
    await article.tags().attach(tags);
    session.flash({ msg: "Article created successfully" });

    return response.route("articles.index");
  }

  /**
   * Display a single article.
   * GET articles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}
  /**
   * Display a single article.
   * GET articles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async articlesOfTag({ params, request, response, view }) {
    let tag = await Tag.query()
      .where("id", params.tagId)
      .with("articles")
      .with("articles.user")
      .withCount("articles")
      .last();

    return view.render("articles.archieve-tag", { tag: tag.toJSON() });
  }

  /**
   * Render a form to update an existing article.
   * GET articles/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update article details.
   * PUT or PATCH articles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a article with id.
   * DELETE articles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ArticleController;
