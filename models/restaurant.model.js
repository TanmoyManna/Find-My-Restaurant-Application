module.exports = (mongoose) => {
  const Restaurant = mongoose.model(
    "restaurant",
    mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: "",
        },
        category: {
          type: String,
          required: true,
        },
        imageURL: {
          type: String,
          default:
            "https://www.clipartmax.com/png/middle/213-2131416_restaurant-lamb-clipart-placeholder-image-for-restaurant.png",
        },
        location: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          default: 0,
          min: 0,
          max: 5,
        },
      },
      { timestamps: true }
    )
  );

  return Restaurant;
};
