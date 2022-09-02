const restaurant = require("../controllers/restaurant.controller");

module.exports = (app) => {

  app.post("/fmr/api/v1/restaurants", restaurant.create);

  app.get("/fmr/api/v1/restaurants", restaurant.retrieveAllRestaurants);

  app.get("/fmr/api/v1/categories", restaurant.findAllCategories);

  app.get("/fmr/api/v1/categories/:categoryName/restaurants", restaurant.getRestaurantByCategory);

  app.get("/fmr/api/v1/restaurants/:id", restaurant.findOneRestaurant);

  app.get("/fmr/api/v1/rating/:rating/restaurants", restaurant.getRestaurantByRating);

  app.put("/fmr/api/v1/restaurants/:id", restaurant.updateRestaurantById);

  app.delete("/fmr/api/v1/restaurants/:id", restaurant.deleteRestaurantById);

  app.delete("/fmr/api/v1/restaurants", restaurant.deleteAllRestaurants);

}