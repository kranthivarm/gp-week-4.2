// 
export default function Login() {
  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 420, margin: "auto" }}>
        <h2>Merchant Login</h2>

        <form data-test-id="login-form" onSubmit={submit}>
          <input
            data-test-id="email-input"
            type="email"
            placeholder="Email"
            defaultValue="test@example.com"
          />
          <input
            data-test-id="password-input"
            type="password"
            placeholder="Password"
          />
          <button data-test-id="login-button" style={{ width: "100%" }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
