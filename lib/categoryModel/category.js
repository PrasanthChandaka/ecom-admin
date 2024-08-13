const { mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "category" },
});

export const categoryModel =
  mongoose.models.category || mongoose.model("category", categorySchema);
