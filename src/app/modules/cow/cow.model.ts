import {Schema, model} from "mongoose";
import {CowModel, ICow} from "./cow.interface";
import {breed, category, label, location} from "./cow.constant";

const CowSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
      enum: location,
    },
    breed: {
      type: String,
      required: true,
      enum: breed,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: label,
      default: "for sale",
    },
    category: {
      type: String,
      required: true,
      enum: category,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
CowSchema.virtual("orders", {
  ref: "Order",
  foreignField: "cow",
  localField: "_id",
});

//create model
export const Cow = model<ICow, CowModel>("Cow", CowSchema);
