require("dotenv").config();
const cors = require("cors");

const app = require("./src/app");
const connectDB = require("./src/config/db");
app.use(cors());
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
