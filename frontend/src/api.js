const API_URL = "http://localhost:3000/api";

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const getSweets = async () => {
  const res = await fetch(`${API_URL}/sweets`);
  return res.json();
};

export const addSweet = async (sweet, token) => {
  const res = await fetch(`${API_URL}/sweets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(sweet)
  });
  return res.json();
};

export const purchaseSweet = async (id, token) => {
  const res = await fetch(`${API_URL}/sweets/${id}/purchase`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};
