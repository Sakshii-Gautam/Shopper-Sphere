import React, { useEffect } from 'react';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { productListApi } from '../features/products/productListService';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const productList = useSelector((state) => state?.productList);
  const { products, error, isLoading } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productListApi());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <Row>
          {products?.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
