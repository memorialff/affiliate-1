import { connectToDatabase } from '../../lib/dbConnect.js';

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    const page = Number(req.query.page) || 1;
    const pageSize = 20;

    const products = await db
      .collection("products")
      .find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const totalProducts = await db.collection("products").countDocuments();

    res.json({ products, page, pageSize, totalProducts });
  } catch (error) {
    console.error("Error fetching products:", error); // Log the error
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
