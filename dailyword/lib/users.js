import fs from "fs";
import path from "path";

// Store users in a JSON file (simple, no database needed for testing)
// When you grow, swap this out for a real database like Supabase or PlanetScale
const DB_PATH = path.join(process.cwd(), "data", "users.json");

function ensureDB() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

export function getAllUsers() {
  ensureDB();
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

export function findUserByEmail(email) {
  const users = getAllUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function addUser({ name, email }) {
  ensureDB();
  const users = getAllUsers();
  if (findUserByEmail(email)) return { success: false, reason: "already_exists" };
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    subscribedAt: new Date().toISOString(),
    active: true,
  };
  users.push(newUser);
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
  return { success: true, user: newUser };
}

export function unsubscribeUser(email) {
  ensureDB();
  const users = getAllUsers();
  const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
  if (idx === -1) return false;
  users[idx].active = false;
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
  return true;
}

export function getActiveUsers() {
  return getAllUsers().filter((u) => u.active);
}
