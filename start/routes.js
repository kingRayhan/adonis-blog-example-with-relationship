"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/login", "AuthController.loginView").as("auth.login");
Route.get("/register", "AuthController.registerView").as("auth.register");

Route.post("/login", "AuthController.login").as("auth.login");
Route.post("/register", "AuthController.register").as("auth.register");
Route.post("/logout", "AuthController.logout").as("auth.logout");

Route.resource("articles", "ArticleController").middleware(
  new Map([
    [
      [
        "articles.store",
        "articles.update",
        "articles.destroy",
        "articles.edit",
        "articles.create",
      ],
      ["Auth"],
    ],
  ])
);

Route.resource("tags", "TagController").middleware(
  new Map([
    [
      ["tags.store", "tags.update", "tags.destroy", "tags.edit", "tags.create"],
      ["Auth"],
    ],
  ])
);

Route.get("/articles/tags/:tagId", "ArticleController.articlesOfTag").as(
  "tag.articles"
);
Route.get("/user/:username", "AuthController.profile").as("user.profile");

Route.on("/").render("welcome").as("homePage");
