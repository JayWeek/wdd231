// date.js
export function setCurrentYear() {
  const currentYearEl = document.querySelector("#currentyear");
  if (currentYearEl) {
    const today = new Date();
    currentYearEl.textContent = today.getFullYear();
  }
}

export function setLastModified() {
  const lastModifiedEl = document.querySelector("#last-Modified");
  if (lastModifiedEl) {
    const lastmod = new Date(document.lastModified);

    const twoDigits = (num) => String(num).padStart(2, '0');

    const formattedDate = 
      `${twoDigits(lastmod.getMonth() + 1)}/` +
      `${twoDigits(lastmod.getDate())}/` +
      `${lastmod.getFullYear()}/ ` +
      `${twoDigits(lastmod.getHours())}:` +
      `${twoDigits(lastmod.getMinutes())}:` +
      `${twoDigits(lastmod.getSeconds())}`;

    lastModifiedEl.textContent = `Last modification: ${formattedDate}`;
  }
}
