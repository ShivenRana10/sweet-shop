import React, { useEffect, useState } from "react";
import api from "../api/api";
import SweetCard from "../components/SweetCard";

function Dashboard() {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const buySweet = async (id) => {
    try {
      await api.post(`/sweets/${id}/purchase`);
      fetchSweets();
    } catch {
      alert("Purchase failed");
    }
  };

  return (
    <div className="container">
      <h2>Available Sweets</h2>

      <div className="grid">
        {sweets.map((sweet) => (
          <SweetCard
            key={sweet._id}
            sweet={sweet}
            onBuy={buySweet}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
