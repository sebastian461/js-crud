import { User } from "../models/user";
import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
  currentPage: 0,
  users: [],
};

const loadNextPage = async () => {
  const users = await loadUsersByPage(state.currentPage + 1);
  if (users.length === 0) return;

  state.currentPage += 1;
  state.users = users;
};

const loadPreviousPage = async () => {
  if (state.currentPage === 1) return;

  const users = await loadUsersByPage(state.currentPage - 1);
  if (users.length === 0) return;

  state.currentPage -= 1;
  state.users = users;
};

/**
 *
 * @param {User} user
 */
const onUserChanged = (user) => {
  let wasFound = false;

  state.users = state.users.map((u) => {
    if (u.id === user.id) {
      wasFound = true;
      return user;
    }
    return u;
  });

  if (state.users.length < 10 && !wasFound) {
    state.users.push(user);
  }
};

const reloadPage = async () => {
  const users = await loadUsersByPage(state.currentPage);
  if (users.length === 0) {
    await loadPreviousPage();
    return;
  }

  state.users = users;
};

export default {
  loadNextPage,
  loadPreviousPage,
  onUserChanged,
  reloadPage,
  /**
   *
   * @returns {User[]}
   */
  getUsers: () => [...state.users],
  /**
   *
   * @returns {Number}
   */
  getCurrentpage: () => state.currentPage,
};
