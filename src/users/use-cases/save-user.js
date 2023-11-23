import { userModelToLH } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user";

/**
 *
 * @param {Like<User>} userLike
 */
export const saveUser = async (userLike) => {
  const user = new User(userLike);

  if (!user.firstName || !user.lastName)
    throw "First and last name are required";

  const userToSave = userModelToLH(user);

  if (user.id) {
    throw new Error("Update not implement");
  }

  const updateUser = await createUser(userToSave);
  return updateUser;
};

/**
 *
 * @param {Like<User>} user
 */
const createUser = async (user) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const newUser = await res.json();
  console.log(newUser);
  return newUser;
};
