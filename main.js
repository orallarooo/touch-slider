const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const slides = document.querySelectorAll(".slider-image");
const bottom = document.getElementById("bottom");

const slider = document.getElementById("slider");

let currentSlideIndex = 0;
const paginationCircles = [];
let sliderWidth = slider.clientWidth;

function updateSliderWidth() {
  sliderWidth = slider.clientWidth;
}

// Add resize event listener
window.addEventListener("resize", updateSliderWidth);

function showSlide() {
  slider.style.transform = `translateX(-${currentSlideIndex * sliderWidth}px)`;
}

function changeSlide(slideIndex) {
  removeActiveClass();
  currentSlideIndex = slideIndex;
  addActiveClass();
  showSlide();
}

function arrowRightSlide() {
  let newSlideIndex = currentSlideIndex + 1;
  if (newSlideIndex > slides.length - 1) {
    newSlideIndex = 0;
  }
  changeSlide(newSlideIndex);
}

function arrowLeftSlide() {
  let newSlideIndex = currentSlideIndex - 1;
  if (newSlideIndex < 0) {
    newSlideIndex = slides.length - 1;
  }
  changeSlide(newSlideIndex);
}

// arrowRight.addEventListener("click", arrowRightSlide);
// arrowLeft.addEventListener("click", arrowLeftSlide);

arrowLeft.addEventListener("click", (e) => {
  arrowLeftSlide();
  e.stopPropagation();
});

arrowRight.addEventListener("click", (e) => {
  arrowRightSlide();
  e.stopPropagation();
});

function createPaginationCircle() {
  const div = document.createElement("div");
  div.className = "pagination-circle";
  bottom.appendChild(div);
  paginationCircles.push(div);
}

function addPagination() {
  slides.forEach(createPaginationCircle);
  paginationCircles[0].classList.add("active");

  paginationCircles.forEach((circle, index) => {
    circle.addEventListener("click", () => changeSlide(index));
  });
}

function addActiveClass() {
  paginationCircles[currentSlideIndex].classList.add("active");
}

function removeActiveClass() {
  paginationCircles[currentSlideIndex].classList.remove("active");
}

addPagination();

//  touch 

let initX;
// Event listener for the slider container

const frame = document.getElementById('frame');

frame.addEventListener("pointerdown", (e) => {
  // Check if the clicked element is the slider itself

  initX = e.clientX;
  // Add the pointerup listener to the document to catch events even if the pointer moves outside the slider
  document.addEventListener('pointerup', handlePointerUp);
});

function handlePointerUp(up) {
  let finalX = up.clientX;
  finalX - initX > 0 ? arrowLeftSlide() : arrowRightSlide();
  document.removeEventListener("pointerup", handlePointerUp);
}

// hotkey 

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    arrowRightSlide();
  } else if (event.key === "ArrowLeft") {
    arrowLeftSlide();
  }
});





