//importing dbconnect from utils and models
import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";
//connecting api from mongoose to app

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  //we call dbconnect
  dbConnect();
  //handling GET method
  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      console.error("Error while connecting to the database: ", error);
    }
  }
  //handling PUT/edit method
  if (method === "PUT") {
    try {
      const product = await Product.findByIdAndUpdate(req.body);
      res.status(201).json();
    } catch (error) {
      console.error("Error while connecting to the database: ", error);
    }
  }
  //handling DELETE method
  if (method === "DELETE") {
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted");
    } catch (error) {
      console.error("Error while connecting to the database: ", error);
    }
  }
}
