import usersStore from "../../store/users-store";
import { renderTable } from "../render-table/render-table";
import "./render-buttons.css";

/**
 *
 * @param {HTMLDivElement} element
 */
export const renderButtons = (element) => {
  const nextBtn = document.createElement("button");
  const previousBtn = document.createElement("button");

  nextBtn.innerText = "Next >";
  previousBtn.innerText = "< Previous";

  const currentPageLabel = document.createElement("span");
  currentPageLabel.id = "current-page";
  currentPageLabel.innerText = usersStore.getCurrentpage();

  element.append(previousBtn, currentPageLabel, nextBtn);

  nextBtn.addEventListener("click", async () => {
    await usersStore.loadNextPage();
    renderTable();
    currentPageLabel.innerText = usersStore.getCurrentpage();
  });

  previousBtn.addEventListener("click", async () => {
    await usersStore.loadPreviousPage();
    renderTable(element);
    currentPageLabel.innerText = usersStore.getCurrentpage();
  });
};
