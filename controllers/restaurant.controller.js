const db = require("../models");
const Restaurant = db.restaurant;

/** Create Restaurant */
exports.create = (req, res) => {
  //Validate Request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }

  const restaurant = new Restaurant({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    imageURL: req.body.imageURL,
    location: req.body.location,
    phone: req.body.phone,
    rating: req.body.rating,
  });

  restaurant
    .save(restaurant)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while creating the Restaurant",
      });
    });
};

/** Find a Restaurant */
exports.findOneRestaurant = (req, res) => {
  const id = req.params.id;

  Restaurant.findById({ _id: id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "No Restaurant found with the given ID",
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error while fetching the Restaurant",
      });
    });
};

/** Find All different Categories in Restaurant Schema */
exports.findAllCategories = (req, res) => {
  Restaurant.find({})
    .select("category")
    .distinct("category")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while fetching Categories",
      });
    });
};

/** Find All Restaurants */
exports.retrieveAllRestaurants = (req, res) => {
  Restaurant.find({})
    .then((data) => {
      res.status(200).send({
        restaurants: data,
        message: "Restaurants fetched successfully.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while fetching the Restaurants.",
      });
    });
};

/** Find Restaurant by Category */
exports.getRestaurantByCategory = (req, res) => {
  const category = req.params.categoryName;

  var filter = { category: { $regex: new RegExp(category), $options: "i" } };

  Restaurant.find(filter)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while fetching the Restaurant.",
      });
    });
};

/** Get Restaurants By Rating
 * [eg. input give 4 then all the restaurant with rating 4 and above will be fetched] */
exports.getRestaurantByRating = (req, res) => {
  const rating = req.params.rating;
  Restaurant.find({ rating: { $gte: rating } })
    .sort("-createdAt")
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while fetching the Restaurants.",
      });
    });
};

/** Update Restaurant */
exports.updateRestaurantById = (req, res) => {
  var id = req.params.id;

  //validate request
  if (!id) {
    res.status(400).send({
      message: "Restaurant ID is required.",
    });
    return;
  }

  if (!req.body.name) {
    res.status(400).send({
      message: "Restaurant Data is required.",
    });
    return;
  }

  Restaurant.findOneAndUpdate({ _id: id }, req.body)
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Restaurant updated successfully.",
        });
      } else {
        res.status(200).send({
          message: "No Restaurant found for given ID.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while updating the Restaurant.",
      });
    });
};

/** Delete Restaurant */
exports.deleteRestaurantById = (req, res) => {
  const id = req.params.id;

  Restaurant.findOneAndDelete({ _id: id })
    .then((data) => {
      res.status(200).send({
        restaurant: data,
        message: "Restaurant deleted successfully.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while deleting the Restaurant.",
      });
    });
};

/** Delete All Restaurants */
exports.deleteAllRestaurants = (req, res) => {
  Restaurant.deleteMany({})
    .then((data) => {
      res.status(200).send({
        restaurants: data,
        message: "Restaurants deleted successfully.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while deleting the Restaurants.",
      });
    });
};
