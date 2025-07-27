const modal = document.getElementById('myModal');
const closeModal = document.getElementById('closeModal');
modal.showModal(); // display the modal dialog right away.
// Usually you will want to wait for a user action to show the modal dialog
closeModal.addEventListener('click', () => {
  modal.close();
});