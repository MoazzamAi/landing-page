// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('main-nav');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('shadow-lg');
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    navbar.style.padding = '0.5rem 0';
  } else {
    navbar.classList.remove('shadow-lg');
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    navbar.style.padding = '0.75rem 0';
  }
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitLoader = document.getElementById('submit-loader');

  // Show loading state
  submitBtn.disabled = true;
  submitLoader.classList.remove('hidden');
  submitText.textContent = 'جاري الإرسال...';

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch('https://central-email-service.icod.ai/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'tentalha0@gmail.com',
        subject: formData.subject,
        text: `Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}`,
        id: '67cebafbe531e4af6379337a'
      })
    });

    if (response.ok) {
      alert('تم إرسال الرسالة بنجاح!');
      e.target.reset();
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    alert('فشل إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقًا.');
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    submitLoader.classList.add('hidden');
    submitText.textContent = 'إرسال الرسالة';
  }
});

// Newsletter subscription
document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value;

  try {
    const response = await fetch('https://central-email-service.icod.ai/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'tentalha0@gmail.com',
        subject: 'Newsletter Subscription',
        text: `New newsletter subscription from: ${email}`,
        id: '67cebafbe531e4af6379337a'
      })
    });

    if (response.ok) {
      alert('تم الاشتراك في النشرة الإخبارية بنجاح!');
      e.target.reset();
    } else {
      throw new Error('Failed to subscribe');
    }
  } catch (error) {
    alert('فشل الاشتراك. يرجى المحاولة مرة أخرى لاحقًا.');
  }
});
