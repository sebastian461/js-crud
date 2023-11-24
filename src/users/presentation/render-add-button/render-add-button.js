import { showModal } from "../render-modal/render-modal";
import "./render-add-button.css";

/**
 *
 * @param {HTMLDivElement} element
 */
export const renderAddButton = (element) => {
  const btn = document.createElement("button");
  btn.innerText = "+";
  btn.classList.add("fab-button");

  element.append(btn);

  btn.addEventListener("click", () => {
    showModal();
  });
};
