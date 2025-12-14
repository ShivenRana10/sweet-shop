import { useState, useEffect } from "react";
import { login, getSweets, addSweet, purchaseSweet } from "./api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [sweets, setSweets] = useState([]);

  const handleLogin = async () => {
    const res = await login(email, password);
    setToken(res.token);
  };

  const loadSweets = async () => {
    const data = await getSweets();
    setSweets(data);
  };

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🍬 Sweet Shop</h1>

      {!token && (
        <>
          <h3>Login</h3>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}

      <hr />

      <h3>Sweets</h3>
      {sweets.map((s) => (
        <div key={s._id || s.id}>
          {s.name} - Qty: {s.quantity}
          {token && (
            <button onClick={() => purchaseSweet(s._id || s.id, token)}>
              Buy
            </button>
          )}
        </div>
      ))}

      <hr />

      {token && (
        <>
          <h3>Add Sweet (Admin)</h3>
          <button
            onClick={() =>
              addSweet(
                { name: "Rasgulla", price: 20, quantity: 10 },
                token
              ).then(loadSweets)
            }
          >
            Add Rasgulla
          </button>
        </>
      )}
    </div>
  );
}

export default App;
