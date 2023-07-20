import { useEffect, useState } from 'react';
import Product from '../models/Product.js'; // adjust this import to point to the correct location

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/products?page=${page}`);
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    setPage(page - 1);
  };

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {products.length > 0 ? products.map(product => (
        <Product key={product._id} product={product} /> // assuming _id is the unique identifier for each product
      )) : <div>No products available.</div>}
      <button onClick={previousPage}>Previous Page</button>
      <button onClick={nextPage}>Next Page</button>
    </div>
  );
};

export default ProductsPage;
