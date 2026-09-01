import React from "react";
import { useSelector } from "react-redux";

const SaleStatistics = () => {
  const { orders } = useSelector((state) => state.orderList);

  const paidOrders = orders
    ? orders.filter((order) => order.isPaid === true)
    : [];

  const totalSales = paidOrders.reduce(
    (total, order) => total + Number(order.totalPrice || 0),
    0
  );

  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Sale statistics</h5>

          <div className="row mt-4">
            <div className="col-6">
              <h6>Total Sales</h6>
              <h3>${totalSales.toFixed(2)}</h3>
            </div>

            <div className="col-6">
              <h6>Paid Orders</h6>
              <h3>{paidOrders.length}</h3>
            </div>
          </div>

          <hr />

          {paidOrders.length === 0 ? (
            <p className="text-muted">
              No paid orders available yet.
            </p>
          ) : (
            <div>
              {paidOrders.slice(0, 5).map((order) => (
                <div
                  key={order._id}
                  className="d-flex justify-content-between mb-2"
                >
                  <span>
                    Order #{order._id.substring(order._id.length - 6)}
                  </span>

                  <strong>
                    ${Number(order.totalPrice || 0).toFixed(2)}
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

export default SaleStatistics;