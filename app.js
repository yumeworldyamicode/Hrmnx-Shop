/* Hrmnx Shop storefront foundation. No purchase is simulated here.
   Enable real checkout only after a trusted payment/order integration exists. */
(() => {
  "use strict";
  const config = window.HRMNX_SHOP_CONFIG || {};
  const grid = document.getElementById("product-grid");
  const status = document.getElementById("catalog-status");
  function setStatus(message) { if (status) status.textContent = message; }
  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  }
  function formatPrice(price, currency = "EUR") {
    if (price === null || price === undefined || price === "") return "";
    const amount = Number(price); if (!Number.isFinite(amount)) return "";
    try { return new Intl.NumberFormat(undefined, {style:"currency",currency}).format(amount); }
    catch { return amount.toFixed(2) + " " + currency; }
  }
  function renderProducts(products) {
    if (!grid) return;
    if (!products.length) {
      grid.innerHTML = "";
      setStatus("");
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = "<strong>The collection is being prepared.</strong><p>Official vinyl and CD editions will appear here when the catalog has been connected. No products are available to purchase yet.</p>";
      grid.appendChild(empty); return;
    }
    status?.remove();
    grid.innerHTML = products.map(product => {
      const image = product.image_url ? '<img src="' + escapeHTML(product.image_url) + '" alt="' + escapeHTML(product.name || "Release artwork") + '" loading="lazy">' : '<span class="product-placeholder">' + escapeHTML(product.artist_name || "HRMNX") + '</span>';
      const price = formatPrice(product.price, product.currency || "EUR");
      const canCheckout = Boolean(product.checkout_url && product.available !== false);
      return '<article class="product-card"><div class="product-image">' + image + '<span class="product-kind">' + escapeHTML(product.format || "Physical release") + '</span></div><div class="product-meta"><div><h3 class="product-name">' + escapeHTML(product.name || "Untitled release") + '</h3><p class="product-detail">' + escapeHTML(product.artist_name || "") + (product.edition ? " · " + escapeHTML(product.edition) : "") + '</p></div>' + (price ? '<span class="product-price">' + escapeHTML(price) + '</span>' : '') + '</div>' + (canCheckout ? '<a class="product-action" href="' + escapeHTML(product.checkout_url) + '" rel="noopener">View checkout ↗</a>' : '<span class="product-action" aria-disabled="true">Coming soon</span>') + '</article>';
    }).join("");
  }
  async function loadCatalog() {
    if (!config.supabaseUrl || !config.supabaseAnonKey || !window.supabase?.createClient) { renderProducts([]); return; }
    try {
      const client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
      let query = client.from(config.productsTable || "shop_products").select("id,name,artist_name,format,edition,price,currency,image_url,checkout_url,available").eq("is_active", true).order("sort_order", {ascending:true});
      if (config.artistSlug) query = query.eq("artist_slug", config.artistSlug);
      const {data,error} = await query; if (error) throw error; renderProducts(data || []);
    } catch (error) { console.error("Hrmnx Shop catalog could not be loaded:", error); renderProducts([]); }
  }
  // Theme properties can be supplied by Nemawashi's future theme publisher.
  window.HrmnxShop = {
    applyTheme(theme = {}) {
      const root = document.documentElement;
      const vars = {backgroundColor:"--page",textColor:"--ink",accentColor:"--accent",panelColor:"--panel",fontBody:"--font-body",fontDisplay:"--font-display"};
      for (const [key,variable] of Object.entries(vars)) if (typeof theme[key] === "string" && theme[key].trim()) root.style.setProperty(variable, theme[key]);
      if (typeof theme.backgroundImage === "string" && theme.backgroundImage.trim()) root.style.setProperty("--page-image", 'url("' + theme.backgroundImage.replace(/["\\\\]/g, "") + '")');
      if (typeof theme.backgroundGradient === "string" && theme.backgroundGradient.trim()) root.style.setProperty("--page-gradient", theme.backgroundGradient);
    }
  };
  loadCatalog();
})();