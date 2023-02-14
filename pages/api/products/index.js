//importing dbconnect from utils and models
import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";
//connecting api from mongoose to app

export default async function handler(req, res) {
  const { method } = req;
  //we call dbconnect
  dbConnect();
  //handling GET method
  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error while connecting to the database: ", error);
    }
  }
  //handling post method
  if (method === "POST") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json();
    } catch (error) {
      console.error("Error while connecting to the database: ", error);
    }
  }
}
