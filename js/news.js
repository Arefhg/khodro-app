// news.js – News box on Home, from data/news.json.
/* =========================================================
   News: data/news.json — the copy inside the app first (works offline),
   then the fresh copy from GitHub Pages (the news bot can update it, no app update needed)
   ========================================================= */
const NEWS_URLS = ["data/news.json", "https://arefhg.github.io/khodro-app/data/news.json"];
const NEWS_STYLE = { news: ["#F59E0B", "news", ""], pdf: ["#8E5CF7", "list", "PDF"], guide: ["#0A84FF", "shield", ""] };
let NEWS_DATA = null;
try { NEWS_DATA = JSON.parse(localStorage.getItem("ki_news")); } catch (e) {}
function newsHTML(){
  const items = (NEWS_DATA && NEWS_DATA.items) || [];
  if (!items.length) return `<div style="padding:16px;color:var(--label2)">${tr("خبرها در حال بارگذاری…")}</div>`;
  const L = I18N.lang, url = (NEWS_DATA.channel || "https://t.me/khodro_italy").replace(/\/$/, "");
  return items.slice(0, 3).map((n) => {
    const [c, ic, tag] = NEWS_STYLE[n.kind] || NEWS_STYLE.news;
    const title = esc((n.title && (n.title[L] || n.title.fa)) || ""), tags = esc((n.tags && (n.tags[L] || n.tags.fa)) || "");
    return `<a class="n" href="${url}/${Number(n.id)}" target="_blank" rel="noopener">
      <div class="thumb" style="background:${c}">${I[ic].replace('<svg','<svg width="28" height="28"')}</div>
      <div><div class="src"><i></i>${tr("کانال خودرو ایتالیا")}${tag ? ` <span class="badge soon">${tag}</span>` : ""}</div><b>${title}</b><div class="tags">${tags}</div></div></a>`;
  }).join("");
}
async function loadNews(){
  for (const u of NEWS_URLS) {
    try {
      const r = await fetch(u, { cache: "no-cache" }); if (!r.ok) continue;
      const d = await r.json(); if (!d || !Array.isArray(d.items)) continue;
      if (!NEWS_DATA || (d.updated || "") >= (NEWS_DATA.updated || "")) {
        NEWS_DATA = d; try { localStorage.setItem("ki_news", JSON.stringify(d)); } catch (e) {}
        const box = document.getElementById("newsbox"); if (box) box.innerHTML = newsHTML();
      }
    } catch (e) { /* offline: keep what we have */ }
  }
}

