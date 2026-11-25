// insurance.js – Insurance price estimate (official IVASS data) and the quote engine.
/* ===== Insurance price model — built only from official IVASS data =====
   Source: IVASS, IPER survey, II quarter 2026 (prices really paid on new RC contracts, taxes included).
   1) AGE_BM: average price by age band × bonus-malus group (national, IVASS table A13)
   2) PROV:  each province's average and its 25th / 75th percentile (IVASS table A12)
   3) inside a bonus-malus group, a real insurer's class coefficients (Allianz BM table) spread the price by class
   price ≈ AGE_BM[age][group] × (province average ÷ national average) × class adjustment
   range = price × (province p25 ÷ average) … price × (province p75 ÷ average)  → "half of people like you pay between" */
const IPER = {
  date: tr("سه‌ماهه‌ی دوم ۲۰۲۶"),
  nat: { car:421.5, moto:321 },
  ages: { car:[tr("تا ۲۴"),tr("۲۵ تا ۳۴"),tr("۳۵ تا ۴۴"),tr("۴۵ تا ۵۹"),tr("۶۰ به بالا")], moto:[tr("تا ۲۵"),tr("۲۶ تا ۳۹"),tr("۴۰ تا ۴۹"),tr("۵۰ تا ۵۹"),tr("۶۰ تا ۶۹"),tr("۷۰ به بالا")] },
  // [CU 1, CU 2–3, CU 4–10, CU 11–18]
  ageBM: { car:[[808,1046,1129,1460],[487,694,637,936],[373,544,541,847],[383,574,607,888],[369,567,648,842]],
           moto:[[635,702,730,1026],[407,407,360,576],[327,308,293,450],[305,309,285,413],[264,270,257,351],[244,257,240,341]] },
  prov: { car: parseProv("Agrigento:351,239,307,410;Alessandria:374,255,326,432;Ancona:440,303,390,510;Arezzo:383,269,343,447;Ascoli Piceno:388,275,350,449;Asti:365,245,319,425;Avellino:381,252,336,454;Bari:411,275,363,485;Barletta-Andria-Trani:425,287,377,501;Belluno:358,258,320,412;Benevento:385,270,342,452;Bergamo:385,260,339,450;Biella:341,231,300,398;Bologna:441,291,389,519;Bolzano:389,277,353,451;Brescia:394,266,347,461;Brindisi:422,284,370,493;Cagliari:421,278,364,489;Caltanissetta:379,248,327,447;Campobasso:331,230,294,387;Caserta:534,358,472,629;Catania:435,286,379,510;Catanzaro:368,241,323,436;Chieti:362,251,323,422;Como:412,279,367,484;Cosenza:348,236,306,412;Cremona:375,255,329,432;Crotone:431,268,362,510;Cuneo:358,254,318,411;Enna:312,209,271,365;Fermo:417,298,378,484;Ferrara:391,269,348,457;Firenze:507,348,452,594;Foggia:453,295,392,535;Forli-Cesena:399,274,355,467;Frosinone:402,272,355,469;Genova:484,316,419,567;Gorizia:344,233,298,393;Grosseto:409,275,359,479;Imperia:388,262,343,455;Isernia:353,249,314,411;L'Aquila:375,258,332,433;La Spezia:464,315,407,535;Latina:473,315,416,556;Lecce:376,257,331,440;Lecco:386,263,343,451;Livorno:451,304,394,530;Lodi:380,256,337,443;Lucca:497,342,441,580;Macerata:425,297,380,492;Mantova:364,248,319,422;Massa-Carrara:517,352,456,606;Matera:356,242,316,412;Messina:416,273,368,492;Milano:412,265,356,486;Modena:423,285,376,500;Monza e della Brianza:402,267,354,474;Napoli:596,412,534,703;Novara:359,240,312,414;Nuoro:377,253,332,443;Oristano:316,221,280,365;Padova:409,281,366,480;Palermo:417,275,361,489;Parma:408,278,363,478;Pavia:392,261,343,456;Perugia:411,287,366,476;Pesaro e Urbino:405,285,363,470;Pescara:413,278,367,486;Piacenza:404,273,359,475;Pisa:486,334,430,569;Pistoia:514,357,461,599;Pordenone:334,233,296,388;Potenza:310,213,273,360;Prato:591,407,527,691;Ragusa:402,264,342,464;Ravenna:427,293,383,501;Reggio Calabria:415,271,370,498;Reggio nell'Emilia:417,285,371,490;Rieti:445,306,395,522;Rimini:429,292,380,502;Roma:505,322,434,598;Rovigo:370,258,328,424;Salerno:444,299,393,520;Sassari:395,258,344,462;Savona:377,257,339,443;Siena:372,259,332,433;Siracusa:400,263,343,464;Sondrio:365,259,329,422;Taranto:415,275,362,486;Teramo:381,267,345,448;Terni:415,285,367,486;Torino:454,297,395,534;Trapani:375,255,330,438;Trento:348,245,310,400;Treviso:411,286,369,479;Trieste:363,242,319,425;Udine:344,243,308,399;Valle d'Aosta:340,236,300,394;Varese:397,267,353,469;Venezia:425,291,380,495;Verbano-Cusio-Ossola:348,243,313,406;Vercelli:343,234,299,393;Verona:387,267,346,451;Vibo Valentia:410,266,364,491;Vicenza:389,269,347,451;Viterbo:378,261,335,440", "196,680 202,741 240,838 214,707 217,705 196,721 200,743 215,797 225,822 209,662 216,710 202,745 182,664 224,861 216,734 207,771 221,824 223,844 194,780 182,621 278,1049 223,875 187,721 200,679 213,797 182,681 201,722 208,911 204,666 156,624 230,765 210,747 272,964 227,920 213,764 213,780 244,991 189,677 219,803 203,748 199,655 207,722 249,916 239,937 203,720 206,735 242,878 199,741 271,956 233,800 197,710 276,991 193,682 210,821 202,843 218,816 204,792 314,1136 192,709 206,734 177,601 218,776 217,835 219,781 204,776 228,774 222,759 216,799 213,780 262,936 284,964 187,629 169,594 324,1132 213,809 225,812 205,817 220,792 239,848 224,825 244,1048 206,713 233,864 204,794 203,704 209,692 209,803 205,670 215,824 208,704 223,794 229,913 204,727 196,659 225,773 190,708 194,641 194,653 204,768 224,806 193,638 189,659 209,731 199,807 212,736 209,712"), moto: parseProv("Agrigento:285,170,243,352;Alessandria:247,153,215,302;Ancona:266,165,235,329;Arezzo:238,149,209,290;Ascoli Piceno:272,170,240,336;Asti:237,152,205,290;Avellino:427,224,370,560;Bari:412,220,350,522;Barletta-Andria-Trani:431,234,371,559;Belluno:208,137,190,260;Benevento:383,210,321,490;Bergamo:264,156,225,329;Biella:215,140,191,265;Bologna:280,160,236,346;Bolzano:215,142,189,260;Brescia:264,156,230,328;Brindisi:373,189,316,488;Cagliari:299,169,243,366;Caltanissetta:340,184,280,431;Campobasso:278,163,244,350;Caserta:517,262,444,699;Catania:447,244,372,560;Catanzaro:310,166,260,397;Chieti:274,167,240,344;Como:294,180,261,365;Cosenza:383,213,330,490;Cremona:243,152,210,295;Crotone:406,201,326,550;Cuneo:229,152,206,277;Enna:274,159,230,340;Fermo:269,174,235,324;Ferrara:247,152,210,304;Firenze:331,199,289,400;Foggia:460,240,396,598;Forli-Cesena:243,154,211,299;Frosinone:313,170,262,400;Gallura Nord-Est Sardegna:305,181,260,379;Genova:346,219,301,419;Gorizia:224,142,193,272;Grosseto:236,152,204,285;Imperia:267,176,238,318;Isernia:330,211,291,412;L'Aquila:297,160,254,380;La Spezia:296,190,258,353;Latina:378,213,325,478;Lecce:297,175,255,370;Lecco:263,157,227,324;Livorno:297,186,259,358;Lodi:273,155,235,340;Lucca:276,174,243,338;Macerata:260,162,230,320;Mantova:242,149,213,302;Massa-Carrara:288,182,251,345;Matera:284,174,246,358;Medio Campidano:239,151,207,282;Messina:402,227,344,504;Milano:302,170,248,371;Modena:281,160,241,353;Monza e della Brianza:293,169,246,368;Napoli:616,344,522,785;Novara:247,152,211,299;Nuoro:274,156,236,349;Ogliastra:271,157,226,336;Oristano:240,152,200,285;Padova:261,153,226,324;Palermo:398,219,329,490;Parma:262,159,232,328;Pavia:251,153,215,305;Perugia:241,151,209,291;Pesaro e Urbino:237,158,210,284;Pescara:302,175,257,369;Piacenza:246,152,210,302;Pisa:270,162,227,328;Pistoia:300,178,263,373;Pordenone:215,135,182,260;Potenza:298,175,256,380;Prato:361,232,328,447;Ragusa:291,172,250,360;Ravenna:254,157,221,310;Reggio Calabria:421,225,350,535;Reggio nell'Emilia:275,167,242,341;Rieti:304,176,270,388;Rimini:297,190,263,360;Roma:408,233,344,494;Rovigo:224,145,194,272;Salerno:504,287,428,632;Sassari:261,160,222,320;Savona:245,158,214,291;Siena:214,137,189,264;Siracusa:345,194,284,421;Sondrio:219,148,194,265;Sulcis Iglesiente:238,151,199,287;Taranto:391,197,328,502;Teramo:280,175,247,342;Terni:241,151,210,298;Torino:259,152,220,319;Trapani:309,177,257,390;Trento:234,150,211,290;Treviso:241,148,212,300;Trieste:257,152,212,310;Udine:211,137,184,259;Valle d'Aosta:235,148,208,287;Varese:276,164,238,342;Venezia:260,151,225,326;Verbano-Cusio-Ossola:226,150,202,276;Vercelli:228,146,197,274;Verona:255,155,224,315;Vibo Valentia:351,190,297,457;Vicenza:245,149,213,308;Viterbo:253,155,220,308", "129,600 110,497 121,543 112,484 123,560 116,470 147,954 147,946 155,949 95,406 145,857 118,560 99,428 111,628 108,409 119,551 128,860 126,680 132,764 114,566 153,1167 170,1020 114,707 123,576 136,603 144,833 115,496 136,931 119,434 110,605 126,553 107,514 149,698 149,1049 114,500 115,708 140,640 161,704 100,460 122,479 141,521 146,645 112,659 146,607 142,844 126,638 116,552 146,600 102,606 133,551 123,518 99,506 140,580 135,582 120,501 155,891 124,682 112,605 118,636 219,1394 109,521 115,590 118,578 119,477 106,557 159,911 108,529 110,524 111,497 128,453 129,655 106,502 131,571 141,621 96,452 130,630 158,719 140,608 119,513 149,976 123,571 124,624 140,596 162,931 102,458 185,1159 119,549 130,484 98,430 146,765 121,412 112,517 131,910 130,561 111,492 107,557 127,665 112,448 100,492 118,570 96,418 112,480 113,581 99,572 110,427 107,463 119,520 121,803 105,507 116,510") },
};
// t: "name:mean,p25,p50,p75;…"   tail: "p10,p95 …" in the same order (IVASS table A12)
function parseProv(t, tail){ const o = {}, tl = tail.split(" "); t.split(";").forEach((p, i) => { const [n, v] = p.split(":"); const [mean,p25,p50,p75] = v.split(",").map(Number); const [p10,p95] = tl[i].split(",").map(Number);
  // p90 is not published: read it between p75 and p95 on a log scale (normal-curve positions 0.674 → 1.282 → 1.645)
  const p90 = Math.exp(Math.log(p75) + (1.2816-0.6745)/(1.6449-0.6745) * (Math.log(p95) - Math.log(p75)));
  o[n] = { mean,p10,p25,p50,p75,p90,p95 }; }); return o; }
const BM_COEF = [0,1.030,1.106,1.140,1.175,1.211,1.248,1.287,1.327,1.368,1.410,1.454,1.499,1.545,1.720,2.000,3.100,3.500,4.000]; // Allianz, real policy document
/* Years of patente (licence) — IVASS does not publish this split, so we add our own factor.
   Why it depends on age: in IVASS's class 11–18 group, young riders/drivers are mostly real beginners,
   but for 26+ the group is full of experienced people who just start again in class 14 (new vehicle,
   no family class). So a beginner aged 26+ pays far more than that group's average; a beginner aged
   ≤24/25 pays about the group average.
   Calibration:
   - moto 26+: real contract data (rider 30, Caserta, 125cc, RC only): yr1 €1,890, yr2 €1,316/yr → ×2.04, ×1.58
   - car 26+: published beginner prices in class 14 (Facile.it 1,000–1,200; sum.money 1,000–2,000; ticalcolo 1,500–3,000)
     vs IVASS 25–34 group €936 → middle ≈ ×1.4
   - youngest band: ×1 (checked: Bari agency €1,420, Segugio simulation €1,470, IVASS ≤24 group €1,460)
   Year 3 sits between; after 3 years the factor is gone ("neopatentato" = licence under 3 years). */
const LIC = { moto:[2.04, 1.58, 1.25, 1], car:[1.40, 1.25, 1.10, 1] };
const licFactor = (kind, age, lic) => age === 0 ? 1 : (LIC[kind][lic] ?? 1);
const LIC_LABELS = [tr("سال اول"), tr("سال دوم"), tr("سال سوم"), tr("۳ سال به بالا")];
const REAL_SEED = [
  { kind:"moto", prov:"Caserta", age:1, cu:14, lic:0, paid:1890, note:tr("اسکوتر ۱۲۵، فقط RC، استفاده‌ی شخصی"), seed:true },
  { kind:"car", prov:"Bari", age:0, cu:14, lic:0, paid:1420, note:tr("فیات پاندا، تازه‌کار — عدد منتشرشده‌ی یه آژانس آلیانز در باری"), seed:"pub" },
  { kind:"car", prov:"—", age:0, cu:14, lic:0, paid:1470, note:tr("تازه‌کار، بدون تخفیف — شبیه‌سازی منتشرشده‌ی Segugio (کل ایتالیا)"), seed:"pub" },
  { kind:"moto", prov:"—", age:0, cu:14, lic:0, paid:1150, note:tr("موتور، تازه‌کار ۱۸ ساله — میانگین منتشرشده (کل ایتالیا)"), seed:"pub" },
  { kind:"moto", prov:"Caserta", age:1, cu:13, lic:1, paid:1316, note:tr("همون اسکوتر، سال دوم — ۱۵۷۹ € قسطی ماهانه = ۱۳۱۶ € سالانه"), seed:true },
];
function insEstimate(kind, prov, ageIdx, cu, lic = 3){
  const g = cu === 1 ? 0 : cu <= 3 ? 1 : cu <= 10 ? 2 : 3;
  const ref = [1, 2.5, 7, 14][g];
  const refCoef = g === 1 ? (BM_COEF[2] + BM_COEF[3]) / 2 : BM_COEF[ref];
  const adj = g === 0 ? 1 : BM_COEF[cu] / refCoef;
  const nat = IPER.nat[kind], P = IPER.prov[kind][prov] || { mean:nat, p10:nat*.5, p25:nat*.68, p50:nat*.9, p75:nat*1.18, p90:nat*1.6 };
  const pIdx = P.mean / IPER.nat[kind];
  const base = IPER.ageBM[kind][Math.min(ageIdx, IPER.ageBM[kind].length-1)][g];
  const lf = licFactor(kind, ageIdx, lic);
  const est = base * pIdx * adj * lf;
  // same shape as the province's real price spread, moved to this profile's level
  const k = est / P.mean;
  return { est, typ: P.p50 * k, low: P.p25 * k, high: P.p75 * k, lo80: P.p10 * k, hi80: P.p90 * k, base, pIdx, adj, lf, provMean:P.mean, g };
}

/* ===== Quote engine (insurer-style: one multiplier per answer) =====
   core  = insEstimate(): IVASS province × age × class (+ new-licence factor)  [official / calibrated]
   then  × claims history × vehicle power × km × parking × use × guide × black box × limit × payment
   tag: "o" = official/real contract data · "e" = our estimate, to be learned from real contracts */
const QF = {
  claims: { label:tr("تصادف مقصر (۵ سال اخیر)"), opts:[[tr("نداشتم"),1,"o"],[tr("۱ بار، پارسال"),1.94,"o"],[tr("۱ بار، قبل‌تر"),1.25,"e"],[tr("۲ بار یا بیشتر"),2.6,"e"]] },
  power: { car:[[tr("تا ۵۰ کیلووات"),0.92],[tr("۵۱ تا ۷۵"),1],[tr("۷۶ تا ۱۰۰"),1.1],[tr("۱۰۱ تا ۱۵۰"),1.27],[tr("بیشتر از ۱۵۰"),1.5]],
           moto:[[tr("تا ۱۲۵ سی‌سی"),1],[tr("۱۲۶ تا ۳۰۰"),0.95],[tr("۳۰۱ تا ۶۰۰"),1],[tr("۶۰۱ تا ۹۰۰"),1.15],[tr("بیشتر از ۹۰۰"),1.3]] },
  km: [[tr("کمتر از ۵ هزار"),0.85],[tr("۵ تا ۱۰ هزار"),0.94],[tr("۱۰ تا ۱۵ هزار"),1],[tr("۱۵ تا ۲۰ هزار"),1.1],[tr("بیشتر از ۲۰ هزار"),1.22]],
  park: [[tr("تو خیابون"),1],[tr("حیاط بسته"),0.97],[tr("پارکینگ / گاراژ"),0.93]],
  use: [[tr("فقط شخصی"),1],[tr("شخصی + رفت‌وآمد کار"),1.05],[tr("کاری (پیک، تحویل)"),1.35]],
  guide: [[tr("فقط خودم"),0.93],[tr("هر کس ۲۶ سال به بالا"),1],[tr("هر کسی (آزاد)"),1.25]],
  box: [[tr("نه"),1],[tr("آره"),0.9]],
  limit: [[tr("حداقل قانونی"),1],[tr("۱۰ میلیون"),1.04],[tr("۲۵ میلیون"),1.09]],
  pay: [[tr("یه‌جا، سالانه"),1,"o"],[tr("قسطی، ماهانه"),1.2,"o"]],
};
function quoteCalc(q){
  const age = q.kind==="car" ? (q.age<25?0:q.age<35?1:q.age<45?2:q.age<60?3:4) : (q.age<26?0:q.age<40?1:q.age<50?2:q.age<60?3:q.age<70?4:5);
  const lic = Math.min(3, Math.max(0, q.licYears));
  const core = insEstimate(q.kind, q.prov, age, q.cu, lic);
  const f = [
    [tr("استان، سن، کلاس") + (core.lf!==1?tr(" و پاتنته‌ی تازه"):""), core.est, "o", true],
    [QF.claims.label + ": " + QF.claims.opts[q.claims][0], QF.claims.opts[q.claims][1], QF.claims.opts[q.claims][2]],
    [tr("قدرت: ") + QF.power[q.kind][q.power][0], QF.power[q.kind][q.power][1], "e"],
    [tr("کیلومتر سالانه: ") + QF.km[q.km][0], QF.km[q.km][1], "e"],
    [tr("شب کجا پارکه: ") + QF.park[q.park][0], QF.park[q.park][1], "e"],
    [tr("استفاده: ") + QF.use[q.use][0], QF.use[q.use][1], "e"],
    [tr("کی می‌رونه: ") + QF.guide[q.guide][0], QF.guide[q.guide][1], "e"],
    [tr("جعبه سیاه: ") + QF.box[q.box][0], QF.box[q.box][1], "e"],
    [tr("سقف پوشش: ") + QF.limit[q.limit][0], QF.limit[q.limit][1], "e"],
    [tr("پرداخت: ") + QF.pay[q.pay][0], QF.pay[q.pay][1], "o"],
  ];
  const mult = f.slice(1).reduce((a, x) => a * x[1], 1), total = core.est * mult, k = total / core.est;
  // more answers known → narrower spread than the whole province (×0.75 on the log scale; to be checked with contracts)
  const sh = (p) => total * Math.pow(p / core.est, 0.75);
  const taxes = 0.105 + 0.16, net = total / (1 + taxes);
  return { total, f, lo80: sh(core.lo80), hi80: sh(core.hi80), typ: sh(core.typ),
    net, ssn: net*0.105, ipt: net*0.16, commission: total*0.166, claims: net*0.668, monthly: q.pay ? total/12 : 0 };
}

