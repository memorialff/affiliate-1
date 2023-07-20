// importData.js

import fetch from 'node-fetch';
import mongoose from 'mongoose';
import { parseStringPromise } from 'xml2js';
import dbConnect from '../lib/dbConnect.js';
import Product from '../models/Product.js';

const XML_URL = 'https://api.2performant.com/feed/169a27f62.xml';  // replace with your XML URL

const importData = async () => {
  try {
    await dbConnect();
    const response = await fetch(XML_URL);
    const data = await response.text();
    const result = await parseStringPromise(data);
    const items = result.items.item;
    const products = items.map((item) => {
      return {
        productId: item.product_id[0],
        brand: item.brand[0],
        category: item.category[0],
        subcategory: item.subcategory[0],
        title: item.title[0],
        affCode: item.aff_code[0],
        price: parseFloat(item.price[0]),
        oldPrice: parseFloat(item.old_price[0]),
        campaignName: item.campaign_name[0],
        imageUrls: item.image_urls[0],
        description: item.description[0],
      };
    });
    await Product.insertMany(products);
    console.log('Data import successful.');
  } catch (err) {
    console.log(`Error importing data: ${err}`);
  }
};

export default importData;
