import React, { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    amount: 0,
    successRate: 0
  });

  useEffect(() => {
    api.get("/api/v1/payments")
      .then(res => {
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
    <div data-test-id="dashboard">
      <div data-test-id="api-credentials">
        <div>
          <label>API Key</label>
          <span data-test-id="api-key">key_test_abc123</span>
        </div>
        <div>
          <label>API Secret</label>
          <span data-test-id="api-secret">secret_test_xyz789</span>
        </div>
      </div>

      <div data-test-id="stats-container">
        <div data-test-id="total-transactions">{stats.total}</div>
        <div data-test-id="total-amount">₹{stats.amount / 100}</div>
        <div data-test-id="success-rate">{stats.successRate}%</div>
      </div>
    </div>
  );
}
