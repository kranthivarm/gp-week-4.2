import React, { useEffect, useState } from "react";
import api from "./api";
import "./index.css";
import { useSearchParams } from "react-router-dom";



// export default function Checkout() {
//   const [payment, setPayment] = useState(null);
//   const [status, setStatus] = useState("idle");

//   // Step 1: Create payment when page loads
//   useEffect(() => {
//     api.post("/api/v1/payments", {
//       order_id: "order_" + Date.now(),
//       amount: 50000,
//       method: "card"
//     }).then(res => {
//       setPayment(res.data);
//       setStatus(res.data.status);
//     });
//   }, []);

//   // Step 2: Poll payment status every 2 seconds
//   useEffect(() => {
//     if (!payment) return;

//     const interval = setInterval(() => {
//       api.get(`/api/v1/payments/${payment.id}`)
//         .then(res => {
//           setStatus(res.data.status);
//           if (res.data.status !== "pending") {
//             clearInterval(interval);
//           }
//         });
//     }, Number(process.env.REACT_APP_POLL_INTERVAL) || 2000);

//     return () => clearInterval(interval);
//   }, [payment]);

//   if (!payment) {
//     return <div data-test-id="loading">Initializing Payment...</div>;
//   }

//   return (
//     <div data-test-id="checkout-page">
//       <h2>Checkout</h2>

//       <div data-test-id="payment-id">
//         Payment ID: {payment.id}
//       </div>

//       <div data-test-id="order-id">
//         Order ID: {payment.order_id}
//       </div>

//       <div data-test-id="amount">
//         Amount: ₹{payment.amount / 100}
//       </div>

//       <div data-test-id="payment-status">
//         Status: {status}
//       </div>

//       {status === "success" && (
//         <div data-test-id="payment-success">
//            Payment Successful
//         </div>
//       )}

//       {status === "failed" && (
//         <div data-test-id="payment-failed">
//            Payment Failed
//         </div>
//       )}

//       {status === "pending" && (
//         <div data-test-id="payment-pending">
//           ⏳ Waiting for payment confirmation...
//         </div>
//       )}
//     </div>
//   );
// }


export default function Checkout() {
  const [payment, setPayment] = useState(null);
  const [status, setStatus] = useState("idle");
const [params] = useSearchParams();
const orderId = params.get("order_id");

useEffect(() => {
  if (orderId) {
    // 🔹 fetch existing payment
    api.get(`/api/v1/payments/order/${orderId}`)
      .then(res => {
        setPayment(res.data);
        setStatus(res.data.status);
      })
      .catch(err => {
        console.error("Payment fetch failed", err);
        setStatus("failed");
      });
  } else {
    // 🔹 create new payment
    api.post("/api/v1/payments", {
      order_id: "order_" + Date.now(),
      amount: 50000,
      method: "card"
    }).then(res => {
      setPayment(res.data);
      setStatus(res.data.status);
    });
  }
}, [orderId]);

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
    return (
      <div className="checkout-container">
        <div className="checkout-card">
          <div data-test-id="loading" className="loading">
            Initializing Payment...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-card" data-test-id="checkout-page">
        <h2>Secure Checkout</h2>

        <div className="checkout-row" data-test-id="payment-id">
          Payment ID: <span>{payment.id}</span>
        </div>

        <div className="checkout-row" data-test-id="order-id">
          Order ID: <span>{payment.order_id}</span>
        </div>

        <div className="checkout-row" data-test-id="amount">
          Amount: <span>₹{payment.amount / 100}</span>
        </div>

        <div className="checkout-row" data-test-id="payment-status">
          Status: <span>{status}</span>
        </div>

        {status === "success" && (
          <div
            data-test-id="payment-success"
            className="status-badge status-success"
          >
             Payment Successful
          </div>
        )}

        {status === "failed" && (
          <div
            data-test-id="payment-failed"
            className="status-badge status-failed"
          >
             Payment Failed
          </div>
        )}

        {status === "pending" && (
          <div
            data-test-id="payment-pending"
            className="status-badge status-pending"
          >
            ⏳ Waiting for payment confirmation...
          </div>
        )}
      </div>
    </div>
  );
}
