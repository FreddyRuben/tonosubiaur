const places = [
  "Villa Tepetitán",
  "Aquiles Serdán (San Fernando)",
  "Venustiano Carranza",
  "La Ceiba",
  "Limbano Blandin",
  "Santos Degollado",
  "Ciudad Pemex",
  "Macuspana cabecera",
];

const placesList = document.getElementById("places");
places.forEach((name) => {
  const item = document.createElement("li");
  item.textContent = name;
  placesList.appendChild(item);
});

const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

links.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

const form = document.getElementById("contact-form");
const status = document.querySelector(".form-status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const nombre = String(data.get("nombre") || "").trim();
  const telefono = String(data.get("telefono") || "").trim();

  if (![...data.values()].every((value) => String(value).trim())) {
    status.textContent = "Completa todos los campos para continuar.";
    return;
  }

  if (!/^[0-9]{10}$/.test(telefono)) {
    status.textContent = "El teléfono debe tener exactamente 10 dígitos numéricos.";
    return;
  }

  status.textContent = "Enviando mensaje...";
  status.style.color = "var(--muted)";

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      status.textContent = `Gracias, ${nombre}. Tu mensaje ha sido enviado exitosamente.`;
      status.style.color = "var(--guinda)";
      form.reset();
    } else {
      const result = await response.json();
      status.textContent = result.error || "Hubo un error al enviar el mensaje. Por favor intenta nuevamente.";
      status.style.color = "#f44336";
    }
  } catch (error) {
    status.textContent = "Hubo un error de conexión. Por favor intenta nuevamente.";
    status.style.color = "#f44336";
  }
});

// Validación en tiempo real para que el teléfono solo acepte números
const telefonoInput = document.querySelector('input[name="telefono"]');
if (telefonoInput) {
  telefonoInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  });
}

// Fade-in animation on scroll
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const galleryImages = document.querySelectorAll('.gallery-item img');

  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      const caption = img.parentElement.querySelector('figcaption').textContent;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}
