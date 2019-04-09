const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://zalloSimHomes:zalloPass@zallocluster0-89hrd.mongodb.net/test?retryWrites=true",
  { useNewUrlParser: true }
);

const similarHomesSchema = mongoose.Schema({
  address: {
    type: String,
    index: {
      unique: true,
      dropDups: true
    }
  },
  city: String,
  zip: String,
  state: String,
  price: Number,
  beds: Number,
  baths: Number,
  size: Number,
  listingType: String,
  createdAt: { type: Date, required: true, default: Date.now },
  pictureURL: String
});

const SimilarHome = mongoose.model("SimilarHome", similarHomesSchema);

const getAllHomes = cb => {
  SimilarHome.find({}, null, { sort: { price: 1 } }, (err, docs) => {
    cb(null, docs);
  });
};

module.exports.getAllHomes = getAllHomes;
