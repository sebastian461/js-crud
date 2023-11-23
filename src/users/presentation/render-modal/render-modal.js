import modalHtml from "./render-modal.html?raw";
import "./render-modal.css";
import { saveUser } from "../../use-cases/save-user";
let modal, form;

export const showModal = () => {
  modal?.classList.remove("hide-modal");
};

export const hideModal = () => {
  modal?.classList.add("hide-modal");
  form?.reset();
};

/**
 *
 * @param {HTMLDivElement} element
 * @param {(userLike) => Promise<void>} saveUserCallback
 */
export const renderModal = (element, saveUserCallback) => {
  if (modal) return;

  modal = document.createElement("div");
  modal.innerHTML = modalHtml;
  modal.classList.add("modal-container", "hide-modal");

  form = modal.querySelector("form");

  modal.addEventListener("click", (event) => {
    if (event.target.className === "modal-container") hideModal();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const userLike = {};
    for (const [key, value] of formData) {
      if (key === "balance") {
        userLike[key] = +value;
        continue;
      } else if (key === "isActive") {
        userLike[key] = value === "on" ? true : false;
        continue;
      }
      userLike[key] = value;
    }
    await saveUserCallback(userLike);
    hideModal();
  });

  element.append(modal);
};
