// ✅ Smooth Scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ✅ Reservation Form Validation + Auto Day + Time Slots
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const dateInput = document.getElementById('reserveDate');
  const dayInput = document.getElementById('reserveDay');
  const timeInput = document.getElementById('reserveTime');

  // Helper: generate time slots
  function generateTimes(startHour, endHour) {
    const times = [];
    for (let h = startHour; h <= endHour; h++) {
      for (let m = 0; m < 60; m += 30) {
        let hour = h;
        let ampm = "AM";
        if (hour >= 12) {
          ampm = "PM";
          if (hour > 12) hour -= 12;
        }
        if (hour === 0) hour = 12;
        const timeStr = `${hour}:${m === 0 ? "00" : m} ${ampm}`;
        times.push(timeStr);
      }
    }
    return times;
  }

  // Auto-fill Day + Time
  if (dateInput && dayInput && timeInput) {
    dateInput.addEventListener('change', () => {
      if (dateInput.value) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const selectedDate = new Date(dateInput.value + "T00:00:00");
        const dayIndex = selectedDate.getDay();
        const dayName = days[dayIndex];
        dayInput.value = dayName;

        // clear previous
        timeInput.innerHTML = '<option value="">Choose Time</option>';

        let times = [];
        if (dayIndex === 0 || dayIndex === 6) {
          times = generateTimes(9, 23);  // Sat-Sun
        } else {
          times = generateTimes(11, 22); // Mon-Fri
        }

        times.forEach(t => {
          const opt = document.createElement("option");
          opt.value = t;
          opt.textContent = t;
          timeInput.appendChild(opt);
        });
      } else {
        dayInput.value = "";
        timeInput.innerHTML = '<option value="">Choose Time</option>';
      }
    });
  }

  // Validation on submit
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const date = document.getElementById('reserveDate');
    const day = document.getElementById('reserveDay');
    const time = document.getElementById('reserveTime');

    [name, email, phone, date, day, time].forEach(f => f.classList.remove('is-invalid'));

    if (!name.value.trim()) { name.classList.add('is-invalid'); valid = false; }
    if (!/\S+@\S+\.\S+/.test(email.value)) { email.classList.add('is-invalid'); valid = false; }
    if (!/^[0-9]{10}$/.test(phone.value)) { phone.classList.add('is-invalid'); valid = false; }
    if (!date.value) { date.classList.add('is-invalid'); valid = false; }
    if (!day.value) { day.classList.add('is-invalid'); valid = false; }
    if (!time.value) { time.classList.add('is-invalid'); valid = false; }

    if (valid) {
      alert(`
        🎉 Thank you, ${name.value.trim()}!
        
        📧 Email: ${email.value.trim()}
        📱 Phone: ${phone.value.trim()}
        📅 Date: ${date.value}
        📆 Day: ${day.value}
        ⏰ Time: ${time.value}
        
        We look forward to welcoming you! 🍽
      `);
      contactForm.reset();
      dayInput.value = "";
      timeInput.innerHTML = '<option value="">Choose Time</option>';
    }
  });
}

// ✅ Gallery Modal Lightbox
const galleryModal = document.getElementById('galleryModal');
if (galleryModal) {
  galleryModal.addEventListener('show.bs.modal', event => {
    const trigger = event.relatedTarget;
    if (trigger && trigger.dataset.src) {
      galleryModal.querySelector('img').src = trigger.dataset.src;
    }
  });
}

// ✅ Review Form
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
  reviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('reviewerName').value.trim();
    const text = document.getElementById('reviewText').value.trim();
    if (name && text) {
      const newItem = document.createElement('div');
      newItem.classList.add('carousel-item');
      newItem.innerHTML = `
        <blockquote class="blockquote">
          <p>"${text}"</p>
          <footer class="blockquote-footer">${name}</footer>
        </blockquote>
      `;
      const carouselInner = document.querySelector('#testCarousel .carousel-inner');
      if (carouselInner) carouselInner.appendChild(newItem);
      alert(`
        ✅ Thank you, ${name}!

        💬 "${text}"

        We truly appreciate your feedback! 🌸
      `);
      reviewForm.reset();
    }
  });
}
