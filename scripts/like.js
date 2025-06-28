/* этот скрипт использует такие имена классов:
✦ like-icon — для svg-иконки анимированного сердца
✦ card__like-button — для кнопки Like рядом с иконкой
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ is-liked — для обозначения состояния лайкнутой иконки в виде сердца
✦ button__text — для обозначения текстового элемента внутри кнопки
Если эти классы поменять в HTML, скрипт перестанет работать. Будьте аккуратны.
*/

const likeHeartArray = document.querySelectorAll(
  ".card__button-wrapper .like-icon"
);
const likeButtonArray = document.querySelectorAll(
  ".card__button-wrapper .card__like-button"
);
const iconButtonArray = document.querySelectorAll(
  ".card__button-wrapper .card__icon-button"
);

iconButtonArray.forEach((iconButton, index) => {
  iconButton.onclick = () =>
    toggleIsLiked(likeHeartArray[index], likeButtonArray[index]);
});

likeButtonArray.forEach((button, index) => {
  button.onclick = () => toggleIsLiked(likeHeartArray[index], button);
});

function toggleIsLiked(heart, button) {
  heart.classList.toggle("is-liked");
  setButtonText(heart, button);
}

function setButtonText(heart, button) {
  if ([...heart.classList].includes("is-liked")) {
    setTimeout(
      () => (button.querySelector(".button__text").textContent = "Unlike"),
      500
    );
  } else {
    setTimeout(
      () => (button.querySelector(".button__text").textContent = "Like"),
      500
    );
  }
}

document.querySelectorAll("[data-standalone-like]").forEach((wrapper) => {
  const heartButtons = wrapper.querySelectorAll(".card__icon-button");
  const image = wrapper.closest(".card").querySelector(".card__image");
  const description = wrapper
    .closest(".card")
    .querySelector(".card__image-description");

  heartButtons.forEach((btn) =>
    btn.querySelector(".like-icon").classList.add("is-liked")
  );

  heartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      heartButtons.forEach((btn, i) => {
        const heart = btn.querySelector(".like-icon");
        if (i >= index) {
          heart.classList.remove("is-liked");
        } else {
          heart.classList.add("is-liked");
        }
      });

      updateImageFilter();
    });
  });

  function updateImageFilter() {
    const activeCount = [...heartButtons].filter((btn) =>
      btn.querySelector(".like-icon").classList.contains("is-liked")
    ).length;

    const filterSature = 25 * (7 - activeCount);
    const filterContrast = 5 - activeCount;
    image.style.filter = `saturate(${filterSature}%) contrast(${filterContrast})`;

    if (description) {
      if (activeCount === 0) {
        description.classList.remove("visually-hidden");
      } else {
        description.classList.add("visually-hidden");
      }
    }
  }
});
