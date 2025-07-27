import setupNavigation from "./nav.mjs";
import { setCurrentYear, setLastModified } from "./date.mjs";

setupNavigation();
setCurrentYear();
setLastModified();


document.addEventListener("DOMContentLoaded", function () {
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    // Getting form details
    const getFormInfo = new URLSearchParams(window.location.search);

    const resultsDiv = document.querySelector('#results');
    if (resultsDiv) {
        resultsDiv.innerHTML = `
            <p>${getFormInfo.get('first')} ${getFormInfo.get('last')}</p>
            <p>${getFormInfo.get('email')}</p>
            <p>${getFormInfo.get('phone')}</p>
            <p>${getFormInfo.get('organization')}</p>
            <p>${getFormInfo.get('timestamp')}</p>
        `;
    }

   
});



// Cards and modal sections
document.addEventListener("DOMContentLoaded", () => {
  const membershipLevels = [
    {
      level: "Non-Profit Membership",
      benefits: [
        "Discounted membership rate",
        "Promotional opportunities for causes",
        "Free access to non-profit webinars",
        "Networking with other non-profits"
      ]
    },
    {
      level: "Bronze Membership",
      benefits: [
        "Access to basic events",
        "Monthly newsletter",
        "Community forum participation"
      ]
    },
    {
      level: "Silver Membership",
      benefits: [
        "All Bronze benefits",
        "Free entry to selected events",
        "Discounted training programs"
      ]
    },
    {
      level: "Gold Membership",
      benefits: [
        "All Silver benefits",
        "Featured advertising slots",
        "Invitations to premium events",
        "Priority support"
      ]
    }
  ];

  const cardsContainer = document.querySelector('.membership-cards');
  const dialog = document.getElementById('benefitsDialog');
  const dialogTitle = document.getElementById('dialogTitle');
  const dialogBenefits = document.getElementById('dialogBenefits');
  const closeBtn = document.getElementById('closeDialog');

  if (cardsContainer) {
    membershipLevels.forEach((member, index) => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <h2>${member.level}</h2>
        <button data-index="${index}" class="learn-more-btn">Learn More</button>
      `;

      cardsContainer.appendChild(card);
    });

    cardsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('learn-more-btn')) {
        const index = e.target.getAttribute('data-index');
        const member = membershipLevels[index];

        dialogTitle.textContent = member.level;
        dialogBenefits.innerHTML = member.benefits.map(b => `<li>${b}</li>`).join('');
        dialog.showModal();
      }
    });

    closeBtn.addEventListener('click', () => dialog.close());
  }
});

