import React, { useEffect, useState } from "react";
import api from "./api";

export default function Checkout() {
  const [payment, setPayment] = useState(null);
  const [status, setStatus] = useState("idle");

  // Step 1: Create payment when page loads
  useEffect(() => {
    api.post("/api/v1/payments", {
      order_id: "order_" + Date.now(),
      amount: 50000,
      method: "card"
    }).then(res => {
      setPayment(res.data);
      setStatus(res.data.status);
    });
  }, []);

  // Step 2: Poll payment status every 2 seconds
  useEffect(() => {
    if (!payment) return;

    const interval = setInterval(() => {
      api.get(`/api/v1/payments/${payment.id}`)
        .then(res => {
          setStatus(res.data.status);
          if (res.data.status !== "pending") {
            clearInterval(interval);
          }
        });
    }, Number(process.env.REACT_APP_POLL_INTERVAL) || 2000);

    return () => clearInterval(interval);
  }, [payment]);

  if (!payment) {
    return <div data-test-id="loading">Initializing Payment...</div>;
  }

  return (
    <div data-test-id="checkout-page">
      <h2>Checkout</h2>

      <div data-test-id="payment-id">
        Payment ID: {payment.id}
      </div>

      <div data-test-id="order-id">
        Order ID: {payment.order_id}
      </div>

      <div data-test-id="amount">
        Amount: ₹{payment.amount / 100}
      </div>

      <div data-test-id="payment-status">
        Status: {status}
      </div>

      {status === "success" && (
        <div data-test-id="payment-success">
           Payment Successful
        </div>
      )}

      {status === "failed" && (
        <div data-test-id="payment-failed">
           Payment Failed
        </div>
      )}

      {status === "pending" && (
        <div data-test-id="payment-pending">
          ⏳ Waiting for payment confirmation...
        </div>
      )}
    </div>
  );
}

