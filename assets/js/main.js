// =============================================
// Gourmet Go Mejoras v2:
// =============================================

// ── ENDPOINTS ──────────────────────────────
const FILTER_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
const SUGGEST_URL = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

// ── DICCIONARIO ES → EN ─────────────────────
const ING_ES_EN = {
  // Proteínas
  pollo: "chicken",
  gallina: "chicken",
  carne: "beef",
  vacuno: "beef",
  res: "beef",
  cerdo: "pork",
  chancho: "pork",
  jamon: "ham",
  tocino: "bacon",
  pescado: "fish",
  salmon: "salmon",
  atun: "tuna",
  camaron: "prawns",
  camarones: "prawns",
  cordero: "lamb",
  pavo: "turkey",
  // Carbohidratos
  arroz: "rice",
  pasta: "pasta",
  fideos: "pasta",
  tallarines: "pasta",
  pan: "bread",
  papa: "potato",
  papas: "potato",
  // Lácteos
  queso: "cheese",
  leche: "milk",
  crema: "cream",
  mantequilla: "butter",
  yogur: "yogurt",
  // Verduras / aromáticos
  tomate: "tomato",
  tomates: "tomato",
  cebolla: "onion",
  ajo: "garlic",
  zanahoria: "carrot",
  pimiento: "pepper",
  champinon: "mushroom",
  champinones: "mushroom",
  palta: "avocado",
  aguacate: "avocado",
  limon: "lemon",
  limon: "lemon",
  perejil: "parsley",
  albahaca: "basil",
  cilantro: "coriander",
  espinaca: "spinach",
  brocoli: "broccoli",
  // Otros
  aceite: "oil",
  azucar: "sugar",
  harina: "flour",
  sal: "salt",
  pimienta: "pepper",
  chocolate: "chocolate",
  huevo: "egg",
  huevos: "egg",
};

// ── UTILIDADES ──────────────────────────────

/** Quita tildes y pasa a minúscula */
const normalizar = (t) =>
  t
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/** Traduce ES→EN o devuelve el texto original */
const traducirIngrediente = (entrada) => {
  const n = normalizar(entrada);
  return ING_ES_EN[n] || n;
};

/** Escapa caracteres peligrosos para insertar en HTML */
const escapeHTML = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Debounce genérico */
const debounce = (fn, ms) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};

// ── CLASE Receta ────────────────────────────
class Receta {
  constructor({ idMeal, strMeal, strMealThumb }) {
    this.id = idMeal;
    this.nombre = strMeal;
    this.imagen = strMealThumb;
  }

  toCardHTML(delay = 0) {
    const nombre = escapeHTML(this.nombre);
    const imagen = escapeHTML(this.imagen);
    const link = `https://www.themealdb.com/meal/${escapeHTML(this.id)}`;

    return `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card recipe-card h-100 card-anim" style="animation-delay:${delay}ms">
          <div class="card-img-wrap">
            <img src="${imagen}" class="card-img-top" alt="${nombre}" loading="lazy" />
          </div>
          <div class="card-body d-flex flex-column">
            <span class="card-badge">TheMealDB</span>
            <h5 class="card-title">${nombre}</h5>
            <p class="card-desc">Receta obtenida desde TheMealDB según el ingrediente buscado.</p>
            <a href="${link}" target="_blank" rel="noopener noreferrer" class="btn-card mt-auto">
              Ver receta
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5l6 6m0 0l-6 6m6-6H4.5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

// ── DOM READY ───────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");
  const resultsRow = document.getElementById("resultsRow");
  const countEl = document.getElementById("results-count");
  const datalist = document.getElementById("ingredientsList");
  const navbar = document.getElementById("navbar");
  const secRecetas = document.getElementById("recetas");

  // AbortController para cancelar fetches pendientes
  let abortCtrl = null;

  // ── Navbar sticky on scroll ──────────────
  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 60);
    },
    { passive: true },
  );

  // ── Autocompletado con debounce ──────────
  const cargarSugerencias = debounce(async () => {
    try {
      const res = await fetch(SUGGEST_URL);
      if (!res.ok) return;
      const data = await res.json();
      if (!data.meals) return;
      datalist.innerHTML = data.meals
        .map((m) => `<option value="${escapeHTML(m.strIngredient)}">`)
        .join("");
    } catch {
      // Silencioso — el autocompletado es opcional
    }
  }, 300);

  cargarSugerencias();

  // ── Helpers UI ───────────────────────────
  const setCount = (n) => {
    if (n === null) {
      countEl.textContent = "";
      return;
    }
    countEl.textContent = `${n} receta${n !== 1 ? "s" : ""} encontrada${n !== 1 ? "s" : ""}`;
  };

  const renderSkeletons = (n = 6) => {
    resultsRow.innerHTML = Array.from(
      { length: n },
      () => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="skeleton">
          <div class="skeleton-img"></div>
          <div class="skeleton-body">
            <div class="skeleton-line short"></div>
            <div class="skeleton-line mid"></div>
            <div class="skeleton-line long"></div>
            <div class="skeleton-line long" style="margin-bottom:1.2rem"></div>
            <div class="skeleton-btn"></div>
          </div>
        </div>
      </div>`,
    ).join("");
    setCount(null);
  };

  const renderMensaje = (html) => {
    resultsRow.innerHTML = `
      <div class="col-12">
        <div class="alert-gourmet">${html}</div>
      </div>`;
    setCount(null);
  };

  const renderRecetas = (recetas) => {
    resultsRow.innerHTML = recetas.map((r, i) => r.toCardHTML(i * 50)).join("");
    setCount(recetas.length);
  };

  // ── Submit ───────────────────────────────
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const textoUsuario = input.value.trim();
    if (!textoUsuario) {
      renderMensaje("Escribe un ingrediente para buscar.");
      return;
    }

    const ingrediente = traducirIngrediente(textoUsuario);

    // Cancelar fetch anterior si aún está pendiente
    if (abortCtrl) abortCtrl.abort();
    abortCtrl = new AbortController();

    renderSkeletons();

    try {
      const url = `${FILTER_URL}${encodeURIComponent(ingrediente)}`;
      const response = await fetch(url, { signal: abortCtrl.signal });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (!data.meals) {
        renderMensaje(
          `Sin resultados para <strong>"${escapeHTML(textoUsuario)}"</strong>. Intenta con otro ingrediente.`,
        );
        return;
      }

      const recetas = data.meals.map(
        ({ idMeal, strMeal, strMealThumb }) =>
          new Receta({ idMeal, strMeal, strMealThumb }),
      );

      renderRecetas(recetas);
      secRecetas.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } catch (err) {
      if (err.name === "AbortError") return; // fetch cancelado, ignorar
      console.error("[GourmetGo]", err);
      renderMensaje(
        "Error al conectar con la API. Revisa tu conexión e inténtalo nuevamente.",
      );
    }
  });
});
