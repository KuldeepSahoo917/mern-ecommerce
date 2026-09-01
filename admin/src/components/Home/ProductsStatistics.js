import React from "react";
import { useSelector } from "react-redux";

const ProductsStatistics = () => {
  const { products } = useSelector((state) => state.productList);

  const totalProducts = products ? products.length : 0;

  const inStock = products
    ? products.filter((product) => product.countInStock > 0).length
    : 0;

  const outOfStock = totalProducts - inStock;

  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Products statistics</h5>

          <div className="row mt-4">
            <div className="col-4">
              <h6>Total</h6>
              <h3>{totalProducts}</h3>
            </div>

            <div className="col-4">
              <h6>In Stock</h6>
              <h3>{inStock}</h3>
            </div>

            <div className="col-4">
              <h6>Out of Stock</h6>
              <h3>{outOfStock}</h3>
            </div>
          </div>

          <hr />

          {totalProducts === 0 ? (
            <p className="text-muted">
              No products available yet.
            </p>
          ) : (
            <div>
              {products.slice(0, 5).map((product) => (
                <div
                  key={product._id}
                  className="d-flex justify-content-between mb-2"
                >
                  <span>{product.name}</span>

                  <strong>
                    ${Number(product.price || 0).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
