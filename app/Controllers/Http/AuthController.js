"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User");

class LoginController {
  async loginView({ view }) {
    return view.render("auth.login");
  }

  async registerView({ view }) {
    return view.render("auth.register");
  }

  async login({ request, auth, response }) {
    let { email, password } = request.all();

    try {
      await auth.attempt(email, password);
      response.route("homePage");
    } catch (error) {}
  }
  /**
   * Show a list of all articles.
   * GET articles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async register({ request, response }) {
    delete request.all()._csrf;

    await User.create(request.all());
    return response.route("auth.login");
  }

  async logout({ auth, response }) {
    await auth.logout();
    return response.route("auth.login");
  }

  async profile({ params, view }) {
    // find the user
    const user = await User.query()
      .where("username", "=", params.username)
      .withCount("articles")
      .with("articles")
      .with("articles.user")
      .last();

    return view.render("profile", { user: user.toJSON() });
  }
}

module.exports = LoginController;
