const scriptURL = 'https://script.google.com/macros/s/AKfycbyGCQAs0ucEh1xP7srlkAm8uwN7WsY8VYAPdJeiTXjjd2foNHLdzL_Lv36U3Fz8G7o/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})
const paymentMethodSelect = document.getElementById('payment-method');
const onlinePaymentSection = document.getElementById('online-payment');
const generatePaymentLinkButton = document.getElementById('generate-payment-link');
const paymentLinkContainer = document.getElementById('payment-link-container');

paymentMethodSelect.addEventListener('change', function() {
  if (paymentMethodSelect.value === 'online') {
    onlinePaymentSection.style.display = 'block';
  } else {
    onlinePaymentSection.style.display = 'none';
    paymentLinkContainer.textContent = ''; // Clear any existing payment link
  }
});

generatePaymentLinkButton.addEventListener('click', async function() {
  paymentLinkContainer.textContent = 'Generating payment link...';

  try {
    const response = await fetch('/generate-payment-link', {
      method: 'POST',
      // Include any necessary order details in the request body
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        paymentLinkContainer.innerHTML = `
          Click on the link below to proceed with secure online payment:
          <a href="${data.paymentLink}" target="_blank">Proceed to Payment</a>
        `;
      } else {
        // Handle error from server
        console.error('Error generating payment link:', data.error);
        paymentLinkContainer.textContent = 'An error occurred. Please try again later.';
      }
    } else {
      console.error('Error fetching payment link:', response.statusText);
      paymentLinkContainer.textContent = 'An error occurred. Please try again later.';
    }
  } catch (error) {
    console.error('Error:', error);
    paymentLinkContainer.textContent = 'An error occurred. Please try again later.';
  }
});
