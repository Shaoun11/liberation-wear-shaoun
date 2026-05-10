const documents = [
  {
    title: "Declaration Broadcast Record",
    type: "Declaration",
    date: "26 March 1971",
    relevance: "High",
    description: "Archive entry describing the declaration and early broadcast records connected with the beginning of the Liberation War.",
    source: "Sample national archive reference"
  },
  {
    title: "Provisional Government Communication",
    type: "Correspondence",
    date: "10 April 1971",
    relevance: "High",
    description: "Correspondence connected with wartime administration, organization, and public communication.",
    source: "Sample correspondence catalog"
  },
  {
    title: "Humanitarian Situation Report",
    type: "Report",
    date: "July 1971",
    relevance: "Medium",
    description: "Summary record describing displacement, relief needs, civilian suffering, and emergency support during the war.",
    source: "Sample relief and field report collection"
  },
  {
    title: "Instrument of Surrender Reference",
    type: "Treaty",
    date: "16 December 1971",
    relevance: "High",
    description: "Reference entry for the surrender document marking victory and the end of the Liberation War.",
    source: "Sample official document index"
  },
  {
    title: "International Press Correspondence",
    type: "Correspondence",
    date: "December 1971",
    relevance: "Medium",
    description: "Catalog record for international reporting and diplomatic communication about the final days of the war.",
    source: "Sample media and diplomatic archive"
  },
  {
    title: "Refugee Camp Medical Note",
    type: "Report",
    date: "September 1971",
    relevance: "Medium",
    description: "Public health and relief note documenting medical needs in communities affected by the war.",
    source: "Sample humanitarian records"
  }
];

const interviews = [
  {
    name: "Abdul Karim",
    role: "Freedom fighter",
    summary: "Discusses training, local resistance, battlefield communication, and the emotional weight of returning home after victory.",
    media: "Audio testimony",
    file: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA="
  },
  {
    name: "Rokeya Begum",
    role: "Civilian witness",
    summary: "Shares memories of displacement, family separation, community support, and the importance of preserving civilian wartime experiences.",
    media: "Audio testimony",
    file: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA="
  },
  {
    name: "Dr. Mahmud Hasan",
    role: "Relief organizer",
    summary: "Explains emergency medical support, refugee care, document preservation, and the role of volunteers during 1971.",
    media: "Audio testimony",
    file: "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA="
  }
];

const photos = [
  {
    title: "Memorial Landscape",
    category: "Themes",
    caption: "A reflective archive image representing remembrance and national memory.",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "River Route",
    category: "Locations",
    caption: "Waterways were important routes for people, supplies, and wartime movement.",
    url: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Public Gathering",
    category: "Events",
    caption: "A representative image for rallies, public meetings, and collective action.",
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Archive Reading Room",
    category: "Themes",
    caption: "Documents require careful cataloging, verification, and long-term preservation.",
    url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Historic City Street",
    category: "Locations",
    caption: "Urban spaces hold memories of organizing, movement, and public struggle.",
    url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Victory Remembrance",
    category: "Events",
    caption: "A symbolic visual entry for victory, tribute, and national commemoration.",
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80"
  }
];

const documentList = document.querySelector("#documentList");
const documentDetail = document.querySelector("#documentDetail");
const documentButtons = document.querySelectorAll("[data-document-filter]");
const interviewList = document.querySelector("#interviewList");
const photoGallery = document.querySelector("#photoGallery");
const photoButtons = document.querySelectorAll("[data-photo-filter]");
const modal = document.querySelector("#photoModal");
const modalImage = document.querySelector("#modalImage");
const modalDownload = document.querySelector("#modalDownload");
const modalClose = document.querySelector(".modal-close");
const zoomInButton = document.querySelector("#zoomIn");
const zoomOutButton = document.querySelector("#zoomOut");
const zoomResetButton = document.querySelector("#zoomReset");
const form = document.querySelector(".contact-form");
const formStatus = document.querySelector("#formStatus");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#siteNav");
let currentZoom = 1;

function setActiveFilter(buttons, dataName, value) {
  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset[dataName] === value);
  });
}

function renderDocuments(filter = "all") {
  const filteredDocuments = filter === "all"
    ? documents
    : documents.filter((item) => item.type === filter);

  documentList.innerHTML = filteredDocuments.map((item, index) => `
    <article class="card archive-card">
      <button type="button" data-document-index="${documents.indexOf(item)}">
        <span class="card-tag">${item.type}</span>
        <strong>${item.title}</strong>
        <span class="meta">${item.date} | Relevance: ${item.relevance}</span>
      </button>
    </article>
  `).join("");

  renderDocumentDetail(documents.indexOf(filteredDocuments[0]));

  documentList.querySelectorAll("[data-document-index]").forEach((button) => {
    button.addEventListener("click", () => renderDocumentDetail(Number(button.dataset.documentIndex)));
  });
}

function renderDocumentDetail(index) {
  const item = documents[index];

  if (!item) {
    documentDetail.innerHTML = "<p>No document found for this filter.</p>";
    return;
  }

  documentDetail.innerHTML = `
    <h3>${item.title}</h3>
    <table class="detail-table">
      <tbody>
        <tr><th>Type</th><td>${item.type}</td></tr>
        <tr><th>Date</th><td>${item.date}</td></tr>
        <tr><th>Relevance</th><td>${item.relevance}</td></tr>
        <tr><th>Description</th><td>${item.description}</td></tr>
        <tr><th>Source</th><td>${item.source}</td></tr>
      </tbody>
    </table>
  `;
}

function renderInterviews() {
  interviewList.innerHTML = interviews.map((item) => `
    <article class="card interview-card">
      <span class="card-tag">${item.media}</span>
      <h3>${item.name}</h3>
      <p><strong>Bio:</strong> ${item.role}</p>
      <p>${item.summary}</p>
      <audio controls preload="none" src="${item.file}">
        Your browser does not support the audio element.
      </audio>
    </article>
  `).join("");
}

function renderPhotos(filter = "all") {
  const filteredPhotos = filter === "all"
    ? photos
    : photos.filter((item) => item.category === filter);

  photoGallery.innerHTML = filteredPhotos.map((item, index) => `
    <article class="card photo-card">
      <button class="photo-image-button" type="button" data-photo-index="${photos.indexOf(item)}" aria-label="Open full image of ${item.title}">
        <img src="${item.url}" alt="${item.title}" loading="lazy">
      </button>
      <div class="photo-card-body">
        <span class="card-tag">${item.category}</span>
        <h3>${item.title}</h3>
        <p>${item.caption}</p>
        <div class="photo-actions">
          <button type="button" data-photo-index="${photos.indexOf(item)}">Zoom</button>
          <a class="button secondary" href="${item.url}" download>Download</a>
        </div>
      </div>
    </article>
  `).join("");

  photoGallery.querySelectorAll("[data-photo-index]").forEach((button) => {
    button.addEventListener("click", () => openPhoto(Number(button.dataset.photoIndex)));
  });
}

function openPhoto(index) {
  const item = photos[index];
  currentZoom = 1;
  modalImage.src = item.url;
  modalImage.alt = item.title;
  modalDownload.href = item.url;
  modalDownload.setAttribute("download", `${item.title.toLowerCase().replaceAll(" ", "-")}.jpg`);
  updateZoom();
  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function closePhoto() {
  modal.hidden = true;
  modalImage.src = "";
  document.body.classList.remove("modal-open");
}

function updateZoom() {
  modalImage.style.width = `${currentZoom * 100}%`;
  modalImage.style.maxWidth = currentZoom > 1 ? "none" : "900px";
}

function zoomPhoto(amount) {
  currentZoom = Math.min(3, Math.max(0.5, currentZoom + amount));
  updateZoom();
}

documentButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.documentFilter;
    setActiveFilter(documentButtons, "documentFilter", filter);
    renderDocuments(filter);
  });
});

photoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.photoFilter;
    setActiveFilter(photoButtons, "photoFilter", filter);
    renderPhotos(filter);
  });
});

modalClose.addEventListener("click", closePhoto);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closePhoto();
  }
});

zoomInButton.addEventListener("click", () => zoomPhoto(0.25));
zoomOutButton.addEventListener("click", () => zoomPhoto(-0.25));
zoomResetButton.addEventListener("click", () => {
  currentZoom = 1;
  updateZoom();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closePhoto();
  }

  if (event.key === "+" && !modal.hidden) {
    zoomPhoto(0.25);
  }

  if (event.key === "-" && !modal.hidden) {
    zoomPhoto(-0.25);
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    formStatus.textContent = "Please complete all required fields with a valid email address.";
    form.reportValidity();
    return;
  }

  formStatus.textContent = "Thank you. Your message has been recorded for archive review.";
  form.reset();
});

renderDocuments();
renderInterviews();
renderPhotos();
