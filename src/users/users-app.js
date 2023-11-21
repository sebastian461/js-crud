import { renderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";

/**
 *
 * @param {HTMLDivElement} element
 */
export const UsersApp = async (element) => {
  element.innerHTML = "Loding...";
  await usersStore.loadNextPage();
  element.innerHTML = "";
  renderTable(element);
};
