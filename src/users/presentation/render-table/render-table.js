import usersStore from "../../store/users-store";
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
 * @param {HTMLDivElement} element
 */
export const renderTable = (element) => {
  const users = usersStore.getUsers();
  if (!table) {
    table = creatTable();
    element.append(table);
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
          <a href="#" data-id="${u.id}">Select</a>
          <a href="#" data-id="${u.id}">Delete</a>
        </td>
      </tr>
    `;
  });

  table.querySelector("tbody").innerHTML = tableHTML;
};
