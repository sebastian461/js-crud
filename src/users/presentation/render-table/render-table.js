import usersStore from "../../store/users-store";
import { showModal } from "../render-modal/render-modal";
import "./render-table.css";

let table;

const creatTable = () => {
  const table = document.createElement("table");
  const tableHeaders = document.createElement("thead");
  tableHeaders.innerHTML = `
    <tr>
      <th>#ID</th>
      <th>Balance</th>
      <th>First name</th>
      <th>Last name</th>
      <th>Active</th>
      <th>Actions</th>
    </tr>
  `;
  const tableBody = document.createElement("tbody");
  table.append(tableHeaders, tableBody);
  return table;
};

/**
 *
 * @param {MouseEvent} event
 */
const tableSelectListener = (event) => {
  const element = event.target.closest(".select-user");
  if (!element) return;
  const id = element.getAttribute("data-id");
  showModal(id);
};

/**
 *
 * @param {HTMLDivElement} element
 */
export const renderTable = (element) => {
  const users = usersStore.getUsers();
  if (!table) {
    table = creatTable();
    element.append(table);
    table.addEventListener("click", (event) => {
      tableSelectListener(event);
    });
  }

  let tableHTML = "";
  users.forEach((u) => {
    tableHTML += `
      <tr>
        <td>${u.id}</td>
        <td>${u.balance}</td>
        <td>${u.firstName}</td>
        <td>${u.lastName}</td>
        <td>${u.isActive}</td>
        <td>
          <a href="#" class="select-user" data-id="${u.id}">Select</a>
          |
          <a href="#" class="delete-user" data-id="${u.id}">Delete</a>
        </td>
      </tr>
    `;
  });

  table.querySelector("tbody").innerHTML = tableHTML;
};
