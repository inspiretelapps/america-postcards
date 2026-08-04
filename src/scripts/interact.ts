const photos = [...document.querySelectorAll<HTMLButtonElement>("[data-lightbox]")]
  .map((button) => ({
    src: button.dataset.lightbox || "",
    alt: button.querySelector("img")?.alt || "",
    caption: button.dataset.caption || "",
  }))
  .filter((photo, position, all) => all.findIndex((candidate) => candidate.src === photo.src) === position);

let index = 0;
const box = document.querySelector<HTMLElement>(".lightbox");
const image = box?.querySelector("img");
const caption = box?.querySelector("figcaption");

function render() {
  const photo = photos[index];
  if (!photo || !image || !caption) return;
  image.src = photo.src;
  image.alt = photo.alt;
  caption.textContent = photo.caption;
}

function openAt(nextIndex: number) {
  if (!box) return;
  index = nextIndex;
  render();
  box.classList.add("open");
  box.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  box.querySelector<HTMLButtonElement>(".lightbox-close")?.focus();
}

function close() {
  if (!box) return;
  box.classList.remove("open");
  box.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function move(amount: number) {
  if (photos.length === 0) return;
  index = (index + amount + photos.length) % photos.length;
  render();
}

document.querySelectorAll<HTMLButtonElement>("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    const next = photos.findIndex((photo) => photo.src === button.dataset.lightbox);
    if (next >= 0) openAt(next);
  });
});

box?.querySelector(".lightbox-close")?.addEventListener("click", close);
box?.querySelector(".lightbox-prev")?.addEventListener("click", () => move(-1));
box?.querySelector(".lightbox-next")?.addEventListener("click", () => move(1));
box?.addEventListener("click", (event) => {
  if (event.target === box) close();
});

document.addEventListener("keydown", (event) => {
  if (!box?.classList.contains("open")) return;
  if (event.key === "Escape") close();
  if (event.key === "ArrowLeft") move(-1);
  if (event.key === "ArrowRight") move(1);
});

document.querySelectorAll<HTMLElement>(".video-moment").forEach((moment) => {
  const video = moment.querySelector<HTMLVideoElement>("[data-video-moment]");
  const play = moment.querySelector<HTMLButtonElement>(".video-moment__play");
  if (!video || !play) return;

  const start = async () => {
    video.controls = true;
    play.hidden = true;
    try {
      await video.play();
    } catch {
      // Playback can fail; native controls remain available.
    }
  };

  play.addEventListener("click", () => {
    void start();
  });

  video.addEventListener("ended", () => {
    video.controls = false;
    play.hidden = false;
  });
});
