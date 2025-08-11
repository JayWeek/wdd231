export function displayFormResults() {
  const params = new URLSearchParams(window.location.search);
  let output = '';

  params.forEach((value, key) => {
    output += `<div class="result-item"><strong>${key}:</strong> ${decodeURIComponent(value)}</div>`;
  });

  const container = document.getElementById('form-results');
  if (container) {
    container.innerHTML = output;
  }
}

