/*!
 * Velia — bulle « devis instantané » à embarquer sur n'importe quel site.
 *
 * Intégration (1 ligne, à coller avant </body>) :
 *   <script src="https://velia-digitalcom.vercel.app/embed.js?c=epcc" defer></script>
 *
 * Le paramètre ?c=<slug> identifie le client (voir src/lib/artisanConfigs.ts).
 * Aucune dépendance, aucune modification du site hôte : la bulle se crée seule.
 */
(function () {
  "use strict";

  // --- Origine + slug client, lus depuis la balise <script> elle-même --------
  var self = document.currentScript;
  var src = self && self.src ? self.src : "";
  var origin;
  try {
    origin = new URL(src).origin;
  } catch (e) {
    origin = "https://velia-digitalcom.vercel.app";
  }
  var slug =
    (self && self.getAttribute("data-client")) ||
    (function () {
      try {
        return new URL(src).searchParams.get("c");
      } catch (e) {
        return null;
      }
    })() ||
    "demo";

  if (window.__veliaDevisLoaded) return;
  window.__veliaDevisLoaded = true;

  var ACCENT = "linear-gradient(135deg,#2b6bff,#7c5cff)";
  var open = false;

  // --- Bouton flottant -------------------------------------------------------
  var btn = document.createElement("button");
  btn.type = "button";
  btn.setAttribute("aria-label", "Demander mon devis gratuit");
  btn.style.cssText = [
    "position:fixed", "z-index:2147483000", "right:20px", "bottom:20px",
    "display:inline-flex", "align-items:center", "gap:8px",
    "padding:14px 20px", "border:0", "border-radius:999px", "cursor:pointer",
    "font:600 15px/1 system-ui,-apple-system,Segoe UI,Roboto,sans-serif",
    "color:#fff", "background:" + ACCENT,
    "box-shadow:0 18px 40px -12px rgba(43,107,255,.6)",
    "transition:transform .15s ease",
  ].join(";");
  btn.innerHTML =
    '<span style="font-size:18px;line-height:1">💬</span>' +
    '<span class="velia-lbl">Demander mon devis gratuit</span>';
  btn.onmouseenter = function () { btn.style.transform = "translateY(-2px)"; };
  btn.onmouseleave = function () { btn.style.transform = "none"; };

  // --- Panneau + iframe ------------------------------------------------------
  var panel = document.createElement("div");
  panel.style.cssText = [
    "position:fixed", "z-index:2147483000", "right:20px", "bottom:88px",
    "width:min(420px,calc(100vw - 32px))", "height:min(640px,calc(100vh - 120px))",
    "border:0", "border-radius:20px", "overflow:hidden", "background:transparent",
    "box-shadow:0 40px 90px -30px rgba(20,20,60,.55)",
    "opacity:0", "transform:translateY(12px) scale(.98)", "pointer-events:none",
    "transition:opacity .2s ease,transform .2s ease",
  ].join(";");

  var iframe = document.createElement("iframe");
  iframe.title = "Assistant devis";
  iframe.loading = "lazy";
  iframe.setAttribute("allowtransparency", "true");
  iframe.style.cssText = "width:100%;height:100%;border:0;background:transparent";
  // L'iframe n'est chargée qu'à la première ouverture (perf).
  var loaded = false;
  panel.appendChild(iframe);

  function setOpen(v) {
    open = v;
    if (open && !loaded) {
      iframe.src = origin + "/embed/" + encodeURIComponent(slug);
      loaded = true;
    }
    panel.style.opacity = open ? "1" : "0";
    panel.style.transform = open ? "translateY(0) scale(1)" : "translateY(12px) scale(.98)";
    panel.style.pointerEvents = open ? "auto" : "none";
    btn.querySelector(".velia-lbl").textContent = open
      ? "Fermer"
      : "Demander mon devis gratuit";
  }

  btn.addEventListener("click", function () { setOpen(!open); });

  function mount() {
    document.body.appendChild(panel);
    document.body.appendChild(btn);
  }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
