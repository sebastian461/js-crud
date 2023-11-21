import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";

/**
 *
 * @param {Number} page
 * @returns {Promise<User[]>}
 */
export const loadUsersByPage = async (page = 1) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
  const res = await fetch(url);
  const data = await res.json();

  /* Yo definí la constante como un arreglo vacio y 
  luego recorrí los datos con un forEach para hacer un push a cada valor de retorno */
  //const users = [];
  //data.forEach((u) => {
  //  users.push(localhostUserToModel(u));
  //});

  /* Pero se puede hacer lo mismo con la función 'map' porque no solo va a recorrer el arreglo
  también lo va a copiar en la nueva variable */
  const users = data.map((u) => localhostUserToModel(u));

  return users;
};
