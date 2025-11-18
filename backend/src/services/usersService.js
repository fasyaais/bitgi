import db from "../models/index.js";
import bcrypt from "bcrypt";

export const getAllUsers = async () => {
  return await db.User.findAll({
    order: [["createdAt", "DESC"]],
  });
};

// export const createUsers = async ({ fullname, username, password }) => {
//   const alreadyUser = await db.User.findOne({ where: { username } });
//   if (alreadyUser) {
//     throw new Error("Username already taken");
//   }
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await db.User.create({
//     fullname,
//     username,
//     password: hashedPassword,
//   });
//   return user;
// };

export const updateUsers = async (id, { fullname, username, password }) => {
  const user = await db.User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await user.update({ fullname, username, password: hashedPassword });
  return user;
};

export const deleteUsers = async (id) => {
  const user = await db.User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  await user.destroy();
  return user;
};
