import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Hash password
export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Compare password dengan hash
export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}
