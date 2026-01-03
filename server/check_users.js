const mongoose = require("mongoose");
require("dotenv").config();

// Define a minimal User schema just for reading
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Prevent overwriting the model if it already exists
const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function inspectDatabase() {
  console.log("🔍 Attempting to connect to MongoDB...");

  if (!process.env.MONGO_URI) {
    console.error("❌ Error: MONGO_URI is missing from environment variables.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected successfully!");

    const users = await User.find({});

    console.log("\n📊 --- USER REPORT ---");
    if (users.length === 0) {
      console.log("⚠️ No users found in the database.");
    } else {
      console.log(`Found ${users.length} registered users:\n`);
      users.forEach((u, index) => {
        console.log(`${index + 1}. Name:  ${u.name}`);
        console.log(`   Email: ${u.email}`);
        console.log(
          `   Pass:  ${u.password ? "(Hashed/Encrypted)" : "MISSING ❌"}`,
        );
        console.log("-----------------------------------");
      });
    }
    console.log("📊 --- END REPORT ---\n");
  } catch (err) {
    console.error("❌ Database Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected.");
  }
}

inspectDatabase();
