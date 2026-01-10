


// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     total: 0,
//     amount: 0,
//     successRate: 0
//   });

//   useEffect(() => {
//     api.get("/api/v1/payments").then(res => {
//       const payments = res.data;
//       const success = payments.filter(p => p.status === "success");
//       const totalAmount = success.reduce((a, b) => a + b.amount, 0);

//       setStats({
//         total: payments.length,
//         amount: totalAmount,
//         successRate: payments.length
//           ? Math.round((success.length / payments.length) * 100)
//           : 0
//       });
//     });
//   }, []);

//   return (
//     <div className="container" data-test-id="dashboard">
//       <div className="card" data-test-id="api-credentials">
//         <h2>API Credentials</h2>
//         <p>
//           <strong>API Key:</strong>{" "}
//           <span data-test-id="api-key">key_test_abc123</span>
//         </p>
//         <p>
//           <strong>API Secret:</strong>{" "}
//           <span data-test-id="api-secret">secret_test_xyz789</span>
//         </p>
//       </div>

//       <div className="stats" data-test-id="stats-container">
//         <div className="stat-box">
//           <div className="stat-value" data-test-id="total-transactions">
//             {stats.total}
//           </div>
//           <div>Total Transactions</div>
//         </div>

//         <div className="stat-box">
//           <div className="stat-value" data-test-id="total-amount">
//             ₹{stats.amount / 100}
//           </div>
//           <div>Total Amount</div>
//         </div>

//         <div className="stat-box">
//           <div className="stat-value" data-test-id="success-rate">
//             {stats.successRate}%
//           </div>
//           <div>Success Rate</div>
//         </div>
//       </div>
//     </div>
//   );
// }

import "./index.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    amount: 0,
    successRate: 0
  });

  useEffect(() => {
    api.get("/api/v1/payments").then(res => {
      const payments = res.data;
      const success = payments.filter(p => p.status === "success");
      const totalAmount = success.reduce((a, b) => a + b.amount, 0);

      setStats({
        total: payments.length,
        amount: totalAmount,
        successRate: payments.length
          ? Math.round((success.length / payments.length) * 100)
          : 0
      });
    });
  }, []);

  return (
    <div className="container" data-test-id="dashboard">
      <div className="card" data-test-id="api-credentials">
        <h2>API Credentials</h2>
        <p>
          <strong>API Key:</strong>{" "}
          <span data-test-id="api-key">key_test_abc123</span>
        </p>
        <p>
          <strong>API Secret:</strong>{" "}
          <span data-test-id="api-secret">secret_test_xyz789</span>
        </p>
      </div>

      <div className="stats" data-test-id="stats-container">
        <div className="stat-box">
          <div className="stat-value" data-test-id="total-transactions">
            {stats.total}
          </div>
          <div>Total Transactions</div>
        </div>

        <div className="stat-box">
          <div className="stat-value" data-test-id="total-amount">
            ₹{stats.amount / 100}
          </div>
          <div>Total Amount</div>
        </div>

        <div className="stat-box">
          <div className="stat-value" data-test-id="success-rate">
            {stats.successRate}%
          </div>
          <div>Success Rate</div>
        </div>
      </div>
    </div>
  );
}
