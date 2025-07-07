const hr = document.getElementById("hr");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
const am_pm = document.getElementById("am-pm");

const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

window.requestAnimationFrame(updateTime);

function updateTime() {
  const dateObj = new Date();
  if (
    dateObj.getHours() % 12 == dateObj.getHours() ||
    dateObj.getHours() == 12
  ) {
    hr.textContent = String(dateObj.getHours()).padStart(2, "0");
    am_pm.textContent = "AM";
  } else {
    hr.textContent = String(dateObj.getHours() % 12).padStart(2, "0");
    am_pm.textContent = "PM";
  }
  min.textContent = String(dateObj.getMinutes()).padStart(2, "0");
  sec.textContent = String(dateObj.getSeconds()).padStart(2, "0");
  day.textContent = String(dateObj.getDate()).padStart(2, "0");
  month.textContent = String(dateObj.getMonth() + 1).padStart(2, "0");
  year.textContent = String(dateObj.getFullYear()).padStart(2, "0");

  window.requestAnimationFrame(updateTime);
}
