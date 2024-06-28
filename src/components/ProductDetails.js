import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Layout from '../Layout/Layout';
import { useCart } from '../Context/CartContext';
import StarRating from 'react-star-ratings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success('Item added to cart successfully!', {
      position: 'top-right' 
    });
  };

  return (
    <Layout>
      <ToastContainer /> 
      {loading && (
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-6">
              <div className="card h-100">
                <Skeleton height={300} />
                <div className="card-body text-center">
                  <Skeleton height={30} width={`80%`} />
                  <Skeleton height={20} width={`100%`} />
                  <Skeleton height={20} width={`60%`} />
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                  <Skeleton height={40} width={`80%`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <div>Error: {error}</div>}
      {product && (
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-6">
              <div className="card h-100">
                <img
                  className="card-img-top"
                  src={product.image}
                  alt={product.title}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <div className="product-price">
                    <span className="price fw-bold">${product.price}</span>
                  </div>
                  {product.rating && ( 
                    <div className="product-rating mt-3">
                      <StarRating
                        rating={product.rating.rate} 
                        starRatedColor="gold"
                        numberOfStars={5}
                        starDimension="25px"
                        starSpacing="2px"
                      />
                      <span className="ms-2">{product.rating.count} reviews</span>
                    </div>
                  )}
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                  <button
                    className="btn btn-outline-dark mt-auto"
                    onClick={() => handleAddToCart(product)} 
                  >
                    <span className="bi bi-cart4"></span> Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetails;
