// reminders.js – Phone reminders (store apps only).
/* =========================================================
   Reminders (only in the iOS/Android store apps)
   The phone schedules them itself, no server. The web app can't do this.
   ========================================================= */
const NATIVE = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
const LN = () => (NATIVE && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications) || null;
const REMIND_BEFORE = [14, 3, 0];   // days before the deadline
const REMIND_HOUR = 9;              // 9:00 in the morning
function reminderList(){
  const now = new Date(), list = [];
  for (const c of state.cars) for (const [k, d] of Object.entries(c.dl)) REMIND_BEFORE.forEach((before, i) => {
    const at = new Date(d); at.setDate(at.getDate() - before); at.setHours(REMIND_HOUR, 0, 0, 0);
    if (at <= now) return;
    const what = `${DL[k][0]} ${esc(c.name)}`;
    list.push({
      id: (c.id % 1000000) * 100 + Object.keys(DL).indexOf(k) * 10 + i,   // must be a 32-bit number (Android)
      title: before === 0 ? `${tr("امروز آخرین مهلت")} ${what}` : `${what}: ${FA(before)} ${tr("روز مونده")}`,
      body: `${tr("تاریخ:")} ${fmtDate(d)}`,
      schedule: { at },
    });
  });
  return list.sort((a, b) => a.schedule.at - b.schedule.at).slice(0, 60);
}
let remindTimer = null;
function syncReminders(){
  clearTimeout(remindTimer);
  remindTimer = setTimeout(async () => {
    const ln = LN(); if (!ln) return;
    try {
      const pending = await ln.getPending();
      if (pending.notifications.length) await ln.cancel({ notifications: pending.notifications.map(n => ({ id: n.id })) });
      if (!state.notify) return;
      const list = reminderList(); if (!list.length) return;
      let perm = await ln.checkPermissions();
      if (perm.display !== "granted") perm = await ln.requestPermissions();
      if (perm.display !== "granted") return;
      await ln.schedule({ notifications: list });
    } catch (e) { console.warn("reminders:", e); }
  }, 400);
}
const REMIND_TEXT = tr("۱۴ روز و ۳ روز قبل، و همون روز، ساعت ۹ صبح");

