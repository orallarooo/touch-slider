let count = 1;
let customChange = false;

const sliding = (x) => {
      let left = `${-x*58}vw`;
      let allSlide = document.querySelector('.slider').querySelectorAll('img');
      let allDots = document.querySelector('.dots').querySelectorAll('div');

      allSlide.forEach((element) => {
            element.style.left = left;
      })

      allDots.forEach((dots) => {
            dots.style.border = "unset";
            dots.style.scale = "0.8";
      })

      allDots[x].style.transition = "0.6s"
      allDots[x].style.scale = "1.5"
      allDots[x].style.border = "1px solid #eeff5d"

}

// Slider 

setInterval(()=> {
      if(customChange != true) {
            if(count==5) {
                  sliding(0);
                  count = 1;
            }     else {
                  sliding(count);
                  count += 1;
            }
      }
},8000)

// Left 

const leftSwipe = () => {
      customChange = true;
      setInterval(() => {customChange = false}, 2000);
      if(count == 1) {
            sliding(4);
            count = 5;
      } else {
            count -= 1;
            sliding(count - 1)
      }
}

// right 

const rightSwipe = () => {
      customChange = true;
      setInterval(() => {customChange = false}, 2000);
      if (count == 5) {
            sliding(0);
            count = 1;
      } else {
            sliding(count);
            count += 1;
      }
} 

document.querySelector('.left').addEventListener('click', () => {return leftSwipe();});
document.querySelector('.right').addEventListener('click', () => {return rightSwipe();});

// document.querySelector('.slider').onpointerdown= (e) => {
//       let initX = e.clientX;
//       document.querySelector('.slider').onpointerup = (up) =>{
//             let finalX = up.clientX;
//             finalX - initX > 0 ? leftSwipe() : rightSwipe();
//       }
// }

const slider = document.querySelector('.slider');
let initX;

slider.addEventListener('pointerdown', (e) => {
  initX = e.clientX;

  // Add the pointerup listener to the document to catch events even if the pointer moves outside the slider
  document.addEventListener('pointerup', handlePointerUp);
});

function handlePointerUp(up) {        
  let finalX = up.clientX;
  finalX - initX > 0 ? leftSwipe() : rightSwipe();
  // Remove the pointerup listener after handling the event
  document.removeEventListener('pointerup', handlePointerUp); 
}


