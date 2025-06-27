const introTxt = document.getElementById("intro-txt");

const introTxtArr = ["Hii, I am Gautam", "I am a Web Developer"];

function typeTxt(arrIndex = 0) {
  if (arrIndex >= introTxtArr.length) return;

  const item = introTxtArr[arrIndex];
  const paraElem = document.createElement("p");
  introTxt.appendChild(paraElem);

  let charIndex = 0;
  const typingSpeed = 50;
  let lastTime = performance.now();

  function typeChar(timeStamp) {
    if (timeStamp - lastTime >= typingSpeed) {
      if (charIndex < item.length) {
        paraElem.textContent += item[charIndex];
        charIndex++;
        lastTime = timeStamp;
      }
    }

    if (charIndex < item.length) {
      requestAnimationFrame(typeChar);
    } else {
      typeTxt((arrIndex += 1));
    }
  }
  requestAnimationFrame(typeChar);
}

typeTxt();
