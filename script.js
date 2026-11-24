/* =========================================================
   VIDEOS DE MIGO — editá solo esta lista
   ---------------------------------------------------------
   tipo "youtube": pegá solo el ID del video.
        Ej: https://youtu.be/-p172RAAT_s  ->  id: "-p172RAAT_s"
   tipo "spline":  pegá el link público de la escena (url).
        En Spline: Export > Public URL
   Si dejás id o url vacío, se muestra "Próximamente".
   ========================================================= */
const VIDEOS = [
  {
    titulo: "Realidad virtual",
    etiqueta: "VR",
    descripcion: "Migo en un mundo virtual.",
    tipo: "youtube",
    id: "-p172RAAT_s"          // <- este es el video que pasaste; movelo al espacio que corresponda
  },
  {
    titulo: "Spline 3D",
    etiqueta: "3D interactivo",
    descripcion: "Movela con el mouse o el dedo.",
    tipo: "spline",
    url: ""                    // <- link público de Spline
  },
  {
    titulo: "Efectos de TikTok",
    etiqueta: "TikTok",
    descripcion: "Probá los efectos de Migo.",
    tipo: "youtube",
    id: ""                     // <- ID del video de YouTube
  },
  {
    titulo: "Giro 360",
    etiqueta: "360°",
    descripcion: "Mirala desde todos los ángulos.",
    tipo: "youtube",
    id: ""                     // <- ID del video de YouTube
  }
];

/* ---------- Tarjetas de video ---------- */
const grid = document.getElementById("videoGrid");

function crearIframe(src, titulo) {
  const f = document.createElement("iframe");
  f.src = src;
  f.title = titulo;
  f.loading = "lazy";
  f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
  f.allowFullscreen = true;
  return f;
}

function crearMedia(v) {
  const media = document.createElement("div");
  media.className = "video-media";

  const fuente = v.tipo === "spline" ? v.url : v.id;
  if (!fuente) {
    media.classList.add("vacio");
    media.innerHTML = "<span>Próximamente</span>";
    return media;
  }

  if (v.tipo === "youtube") {
    const img = document.createElement("img");
    img.src = "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg";
    img.alt = "Miniatura de " + v.titulo;
    img.loading = "lazy";
    media.appendChild(img);
  } else {
    media.classList.add("spline-bg");
  }

  const boton = document.createElement("button");
  boton.className = "video-play";
  boton.setAttribute("aria-label", "Reproducir: " + v.titulo);
  boton.innerHTML = '<span class="play-icon"></span>';
  boton.addEventListener("click", function () {
    const src = v.tipo === "youtube"
      ? "https://www.youtube-nocookie.com/embed/" + v.id + "?autoplay=1&rel=0"
      : v.url;
    media.innerHTML = "";
    media.appendChild(crearIframe(src, v.titulo));
  });
  media.appendChild(boton);
  return media;
}

VIDEOS.forEach(function (v) {
  const card = document.createElement("article");
  card.className = "video-card reveal";
  card.appendChild(crearMedia(v));

  const info = document.createElement("div");
  info.className = "video-info";
  const tag = document.createElement("span");
  tag.className = "video-tag";
  tag.textContent = v.etiqueta;
  const h3 = document.createElement("h3");
  h3.textContent = v.titulo;
  const p = document.createElement("p");
  p.textContent = v.descripcion;
  info.append(tag, h3, p);
  card.appendChild(info);

  grid.appendChild(card);
});

/* ---------- Aparición al hacer scroll ---------- */
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(function (el) { obs.observe(el); });
} else {
  reveals.forEach(function (el) { el.classList.add("in"); });
}

/* ---------- Encabezado: sombra al bajar + menú del celular ---------- */
const header = document.querySelector(".site-header");
window.addEventListener("scroll", function () {
  header.classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", function () {
  const abierto = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", abierto);
});
nav.querySelectorAll("a").forEach(function (a) {
  a.addEventListener("click", function () {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});
