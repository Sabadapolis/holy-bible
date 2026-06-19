/* ═══════════════════════════════════════════════════════
   HOLY BIBLE APP — app.js
   ═══════════════════════════════════════════════════════ */
'use strict';

// ─────────────────────────────────────────────
// BOOKS (66 entries: [name, chapters, testament])
// ─────────────────────────────────────────────
const BOOKS = [
  ['Genesis',50,'OT'],['Exodus',40,'OT'],['Leviticus',27,'OT'],
  ['Numbers',36,'OT'],['Deuteronomy',34,'OT'],['Joshua',24,'OT'],
  ['Judges',21,'OT'],['Ruth',4,'OT'],['1 Samuel',31,'OT'],
  ['2 Samuel',24,'OT'],['1 Kings',22,'OT'],['2 Kings',25,'OT'],
  ['1 Chronicles',29,'OT'],['2 Chronicles',36,'OT'],['Ezra',10,'OT'],
  ['Nehemiah',13,'OT'],['Esther',10,'OT'],['Job',42,'OT'],
  ['Psalms',150,'OT'],['Proverbs',31,'OT'],['Ecclesiastes',12,'OT'],
  ['Song of Solomon',8,'OT'],['Isaiah',66,'OT'],['Jeremiah',52,'OT'],
  ['Lamentations',5,'OT'],['Ezekiel',48,'OT'],['Daniel',12,'OT'],
  ['Hosea',14,'OT'],['Joel',3,'OT'],['Amos',9,'OT'],
  ['Obadiah',1,'OT'],['Jonah',4,'OT'],['Micah',7,'OT'],
  ['Nahum',3,'OT'],['Habakkuk',3,'OT'],['Zephaniah',3,'OT'],
  ['Haggai',2,'OT'],['Zechariah',14,'OT'],['Malachi',4,'OT'],
  ['Matthew',28,'NT'],['Mark',16,'NT'],['Luke',24,'NT'],
  ['John',21,'NT'],['Acts',28,'NT'],['Romans',16,'NT'],
  ['1 Corinthians',16,'NT'],['2 Corinthians',13,'NT'],['Galatians',6,'NT'],
  ['Ephesians',6,'NT'],['Philippians',4,'NT'],['Colossians',4,'NT'],
  ['1 Thessalonians',5,'NT'],['2 Thessalonians',3,'NT'],['1 Timothy',6,'NT'],
  ['2 Timothy',4,'NT'],['Titus',3,'NT'],['Philemon',1,'NT'],
  ['Hebrews',13,'NT'],['James',5,'NT'],['1 Peter',5,'NT'],
  ['2 Peter',3,'NT'],['1 John',5,'NT'],['2 John',1,'NT'],
  ['3 John',1,'NT'],['Jude',1,'NT'],['Revelation',22,'NT'],
];

// Verse of the Day rotation [bookIdx, chapterIdx, verseIdx] (all 0-based)
const FEATURED = [
  [42,2,15],[18,22,0],[23,28,10],[49,3,12],[22,40,9],
  [44,7,27],[39,10,27],[18,45,9],[19,2,4],[42,13,5],
  [57,10,0],[18,22,3],[22,39,30],[18,90,0],[59,4,5],
  [42,0,0],[22,25,2],[18,36,3],[48,2,7],[39,5,2],
  [44,11,1],[18,26,0],[39,6,32],[18,117,0],[49,3,6],
];

// Quick-nav tiles on home screen
const QUICK_NAV = [
  {b:0,c:0,label:'Genesis 1',sub:'The Creation'},
  {b:18,c:22,label:'Psalm 23',sub:'The Lord is my shepherd'},
  {b:22,c:39,label:'Isaiah 40',sub:'Comfort, comfort my people'},
  {b:39,c:5,label:'Matthew 6',sub:"The Lord's Prayer"},
  {b:42,c:2,label:'John 3',sub:'For God so loved…'},
  {b:43,c:1,label:'Acts 2',sub:'Day of Pentecost'},
  {b:44,c:7,label:'Romans 8',sub:'No condemnation'},
  {b:48,c:5,label:'Ephesians 6',sub:'Armor of God'},
  {b:49,c:3,label:'Philippians 4',sub:'Rejoice always'},
  {b:57,c:10,label:'Hebrews 11',sub:'Hall of Faith'},
  {b:65,c:20,label:'Revelation 21',sub:'New Heaven & Earth'},
  {b:18,c:0,label:'Psalms',sub:'Songs and prayers'},
];

// ─────────────────────────────────────────────
// 365-DAY CHRONOLOGICAL READING PLAN
// Each entry: [bookIdx, firstChapterIdx, lastChapterIdx] (0-based)
// Total chapters: 1,189 → ~3.26 chapters/day
// ─────────────────────────────────────────────
const CHRONO_RANGES = [
  // OLD TESTAMENT
  [0,0,10],   // Genesis 1–11 (Creation, Fall, Flood, Babel)
  [17,0,41],  // Job 1–42 (~2000 BC, patriarchal era)
  [0,11,49],  // Genesis 12–50 (Abraham, Isaac, Jacob, Joseph)
  [1,0,39],   // Exodus 1–40
  [2,0,26],   // Leviticus 1–27
  [3,0,35],   // Numbers 1–36
  [4,0,33],   // Deuteronomy 1–34
  [5,0,23],   // Joshua 1–24
  [6,0,20],   // Judges 1–21
  [7,0,3],    // Ruth 1–4
  [8,0,30],   // 1 Samuel 1–31
  [9,0,23],   // 2 Samuel 1–24
  [12,0,28],  // 1 Chronicles 1–29 (David's reign)
  [18,0,40],  // Psalms 1–41 (Davidic psalms, early kingdom)
  [10,0,10],  // 1 Kings 1–11 (Solomon's reign)
  [13,0,35],  // 2 Chronicles 1–36
  [18,41,71], // Psalms 42–72 (Korah, Asaph, Solomon)
  [19,0,30],  // Proverbs 1–31
  [20,0,11],  // Ecclesiastes 1–12
  [21,0,7],   // Song of Solomon 1–8
  [10,11,21], // 1 Kings 12–22 (Divided Kingdom)
  [11,0,16],  // 2 Kings 1–17 (Fall of Israel)
  [29,0,8],   // Amos 1–9 (~760 BC)
  [27,0,13],  // Hosea 1–14 (~750 BC)
  [28,0,2],   // Joel 1–3
  [22,0,65],  // Isaiah 1–66 (~740–680 BC)
  [32,0,6],   // Micah 1–7 (~735 BC)
  [11,17,24], // 2 Kings 18–25 (Fall of Judah)
  [31,0,3],   // Jonah 1–4
  [33,0,2],   // Nahum 1–3 (~650 BC)
  [34,0,2],   // Habakkuk 1–3 (~610 BC)
  [35,0,2],   // Zephaniah 1–3 (~630 BC)
  [23,0,51],  // Jeremiah 1–52 (~627–580 BC)
  [24,0,4],   // Lamentations 1–5 (~586 BC)
  [25,0,47],  // Ezekiel 1–48 (~593–570 BC)
  [26,0,11],  // Daniel 1–12 (~605–530 BC)
  [30,0,0],   // Obadiah 1 (~586 BC)
  [18,72,88], // Psalms 73–89 (Asaph/exile)
  [18,89,106],// Psalms 90–107 (wilderness/post-exile)
  [18,107,149],// Psalms 108–150 (post-exile collection)
  [14,0,9],   // Ezra 1–10 (~538 BC)
  [36,0,1],   // Haggai 1–2 (~520 BC)
  [37,0,13],  // Zechariah 1–14 (~520 BC)
  [15,0,12],  // Nehemiah 1–13 (~445 BC)
  [16,0,9],   // Esther 1–10 (~480 BC)
  [38,0,3],   // Malachi 1–4 (~430 BC)
  // NEW TESTAMENT
  [41,0,0],   // Luke 1 (Announcement of births)
  [39,0,1],   // Matthew 1–2 (Birth narrative)
  [41,1,1],   // Luke 2 (Shepherds, temple)
  [39,2,3],   // Matthew 3–4 (Baptism, temptation)
  [40,0,0],   // Mark 1 (Beginning of ministry)
  [41,2,3],   // Luke 3–4
  [42,0,5],   // John 1–6
  [39,4,17],  // Matthew 5–18 (Sermon on Mount, parables)
  [40,1,8],   // Mark 2–9
  [41,4,11],  // Luke 5–12
  [42,6,9],   // John 7–10
  [39,18,24], // Matthew 19–25 (Olivet Discourse)
  [40,9,12],  // Mark 10–13
  [41,12,18], // Luke 13–19
  [42,10,11], // John 11–12
  [39,25,27], // Matthew 26–28 (Passion, Resurrection)
  [40,13,15], // Mark 14–16
  [41,19,23], // Luke 20–24
  [42,12,20], // John 13–21
  [43,0,27],  // Acts 1–28
  [58,0,4],   // James 1–5 (~50 AD)
  [47,0,5],   // Galatians 1–6 (~49 AD)
  [51,0,4],   // 1 Thessalonians 1–5 (~51 AD)
  [52,0,2],   // 2 Thessalonians 1–3 (~51 AD)
  [45,0,15],  // 1 Corinthians 1–16 (~55 AD)
  [46,0,12],  // 2 Corinthians 1–13 (~56 AD)
  [44,0,15],  // Romans 1–16 (~57 AD)
  [49,0,3],   // Philippians 1–4 (~61 AD)
  [56,0,0],   // Philemon 1 (~61 AD)
  [50,0,3],   // Colossians 1–4 (~62 AD)
  [48,0,5],   // Ephesians 1–6 (~62 AD)
  [53,0,5],   // 1 Timothy 1–6 (~63 AD)
  [55,0,2],   // Titus 1–3 (~64 AD)
  [59,0,4],   // 1 Peter 1–5 (~64 AD)
  [57,0,12],  // Hebrews 1–13 (~65 AD)
  [54,0,3],   // 2 Timothy 1–4 (~67 AD)
  [60,0,2],   // 2 Peter 1–3 (~67 AD)
  [64,0,0],   // Jude 1 (~68 AD)
  [61,0,4],   // 1 John 1–5 (~90 AD)
  [62,0,0],   // 2 John 1
  [63,0,0],   // 3 John 1
  [65,0,21],  // Revelation 1–22 (~95 AD)
];

// Build flat sequence of [bookIdx, chapterIdx] from ranges
function buildChronoSequence() {
  const seq = [];
  for (const [b, s, e] of CHRONO_RANGES) {
    for (let c = s; c <= e; c++) seq.push([b, c]);
  }
  return seq;
}

// Split sequence into 365 days as evenly as possible
function buildChronoPlan() {
  const seq = buildChronoSequence();
  const total = seq.length;
  const plan = [];
  let idx = 0;
  for (let day = 0; day < 365; day++) {
    const remaining = total - idx;
    const daysLeft = 365 - day;
    const count = Math.ceil(remaining / daysLeft);
    plan.push(seq.slice(idx, idx + count));
    idx += count;
  }
  return plan;
}

// Bible data sources
const KJV_URL = 'https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_kjv.json';
// WEB Bible — try sources in order until one works
const WEB_URLS = [
  'https://raw.githubusercontent.com/scrollmapper/bible_databases/master/json/t_web.json',
  'https://raw.githubusercontent.com/scrollmapper/bible_databases/refs/heads/master/json/t_web.json',
  'https://cdn.jsdelivr.net/gh/scrollmapper/bible_databases@master/json/t_web.json',
];

// scrollmapper/bible_databases flat format → our nested format converter
function convertScrollmapperBible(flat) {
  const books = [];
  for (const row of flat) {
    const bi = row.b - 1, ci = row.c - 1, vi = row.v - 1;
    if (!books[bi]) books[bi] = { name: BOOKS[bi]?.[0] || '', chapters: [] };
    if (!books[bi].chapters[ci]) books[bi].chapters[ci] = [];
    books[bi].chapters[ci][vi] = row.t;
  }
  return books;
}

// API.Bible (scripture.api.bible) — licensed translations
// Free tier: 5,000 requests/day. Get a key at https://scripture.api.bible/signup
const APIBIBLE_NIV_ID = '78a9f6124f344018-01'; // kept for legacy cache keys
const API_BIBLE_TRANSLATIONS = {
  niv:    { id: '78a9f6124f344018-01', name: 'NIV',   full: 'New International Version' },
  nlt:    { id: '65eec8e0b60e656b-01', name: 'NLT',   full: 'New Living Translation' },
  nasb20: { id: 'c315fa9f71d4af3a-01', name: 'NASB',  full: 'New American Standard Bible 2020' },
};
const APIBIBLE_BOOK_IDS = [
  'GEN','EXO','LEV','NUM','DEU','JOS','JDG','RUT','1SA','2SA',
  '1KI','2KI','1CH','2CH','EZR','NEH','EST','JOB','PSA','PRO',
  'ECC','SNG','ISA','JER','LAM','EZK','DAN','HOS','JOL','AMO',
  'OBA','JON','MIC','NAM','HAB','ZEP','HAG','ZEC','MAL',
  'MAT','MRK','LUK','JHN','ACT','ROM','1CO','2CO','GAL','EPH',
  'PHP','COL','1TH','2TH','1TI','2TI','TIT','PHM','HEB','JAS',
  '1PE','2PE','1JN','2JN','3JN','JUD','REV',
];

// ElevenLabs AI voices (get API key free at elevenlabs.io)
const ELEVENLABS_VOICES = [
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam — Deep & Authoritative' },
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel — Calm & Warm' },
  { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi — Clear & Confident' },
  { id: 'TxGEqnHWrfWFTfGW9XjX', name: 'Josh — Deep & Resonant' },
  { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni — Natural & Warm' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella — Soft & Gentle' },
  { id: 'VR6AewLTigWG4xSOukaG', name: 'Arnold — Strong & Crisp' },
];

// OpenAI TTS voices (get API key at platform.openai.com)
const OPENAI_TTS_VOICES = [
  { id: 'nova',    name: 'Nova — Warm Female' },
  { id: 'alloy',   name: 'Alloy — Balanced' },
  { id: 'echo',    name: 'Echo — Clear Male' },
  { id: 'fable',   name: 'Fable — Expressive Male' },
  { id: 'onyx',    name: 'Onyx — Deep Male' },
  { id: 'shimmer', name: 'Shimmer — Expressive Female' },
];

// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────
const S = {
  bibles:       { kjv: null, web: null },
  translation:  'kjv',       // current translation key
  book:         0,
  chapter:      0,
  theme:        'classic-scroll',
  fontSize:     18,
  fontFamily:   'Georgia, serif',
  lineHeight:   1.9,
  showVerseNums: true,
  apiBibleKey:  '',
  ttsProvider:  'browser',   // 'browser' | 'elevenlabs' | 'openai'
  elKey:        '',
  oaiKey:       '',
  aiVoiceId:    'pNInz6obpgDQGcFmaJgB', // default ElevenLabs / 'nova' for OpenAI
  highlights:   {},
  notes:        {},
  bookmarks:    [],
  readChapters: {},
  activeVerse:  null,
  searchDebounce: null,
  // Plan
  chronoPlan:   null,        // built once on launch
  planDay:      1,           // current reading plan day (1-365)
  planDone:     {},          // { dayNum: true } for completed days
  planStreak:   0,
};

// ─────────────────────────────────────────────
// INDEXEDDB
// ─────────────────────────────────────────────
let _db = null;
function openDB() {
  if (_db) return Promise.resolve(_db);
  return new Promise((res, rej) => {
    const req = indexedDB.open('holy-bible-v2', 1);
    req.onupgradeneeded = e => e.target.result.createObjectStore('store');
    req.onsuccess = e => { _db = e.target.result; res(_db); };
    req.onerror   = e => rej(e.target.error);
  });
}
async function dbGet(k) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const r = db.transaction('store','readonly').objectStore('store').get(k);
    r.onsuccess = () => res(r.result);
    r.onerror   = e => rej(e.target.error);
  });
}
async function dbSet(k, v) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const r = db.transaction('store','readwrite').objectStore('store').put(v, k);
    r.onsuccess = () => res();
    r.onerror   = e => rej(e.target.error);
  });
}
async function dbDel(k) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const r = db.transaction('store','readwrite').objectStore('store').delete(k);
    r.onsuccess = () => res();
    r.onerror   = e => rej(e.target.error);
  });
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const $  = id => document.getElementById(id);
const show = el => el.classList.remove('hidden');
const hide = el => el.classList.add('hidden');
const esc  = s  => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const reEsc = s  => s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');

function vKey(b,c,v){ return `${b}:${c}:${v}`; }
function bookName(b){ return BOOKS[b][0]; }
function refStr(b,c,v){ return `${bookName(b)} ${c+1}:${v+1}`; }
function chapterRefStr(b,c){ return `${bookName(b)} ${c+1}`; }

function getBible() { return S.bibles[S.translation] || S.bibles.kjv; }
function verseText(b,c,v) {
  try { return getBible()[b].chapters[c][v] || ''; } catch { return ''; }
}

function saveUserData() {
  dbSet('highlights',   S.highlights);
  dbSet('notes',        S.notes);
  dbSet('bookmarks',    S.bookmarks);
  dbSet('readChapters', S.readChapters);
  dbSet('planDone',     S.planDone);
  dbSet('planDay',      S.planDay);
  updateUserPanel();
}

async function loadUserData() {
  S.highlights   = (await dbGet('highlights'))   || {};
  S.notes        = (await dbGet('notes'))        || {};
  S.bookmarks    = (await dbGet('bookmarks'))    || [];
  S.readChapters = (await dbGet('readChapters')) || {};
  S.planDone     = (await dbGet('planDone'))     || {};
  S.planDay      = (await dbGet('planDay'))      || 1;
}

async function loadSettings() {
  const s = (await dbGet('settings')) || {};
  if (s.theme) {
    // migrate old theme names
    if (s.theme === 'light') S.theme = 'classic-scroll';
    else if (s.theme === 'dark') S.theme = 'modern-night';
    else S.theme = s.theme;
  }
  if (s.fontSize)      S.fontSize     = s.fontSize;
  if (s.fontFamily)    S.fontFamily   = s.fontFamily;
  if (s.lineHeight)    S.lineHeight   = s.lineHeight;
  if (s.translation)   S.translation  = s.translation;
  if (s.apiBibleKey)   S.apiBibleKey  = s.apiBibleKey;
  if (s.ttsProvider)   S.ttsProvider  = s.ttsProvider;
  if (s.elKey)         S.elKey        = s.elKey;
  if (s.oaiKey)        S.oaiKey       = s.oaiKey;
  if (s.aiVoiceId)     S.aiVoiceId    = s.aiVoiceId;
  if (s.showVerseNums !== undefined) S.showVerseNums = s.showVerseNums;
}

function saveSettings() {
  dbSet('settings', {
    theme: S.theme, fontSize: S.fontSize, fontFamily: S.fontFamily,
    lineHeight: S.lineHeight, translation: S.translation,
    apiBibleKey: S.apiBibleKey, showVerseNums: S.showVerseNums,
    ttsProvider: S.ttsProvider, elKey: S.elKey, oaiKey: S.oaiKey, aiVoiceId: S.aiVoiceId,
  });
}

// ─────────────────────────────────────────────
// BIBLE DOWNLOAD
// ─────────────────────────────────────────────
async function downloadBible(url, onProgress) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const total = parseInt(res.headers.get('Content-Length') || '0', 10);
  const reader = res.body.getReader();
  const chunks = [];
  let loaded = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    onProgress(total > 0 ? loaded / total : -1);
  }
  const merged = new Uint8Array(loaded);
  let off = 0;
  for (const c of chunks) { merged.set(c, off); off += c.length; }
  return JSON.parse(new TextDecoder().decode(merged));
}

// ─────────────────────────────────────────────
// API.Bible fetch — handles NIV, NLT, NASB20
// Free key at https://scripture.api.bible/signup (5,000 req/day)
// Chapters cached in IndexedDB after first fetch.
// ─────────────────────────────────────────────
async function fetchAPIBibleChapter(b, c, transKey) {
  const tInfo = API_BIBLE_TRANSLATIONS[transKey];
  if (!tInfo) throw new Error(`Unknown translation: ${transKey}`);

  const cacheKey = `${transKey}:${b}:${c}`;
  const cached   = await dbGet(cacheKey);
  if (cached) return cached;

  if (!S.apiBibleKey) {
    throw new Error(
      `An API key is required for ${tInfo.name}. ` +
      'Get a free key at scripture.api.bible, then enter it in Settings.'
    );
  }

  const chapterId = `${APIBIBLE_BOOK_IDS[b]}.${c + 1}`;
  const endpoint  =
    `https://api.scripture.api.bible/v1/bibles/${tInfo.id}/chapters/${chapterId}` +
    `?content-type=text&include-notes=false&include-titles=false` +
    `&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`;

  const res = await fetch(endpoint, { headers: { 'api-key': S.apiBibleKey } });

  if (!res.ok) {
    if (res.status === 401) throw new Error('Invalid API key. Check Settings.');
    if (res.status === 403) throw new Error(`${tInfo.name} not authorized. Check scripture.api.bible.`);
    if (res.status === 404) throw new Error(`${tInfo.name} not available on this API key tier.`);
    throw new Error(`API.Bible: HTTP ${res.status}`);
  }

  const data    = await res.json();
  const rawText = (data.data?.content || '').replace(/\n/g, ' ');
  const verses  = [];
  const re      = /\[(\d+)\]([^\[]*)/g;
  let m;
  while ((m = re.exec(rawText)) !== null) {
    verses[parseInt(m[1], 10) - 1] = m[2].trim();
  }
  if (!verses.length) throw new Error('No verse content returned. Verify your API key.');
  await dbSet(cacheKey, verses);
  return verses;
}
// Legacy alias so any cached references still resolve
const fetchNIVChapter = (b, c) => fetchAPIBibleChapter(b, c, 'niv');

// ─────────────────────────────────────────────
// WEB TRANSLATION DOWNLOAD
// Tries each URL in WEB_URLS until one succeeds.
// ─────────────────────────────────────────────
async function downloadWEB() {
  const bar  = $('web-dl-bar');
  const fill = $('web-dl-fill');
  const txt  = $('web-dl-text');
  show(bar);

  let lastErr = null;
  for (let i = 0; i < WEB_URLS.length; i++) {
    const url = WEB_URLS[i];
    try {
      txt.textContent = `Connecting (source ${i + 1}/${WEB_URLS.length})…`;
      fill.style.width = '0%';
      const rawData = await downloadBible(url, p => {
        fill.style.width = (p < 0 ? 35 : Math.round(p * 100)) + '%';
        txt.textContent  = p < 0 ? 'Downloading WEB…' : `Downloading WEB… ${Math.round(p * 100)}%`;
      });
      txt.textContent = 'Processing…';
      const data = (Array.isArray(rawData) && rawData[0]?.b !== undefined)
        ? convertScrollmapperBible(rawData)
        : rawData;
      if (!Array.isArray(data) || data.length < 60) throw new Error('Unexpected data format');
      await dbSet('bible-web', data);
      S.bibles.web = data;
      fill.style.width = '100%';
      setTimeout(() => hide(bar), 600);
      showToast('World English Bible downloaded — now available offline ✓');
      return data;
    } catch (err) {
      lastErr = err;
    }
  }

  hide(bar);
  showToast('WEB download failed after all sources: ' + (lastErr?.message || 'unknown error'));
  throw lastErr;
}

// ─────────────────────────────────────────────
// THEME
// ─────────────────────────────────────────────
function applyTheme() {
  document.documentElement.setAttribute('data-theme', S.theme);
  document.querySelectorAll('.theme-btn-opt').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.themeName === S.theme));
}
function toggleTheme() {
  S.theme = S.theme === 'classic-scroll' ? 'modern-night' : 'classic-scroll';
  applyTheme(); saveSettings();
}

// ─────────────────────────────────────────────
// FONT
// ─────────────────────────────────────────────
function applyReadingStyle() {
  const b = $('chapter-body');
  if (!b) return;
  b.style.fontFamily = S.fontFamily;
  b.style.fontSize   = S.fontSize + 'px';
  b.style.lineHeight = S.lineHeight;
}
function changeFontSize(d) {
  S.fontSize = Math.max(13, Math.min(30, S.fontSize + d));
  applyReadingStyle(); saveSettings();
}

// ─────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────
function _setSidebarBackdrop(on) {
  $('sidebar-backdrop')?.classList.toggle('active', on);
}

function toggleSidebar() {
  const sb  = $('sidebar');
  const mob = window.innerWidth <= 700;
  if (mob) {
    const opening = !sb.classList.contains('mobile-open');
    sb.classList.toggle('mobile-open');
    _setSidebarBackdrop(opening);
  } else {
    sb.classList.toggle('collapsed');
  }
}

function switchTab(tab) {
  document.querySelectorAll('.stab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('active', p.id === `tab-${tab}`));
}

// ─────────────────────────────────────────────
// BOOK LIST
// ─────────────────────────────────────────────
function renderBookList() {
  ['ot-books','nt-books'].forEach(id => $( id).innerHTML = '');
  BOOKS.forEach(([name,,t], i) => {
    const btn = document.createElement('button');
    btn.className = 'book-btn' + (i === S.book ? ' active' : '');
    btn.textContent = name;
    btn.dataset.b = i;
    btn.onclick = () => navigateTo(i, 0, -1);
    $(t === 'OT' ? 'ot-books' : 'nt-books').appendChild(btn);
  });
}
function updateActiveBook() {
  document.querySelectorAll('.book-btn').forEach(b =>
    b.classList.toggle('active', +b.dataset.b === S.book));
}

// ─────────────────────────────────────────────
// READER SELECTS
// ─────────────────────────────────────────────
function populateBookSelect() {
  $('book-select').innerHTML = BOOKS.map(([n],i) =>
    `<option value="${i}"${i===S.book?' selected':''}>${n}</option>`).join('');
}
function populateChapterSelect() {
  const n = BOOKS[S.book][1];
  $('ch-select').innerHTML = Array.from({length:n},(_,i) =>
    `<option value="${i}"${i===S.chapter?' selected':''}>Chapter ${i+1}</option>`).join('');
}

// ─────────────────────────────────────────────
// SCREENS
// ─────────────────────────────────────────────
function _hideAllScreens() {
  ['home-screen','reader-screen','plan-screen','search-screen','completion-screen']
    .forEach(id => hide($(id)));
}
function showHomeScreen() {
  _hideAllScreens(); show($('home-screen'));
  TTS.stop(); hideVerseMenu();
  updateMobileNav('home');
}
function showPlanScreen() {
  _hideAllScreens(); show($('plan-screen'));
  hideVerseMenu(); renderPlan();
  updateMobileNav('plan');
}

// ─────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────
function renderHome() {
  const day = Math.floor((Date.now() - Date.UTC(new Date().getUTCFullYear(),0)) / 86400000);
  const [db,dc,dv] = FEATURED[day % FEATURED.length];
  const txt = verseText(db,dc,dv);
  $('daily-text').textContent = txt ? `"${txt}"` : '';
  $('daily-ref').textContent  = refStr(db,dc,dv);
  $('daily-ref').onclick = () => navigateTo(db,dc,dv);

  $('quick-grid').innerHTML = QUICK_NAV.map(({b,c,label,sub}) =>
    `<button class="quick-btn" onclick="navigateTo(${b},${c},0)">
       <span class="quick-btn-book">${sub}</span>${label}
     </button>`).join('');

  renderHomePlanCard();
  renderHomeStats();
}

// ─────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────
function navigateTo(b, c, v) {
  TTS.stop();
  S.book    = b;
  S.chapter = c;
  hideVerseMenu();
  _hideAllScreens();
  show($('reader-screen'));
  updateMobileNav('read');
  updateActiveBook();
  populateBookSelect();
  populateChapterSelect();
  $('translation-sel').value = S.translation;
  renderChapter();
  if (v >= 0) {
    setTimeout(() => {
      const el = document.querySelector(`.verse-block[data-v="${v}"]`);
      if (el) el.scrollIntoView({behavior:'smooth',block:'center'});
    }, 80);
  } else {
    $('main').scrollTo({top:0,behavior:'smooth'});
  }
  S.readChapters[`${b}:${c}`] = true;
  saveUserData();
}

function prevChapter() {
  if (S.chapter > 0) { navigateTo(S.book, S.chapter-1, -1); return; }
  if (S.book > 0)    { navigateTo(S.book-1, BOOKS[S.book-1][1]-1, -1); }
}
function nextChapter() {
  if (S.chapter < BOOKS[S.book][1]-1) { navigateTo(S.book, S.chapter+1, -1); return; }
  if (S.book < 65)                     { navigateTo(S.book+1, 0, -1); }
}

// ─────────────────────────────────────────────
// CHAPTER RENDERING
// ─────────────────────────────────────────────
async function renderChapter() {
  const b = S.book, c = S.chapter;
  $('chapter-title').textContent = `${bookName(b)}  —  Chapter ${c+1}`;
  applyReadingStyle();

  // API.Bible translations (NIV, NLT, NASB20)
  const apiTrans = API_BIBLE_TRANSLATIONS[S.translation];
  if (apiTrans) {
    const notice = $('niv-notice');
    notice.textContent =
      `✦ ${apiTrans.full} · Fetched via API.Bible · Requires internet · ` +
      `App store distribution may require additional licensing.`;
    show(notice);
    $('chapter-body').innerHTML = `<div class="search-no-results">Loading ${apiTrans.name}…</div>`;
    try {
      const verses = await fetchAPIBibleChapter(b, c, S.translation);
      renderVerses(b, c, verses);
    } catch(err) {
      $('chapter-body').innerHTML =
        `<div class="search-no-results">
           Could not load ${apiTrans.name}: ${err.message}<br>
           Switch to KJV or WEB to read offline.
         </div>`;
    }
    return;
  }

  updateReaderPlanIndicator();
  updateChapterNavButtons();
  hide($('niv-notice'));

  // WEB: download if not cached
  if (S.translation === 'web' && !S.bibles.web) {
    $('chapter-body').innerHTML = '<div class="search-no-results">Downloading World English Bible…</div>';
    try {
      await downloadWEB();
    } catch {
      S.translation = 'kjv';
      $('translation-sel').value = 'kjv';
    }
  }

  const bible = getBible();
  if (!bible) return;
  const verses = bible[b]?.chapters[c];
  if (!verses) return;
  renderVerses(b, c, verses);
}

function renderVerses(b, c, verses) {
  const frag = document.createDocumentFragment();
  verses.forEach((text, v) => {
    const div = document.createElement('div');
    div.className = 'verse-block';
    div.dataset.b = b; div.dataset.c = c; div.dataset.v = v;
    const key = vKey(b,c,v);
    if (S.highlights[key]) div.dataset.hl = S.highlights[key];
    let html = S.showVerseNums ? `<sup class="verse-num">${v+1}</sup>` : '';
    html += esc(text || '');
    if (S.notes[key]) html += ' <span class="verse-note-dot" title="Has note"></span>';
    div.innerHTML = html;
    frag.appendChild(div);
  });
  const body = $('chapter-body');
  body.innerHTML = '';
  body.appendChild(frag);
  body.onclick = e => {
    const vb = e.target.closest('.verse-block');
    if (!vb) { hideVerseMenu(); return; }
    showVerseMenu(e, +vb.dataset.b, +vb.dataset.c, +vb.dataset.v);
  };
}

// ─────────────────────────────────────────────
// VERSE MENU
// ─────────────────────────────────────────────
function showVerseMenu(e, b, c, v) {
  e.stopPropagation();
  S.activeVerse = {b,c,v};
  document.querySelectorAll('.verse-block.selected').forEach(el => el.classList.remove('selected'));
  document.querySelector(`.verse-block[data-b="${b}"][data-c="${c}"][data-v="${v}"]`)?.classList.add('selected');
  const menu = $('verse-menu');
  show(menu);
  const mw = menu.offsetWidth||220, mh = menu.offsetHeight||90;
  const vw = window.innerWidth,     vh = window.innerHeight;
  menu.style.left = Math.min(e.clientX, vw-mw-12)+'px';
  menu.style.top  = (e.clientY+12+mh > vh ? e.clientY-mh-8 : e.clientY+8)+'px';
}
function hideVerseMenu() {
  hide($('verse-menu'));
  document.querySelectorAll('.verse-block.selected').forEach(el => el.classList.remove('selected'));
  S.activeVerse = null;
}
function applyHighlight(color) {
  const {b,c,v} = S.activeVerse;
  const key = vKey(b,c,v);
  if (color === 'none') delete S.highlights[key]; else S.highlights[key] = color;
  const el = document.querySelector(`.verse-block[data-b="${b}"][data-c="${c}"][data-v="${v}"]`);
  if (el) { if (color==='none') delete el.dataset.hl; else el.dataset.hl = color; }
  saveUserData(); hideVerseMenu();
}
function addBookmark() {
  const {b,c,v} = S.activeVerse;
  if (S.bookmarks.find(bm => vKey(bm.b,bm.c,bm.v) === vKey(b,c,v))) {
    showToast('Already bookmarked'); hideVerseMenu(); return;
  }
  S.bookmarks.unshift({b,c,v,text:verseText(b,c,v),date:new Date().toISOString()});
  saveUserData(); renderBookmarksList();
  showToast('Bookmarked — '+refStr(b,c,v)); hideVerseMenu();
}
function copyVerse() {
  const {b,c,v} = S.activeVerse;
  const label = S.translation.toUpperCase();
  navigator.clipboard.writeText(`${verseText(b,c,v)} — ${refStr(b,c,v)} (${label})`)
    .then(()=>showToast('Copied!')).catch(()=>showToast('Copy failed'));
  hideVerseMenu();
}

// ─────────────────────────────────────────────
// NOTES
// ─────────────────────────────────────────────
function openNoteModal() {
  const {b,c,v} = S.activeVerse;
  $('note-modal-title').textContent  = 'Note — '+refStr(b,c,v);
  $('note-verse-preview').textContent = verseText(b,c,v);
  $('note-textarea').value = S.notes[vKey(b,c,v)] || '';
  show($('note-modal'));
  $('note-textarea').focus();
  hideVerseMenu();
}
function saveNote() {
  const {b,c,v} = S.activeVerse || {};
  if (b === undefined) return;
  const key  = vKey(b,c,v);
  const text = $('note-textarea').value.trim();
  if (text) { S.notes[key] = text; } else { delete S.notes[key]; }
  const el = document.querySelector(`.verse-block[data-b="${b}"][data-c="${c}"][data-v="${v}"]`);
  if (el) {
    const dot = el.querySelector('.verse-note-dot');
    if (text && !dot) el.insertAdjacentHTML('beforeend',' <span class="verse-note-dot" title="Has note"></span>');
    if (!text && dot) dot.remove();
  }
  saveUserData(); renderNotesList();
  hide($('note-modal'));
  showToast(text ? 'Note saved' : 'Note deleted');
}

// ─────────────────────────────────────────────
// BOOKMARKS & NOTES PANELS
// ─────────────────────────────────────────────
function renderBookmarksList() {
  const el = $('bookmarks-list');
  if (!S.bookmarks.length) {
    el.innerHTML = '<div class="empty-msg">No bookmarks yet.<br>Click a verse to save it.</div>';
    return;
  }
  el.innerHTML = S.bookmarks.map((bm,i) =>
    `<div class="side-item" data-i="${i}">
       <button class="side-item-del" data-i="${i}" title="Remove">✕</button>
       <div class="side-item-ref">${refStr(bm.b,bm.c,bm.v)}</div>
       <div class="side-item-text">${esc(bm.text)}</div>
     </div>`).join('');
  el.querySelectorAll('.side-item').forEach(item => {
    item.onclick = e => {
      if (e.target.classList.contains('side-item-del')) {
        S.bookmarks.splice(+e.target.dataset.i, 1);
        saveUserData(); renderBookmarksList(); return;
      }
      const bm = S.bookmarks[+item.dataset.i];
      navigateTo(bm.b, bm.c, bm.v);
    };
  });
}
function renderNotesList() {
  const el = $('notes-list');
  const entries = Object.entries(S.notes).filter(([,t])=>t);
  if (!entries.length) {
    el.innerHTML = '<div class="empty-msg">No notes yet.<br>Click a verse to add one.</div>'; return;
  }
  el.innerHTML = entries.map(([key,text]) => {
    const [b,c,v] = key.split(':').map(Number);
    return `<div class="side-item" data-b="${b}" data-c="${c}" data-v="${v}">
       <div class="side-item-ref">${refStr(b,c,v)}</div>
       <div class="side-item-text">${esc(text)}</div>
     </div>`;
  }).join('');
  el.querySelectorAll('.side-item').forEach(item => {
    item.onclick = () => {
      const b=+item.dataset.b, c=+item.dataset.c, v=+item.dataset.v;
      S.activeVerse={b,c,v};
      navigateTo(b,c,v);
      setTimeout(openNoteModal, 150);
    };
  });
}

// ─────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────
function onSearchInput(e) {
  const q = e.target.value.trim();
  clearTimeout(S.searchDebounce);
  if (!q) { hideSearch(); return; }
  S.searchDebounce = setTimeout(() => runSearch(q), 280);
}
function hideSearch() {
  hide($('search-screen'));
  if (!$('reader-screen').classList.contains('hidden')) return;
  show($('home-screen'));
}
function runSearch(query) {
  hide($('home-screen')); hide($('reader-screen')); hide($('plan-screen'));
  show($('search-screen'));
  hideVerseMenu();
  const q = query.toLowerCase();
  const results = [];
  const bible = getBible();
  if (!bible) return;
  for (let b=0; b<66 && results.length<200; b++) {
    const bookData = bible[b]; if (!bookData) continue;
    for (let c=0; c<bookData.chapters.length && results.length<200; c++) {
      const ch = bookData.chapters[c]; if (!ch) continue;
      for (let v=0; v<ch.length; v++) {
        if (ch[v]?.toLowerCase().includes(q)) {
          results.push({b,c,v,text:ch[v]});
          if (results.length>=200) break;
        }
      }
    }
  }
  $('search-heading').textContent = results.length
    ? `${results.length}${results.length===200?'+':''} results for "${query}"`
    : `No results for "${query}"`;
  if (!results.length) {
    $('search-results').innerHTML = '<div class="search-no-results">No verses found.</div>'; return;
  }
  const re = new RegExp(`(${reEsc(query)})`, 'gi');
  $('search-results').innerHTML = results.map(({b,c,v,text}) =>
    `<div class="search-result" data-b="${b}" data-c="${c}" data-v="${v}">
       <div class="sr-ref">${refStr(b,c,v)}</div>
       <div class="sr-text">${esc(text).replace(re,'<mark>$1</mark>')}</div>
     </div>`).join('');
  $('search-results').querySelectorAll('.search-result').forEach(el => {
    el.onclick = () => {
      $('search-input').value = '';
      navigateTo(+el.dataset.b, +el.dataset.c, +el.dataset.v);
    };
  });
}

// ─────────────────────────────────────────────
// TEXT-TO-SPEECH
// Supports three providers:
//   'browser'     — Web Speech API (free, offline, varies by OS)
//   'elevenlabs'  — ElevenLabs AI voices (natural, free tier 10k chars/month)
//   'openai'      — OpenAI TTS (very natural, pay-per-use)
// ─────────────────────────────────────────────
const TTS = {
  synth:    window.speechSynthesis,
  active:   false,
  paused:   false,
  verses:   [],
  idx:      0,
  speed:    1.0,
  voice:    null,   // Web Speech API voice object
  _audio:   null,   // Audio element for AI TTS

  start(b, c) {
    this.stop();
    // For NIV, use the cached verses from the chapter body
    const isNIV = S.translation === 'niv';
    if (isNIV) {
      // Pull text from rendered verse-blocks so NIV TTS works too
      const blocks = document.querySelectorAll('.verse-block');
      this.verses = Array.from(blocks).map(el => {
        const sup = el.querySelector('.verse-num');
        const clone = el.cloneNode(true);
        clone.querySelectorAll('sup,.verse-note-dot').forEach(n=>n.remove());
        return clone.textContent.trim();
      });
    } else {
      const bible = getBible();
      if (!bible) return;
      this.verses = bible[b]?.chapters[c] || [];
    }
    if (!this.verses.length) { showToast('No text to read.'); return; }
    this.idx    = 0;
    this.active = true;
    this.paused = false;
    show($('tts-bar'));
    this._updateBar();
    this._readNext();
  },

  async _readNext() {
    if (!this.active || this.paused) return;
    if (this.idx >= this.verses.length) {
      if (this.active) showToast('Chapter reading complete ✓');
      this.stop(); return;
    }
    const text = this.verses[this.idx];
    if (!text) { this.idx++; return this._readNext(); }
    this._highlightVerse(this.idx);
    this._updateBar();

    if (S.ttsProvider === 'browser') {
      const utt = new SpeechSynthesisUtterance(text);
      utt.rate = this.speed;
      if (this.voice) utt.voice = this.voice;
      utt.onend = () => { if (this.active && !this.paused) { this.idx++; this._readNext(); } };
      utt.onerror = () => { this.idx++; if (this.active && !this.paused) this._readNext(); };
      this.synth.speak(utt);
    } else {
      try {
        await this._speakAI(text);
        if (this.active && !this.paused) { this.idx++; this._readNext(); }
      } catch (err) {
        if (this.active) {
          showToast('AI voice error: ' + err.message);
          this.stop();
        }
      }
    }
  },

  async _speakAI(text) {
    let url;
    if (S.ttsProvider === 'elevenlabs') url = await this._elevenlabsUrl(text);
    else url = await this._openaiUrl(text);
    return this._playAudioUrl(url);
  },

  async _elevenlabsUrl(text) {
    if (!S.elKey) throw new Error('No ElevenLabs API key. Add it in Settings.');
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${S.aiVoiceId}`,
      {
        method: 'POST',
        headers: { 'Accept': 'audio/mpeg', 'Content-Type': 'application/json', 'xi-api-key': S.elKey },
        body: JSON.stringify({ text, model_id: 'eleven_turbo_v2', voice_settings: { stability: 0.5, similarity_boost: 0.75 } }),
      }
    );
    if (!res.ok) {
      if (res.status === 401) throw new Error('Invalid ElevenLabs API key. Check Settings.');
      if (res.status === 429) throw new Error('ElevenLabs quota exceeded for this month.');
      throw new Error(`ElevenLabs: HTTP ${res.status}`);
    }
    return URL.createObjectURL(await res.blob());
  },

  async _openaiUrl(text) {
    if (!S.oaiKey) throw new Error('No OpenAI API key. Add it in Settings.');
    const res = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${S.oaiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'tts-1', input: text, voice: S.aiVoiceId }),
    });
    if (!res.ok) {
      if (res.status === 401) throw new Error('Invalid OpenAI API key. Check Settings.');
      throw new Error(`OpenAI TTS: HTTP ${res.status}`);
    }
    return URL.createObjectURL(await res.blob());
  },

  _playAudioUrl(url) {
    return new Promise((resolve, reject) => {
      if (this._audio) { this._audio.pause(); this._audio = null; }
      const audio = new Audio(url);
      this._audio = audio;
      audio.playbackRate = this.speed;
      audio.onended = () => { URL.revokeObjectURL(url); this._audio = null; resolve(); };
      audio.onerror = () => { URL.revokeObjectURL(url); this._audio = null; reject(new Error('Audio playback failed')); };
      audio.play().catch(reject);
    });
  },

  _highlightVerse(idx) {
    document.querySelectorAll('.verse-block.tts-reading').forEach(el => el.classList.remove('tts-reading'));
    const el = document.querySelector(`.verse-block[data-v="${idx}"]`);
    if (el) { el.classList.add('tts-reading'); el.scrollIntoView({behavior:'smooth',block:'center'}); }
  },

  _updateBar() {
    $('tts-play-pause').textContent = this.paused ? '▶ Resume' : '⏸ Pause';
    const total = this.verses.length;
    const pct   = total > 0 ? (this.idx / total * 100) : 0;
    $('tts-bar-fill').style.width = pct + '%';
    $('tts-verse-label').textContent = `Verse ${this.idx+1} of ${total}`;
  },

  togglePlayPause() {
    if (!this.active) { this.start(S.book, S.chapter); return; }
    if (this.paused) {
      this.paused = false;
      if (S.ttsProvider === 'browser') { this.synth.resume(); }
      else if (this._audio) { this._audio.play().catch(() => {}); }
      else { this._readNext(); } // resume AI chain if between verses
    } else {
      this.paused = true;
      if (S.ttsProvider === 'browser') { this.synth.pause(); }
      else if (this._audio) { this._audio.pause(); }
    }
    this._updateBar();
  },

  stop() {
    this.active = false;
    this.paused = false;
    this.synth.cancel();
    if (this._audio) { this._audio.pause(); this._audio.src = ''; this._audio = null; }
    document.querySelectorAll('.verse-block.tts-reading').forEach(el => el.classList.remove('tts-reading'));
    hide($('tts-bar'));
  },

  setSpeed(rate) {
    this.speed = parseFloat(rate);
    if (this._audio) this._audio.playbackRate = this.speed;
    if (this.active && S.ttsProvider === 'browser') {
      const savedIdx = this.idx;
      this.synth.cancel();
      setTimeout(() => { this.idx = savedIdx; this._readNext(); }, 50);
    }
  },

  loadVoices() {
    const sel = $('tts-voice');
    if (S.ttsProvider === 'elevenlabs') {
      sel.innerHTML = ELEVENLABS_VOICES.map(v => `<option value="${v.id}"${v.id===S.aiVoiceId?' selected':''}>${v.name}</option>`).join('');
      sel.onchange = e => { S.aiVoiceId = e.target.value; saveSettings(); };
      return;
    }
    if (S.ttsProvider === 'openai') {
      sel.innerHTML = OPENAI_TTS_VOICES.map(v => `<option value="${v.id}"${v.id===S.aiVoiceId?' selected':''}>${v.name}</option>`).join('');
      sel.onchange = e => { S.aiVoiceId = e.target.value; saveSettings(); };
      return;
    }
    // Browser voices
    const voices = this.synth.getVoices().filter(v => v.lang.startsWith('en'));
    sel.innerHTML = voices.length
      ? voices.map((v,i) => `<option value="${i}">${v.name}</option>`).join('')
      : '<option>Default</option>';
    if (voices.length) {
      this.voice = voices[0];
      sel.onchange = e => { this.voice = voices[+e.target.value]; };
    }
  },

  updateProvider() {
    this.stop();
    if (S.ttsProvider !== 'browser') {
      // Reset voice ID to provider default
      S.aiVoiceId = S.ttsProvider === 'openai' ? 'nova' : 'pNInz6obpgDQGcFmaJgB';
    }
    this.loadVoices();
  },
};

// ─────────────────────────────────────────────
// READING PLAN
// ─────────────────────────────────────────────
function renderPlan() {
  const plan   = S.chronoPlan;
  const dayNum = S.planDay;           // 1-365
  const done   = S.planDone;

  // Stats
  const doneCount = Object.keys(done).length;
  $('plan-days-done').textContent = doneCount;
  $('plan-pct').textContent       = Math.round(doneCount / 365 * 100) + '%';
  $('plan-progress-fill').style.width = (doneCount / 365 * 100) + '%';

  // Streak (consecutive days from today backwards)
  let streak = 0;
  for (let d = dayNum; d >= 1; d--) { if (done[d]) streak++; else break; }
  $('plan-streak').textContent = streak;

  // Today's readings
  $('plan-today-day').textContent = dayNum;
  const todayChapters = plan[dayNum - 1] || [];
  $('plan-today-readings').innerHTML = todayChapters.map(([b,c]) =>
    `<button class="plan-reading-chip" onclick="navigateTo(${b},${c},0)">${chapterRefStr(b,c)}</button>`
  ).join('');

  const markBtn = $('plan-mark-done');
  if (done[dayNum]) {
    markBtn.textContent = '✓ Day Complete!';
    markBtn.classList.add('completed');
  } else {
    markBtn.textContent = '✓ Mark Today Complete';
    markBtn.classList.remove('completed');
  }

  // All days grid (grouped by week)
  const listEl = $('plan-days-list');
  let html = '';
  for (let w = 0; w < 53; w++) {
    const startDay = w * 7 + 1;
    if (startDay > 365) break;
    html += `<div class="plan-week"><div class="plan-week-label">Week ${w+1}</div><div class="plan-week-days">`;
    for (let d = startDay; d < startDay + 7 && d <= 365; d++) {
      const chapters = plan[d-1] || [];
      const firstRef = chapters[0] ? chapterRefStr(chapters[0][0], chapters[0][1]) : '';
      const isToday  = d === dayNum;
      const isDone   = !!done[d];
      html += `<div class="plan-day-cell${isToday?' today':''}${isDone?' done':''}"
                    onclick="planGoToDay(${d})" title="Day ${d}: ${chapters.map(([b,c])=>chapterRefStr(b,c)).join(', ')}">
                 <div class="pdc-num">${d}</div>
                 ${isDone ? '<div class="pdc-check">✓</div>' : `<div class="pdc-ref">${firstRef}</div>`}
               </div>`;
    }
    html += '</div></div>';
  }
  listEl.innerHTML = html;
}

function planGoToDay(d) {
  S.planDay = d;
  saveUserData();
  renderPlan();
  $('plan-today-section').scrollIntoView({behavior:'smooth', block:'start'});
}

function planMarkDone() {
  const d = S.planDay;
  if (S.planDone[d]) return;
  S.planDone[d] = true;
  if (d < 365) S.planDay = d + 1;
  saveUserData();
  renderPlan();
  showToast(`Day ${d} complete! Next: Day ${d < 365 ? d+1 : d}`);
}

// ─────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────
let _toastTimer;
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = Object.assign(document.createElement('div'), {className:'toast'});
    Object.assign(t.style, {
      position:'fixed',bottom:'24px',left:'50%',transform:'translateX(-50%)',
      background:'var(--text)',color:'var(--bg)',padding:'10px 20px',borderRadius:'20px',
      fontSize:'13px',zIndex:'1000',pointerEvents:'none',transition:'opacity .3s',
      boxShadow:'var(--shadow)',whiteSpace:'nowrap',
    });
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { t.style.opacity='0'; }, 2400);
}

// ─────────────────────────────────────────────
// SETTINGS
// ─────────────────────────────────────────────
function openSettings() {
  const read = Object.keys(S.readChapters).length;
  const done = Object.keys(S.planDone).length;
  $('reading-progress').textContent = `${read} chapters read · ${done}/365 plan days done`;
  $('font-family-sel').value    = S.fontFamily;
  $('line-height-sel').value    = String(S.lineHeight);
  $('verse-nums-chk').checked   = S.showVerseNums;
  $('api-bible-key').value      = S.apiBibleKey;
  $('plan-day-input').value     = S.planDay;
  $('tts-provider-sel').value   = S.ttsProvider;
  $('el-api-key').value         = S.elKey;
  $('oai-api-key').value        = S.oaiKey;
  _syncAISettingsVisibility();
  applyTheme(); // sync theme button active states
  show($('settings-modal'));
}

function _syncAISettingsVisibility() {
  const p = $('tts-provider-sel').value;
  $('el-key-row').style.display  = p === 'elevenlabs' ? '' : 'none';
  $('oai-key-row').style.display = p === 'openai'      ? '' : 'none';
}

function applyAndSaveSettings() {
  S.fontFamily    = $('font-family-sel').value;
  S.lineHeight    = parseFloat($('line-height-sel').value);
  S.showVerseNums = $('verse-nums-chk').checked;
  S.apiBibleKey   = $('api-bible-key').value.trim();
  const prevProvider = S.ttsProvider;
  S.ttsProvider   = $('tts-provider-sel').value;
  S.elKey         = $('el-api-key').value.trim();
  S.oaiKey        = $('oai-api-key').value.trim();
  if (S.ttsProvider !== prevProvider) TTS.updateProvider();
  applyReadingStyle();
  saveSettings();
  if (!$('reader-screen').classList.contains('hidden')) renderChapter();
}

// ─────────────────────────────────────────────
// KEYBOARD SHORTCUTS
// ─────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (!$('app') || $('app').classList.contains('hidden')) return;
  if (e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT') return;
  const inReader = !$('reader-screen').classList.contains('hidden');
  if (e.key==='ArrowLeft')  prevChapter();
  if (e.key==='ArrowRight') nextChapter();
  if (e.key==='Escape') {
    hideVerseMenu();
    hide($('note-modal'));
    hide($('settings-modal'));
    TTS.stop();
  }
  if (e.key==='/'&&!e.ctrlKey&&!e.metaKey) { e.preventDefault(); $('search-input').focus(); }
  if ((e.key==='d'||e.key==='D')&&!e.ctrlKey&&!e.metaKey) toggleTheme();
  if ((e.key==='h'||e.key==='H')&&!e.ctrlKey&&!e.metaKey) { showHomeScreen(); renderHome(); }
  if (e.key===' '&&inReader) { e.preventDefault(); TTS.togglePlayPause(); }
});

// ─────────────────────────────────────────────
// WIRE EVENTS
// ─────────────────────────────────────────────
function wireEvents() {
  // Sidebar
  $('sidebar-toggle').onclick   = toggleSidebar;
  $('mobile-menu-btn').onclick  = toggleSidebar;
  document.querySelectorAll('.stab').forEach(b => b.onclick = () => switchTab(b.dataset.tab));

  // Footer
  $('home-btn').onclick     = () => { showHomeScreen(); renderHome(); };
  $('plan-btn').onclick     = showPlanScreen;
  $('theme-btn').onclick    = toggleTheme;
  // Theme selector buttons inside settings modal
  document.querySelectorAll('.theme-btn-opt').forEach(btn => {
    btn.onclick = () => { S.theme = btn.dataset.themeName; applyTheme(); saveSettings(); };
  });
  $('font-dec-btn').onclick = () => changeFontSize(-1);
  $('font-inc-btn').onclick = () => changeFontSize(+1);
  $('settings-btn').onclick = openSettings;

  // Reader nav
  $('prev-ch').onclick  = prevChapter;
  $('next-ch').onclick  = nextChapter;
  $('prev-ch2').onclick = prevChapter;
  $('next-ch2').onclick = () => {
    if (isTodaysPlanLastChapter() && !S.planDone[S.planDay]) {
      showCompletionScreen();
    } else {
      nextChapter();
    }
  };
  $('completion-save-btn').onclick = saveReflection;
  $('completion-next-btn').onclick = () => {
    if (!S.planDone[S.planDay]) homePlanMarkDone();
    else { S.planDay = Math.min(365, S.planDay + 1); saveUserData(); }
    showHomeScreen(); renderHome();
  };

  $('book-select').onchange = e => {
    S.book = +e.target.value; S.chapter = 0;
    updateActiveBook(); populateChapterSelect();
    renderChapter(); $('main').scrollTo({top:0});
  };
  $('ch-select').onchange = e => {
    S.chapter = +e.target.value;
    renderChapter(); $('main').scrollTo({top:0});
  };

  // Translation
  $('translation-sel').onchange = async e => {
    S.translation = e.target.value;
    saveSettings();
    await renderChapter();
  };

  // TTS
  $('tts-toggle').onclick     = () => TTS.togglePlayPause();
  $('tts-play-pause').onclick = () => TTS.togglePlayPause();
  $('tts-stop').onclick       = () => TTS.stop();
  $('tts-speed').onchange     = e  => TTS.setSpeed(e.target.value);

  // Load TTS voices (browser voices fire async on some platforms)
  TTS.loadVoices();
  if (TTS.synth.onvoiceschanged !== undefined) {
    TTS.synth.onvoiceschanged = () => { if (S.ttsProvider === 'browser') TTS.loadVoices(); };
  }

  // Search
  $('search-input').addEventListener('input', onSearchInput);
  $('search-input').addEventListener('keydown', e => {
    if (e.key==='Escape') { e.target.value=''; hideSearch(); }
  });
  $('search-close').onclick = () => { $('search-input').value=''; hideSearch(); };

  // Verse menu
  $('vm-bookmark').onclick = addBookmark;
  $('vm-note').onclick     = openNoteModal;
  $('vm-copy').onclick     = copyVerse;
  document.querySelectorAll('.hl-dot').forEach(btn => {
    btn.onclick = () => applyHighlight(btn.dataset.color);
  });
  document.addEventListener('click', e => {
    if (!$('verse-menu').classList.contains('hidden') &&
        !e.target.closest('#verse-menu') && !e.target.closest('.verse-block')) {
      hideVerseMenu();
    }
    // Close mobile sidebar on outside click or backdrop tap
    if (window.innerWidth<=700) {
      const sb = $('sidebar');
      const bd = $('sidebar-backdrop');
      if (sb.classList.contains('mobile-open') &&
          !sb.contains(e.target) &&
          e.target !== $('mobile-menu-btn') &&
          e.target !== $('mbn-menu')) {
        sb.classList.remove('mobile-open');
        _setSidebarBackdrop(false);
      }
    }
  });

  // Note modal
  $('note-modal-close').onclick = () => hide($('note-modal'));
  $('note-save-btn').onclick    = saveNote;
  $('note-delete-btn').onclick  = () => { $('note-textarea').value=''; saveNote(); };
  $('note-modal').onclick       = e => { if(e.target===$('note-modal')) hide($('note-modal')); };

  // Settings modal
  const closeSettings = () => { applyAndSaveSettings(); hide($('settings-modal')); };
  $('settings-close').onclick  = closeSettings;
  $('settings-modal').onclick  = e => { if(e.target===$('settings-modal')) closeSettings(); };
  $('font-family-sel').onchange  = applyAndSaveSettings;
  $('line-height-sel').onchange  = applyAndSaveSettings;
  $('verse-nums-chk').onchange   = applyAndSaveSettings;
  $('api-bible-key').onblur      = applyAndSaveSettings;
  $('tts-provider-sel').onchange = () => { _syncAISettingsVisibility(); applyAndSaveSettings(); };
  $('el-api-key').onblur         = applyAndSaveSettings;
  $('oai-api-key').onblur        = applyAndSaveSettings;

  $('plan-day-set').onclick = () => {
    const d = parseInt($('plan-day-input').value, 10);
    if (d >= 1 && d <= 365) { S.planDay = d; saveUserData(); showToast(`Plan set to Day ${d}`); }
  };

  $('plan-mark-done').onclick = planMarkDone;

  $('clear-data-btn').onclick = async () => {
    if (!confirm('Clear all highlights, notes, and bookmarks?')) return;
    S.highlights={}; S.notes={}; S.bookmarks=[]; S.readChapters={};
    await Promise.all(['highlights','notes','bookmarks','readChapters'].map(dbDel));
    renderBookmarksList(); renderNotesList();
    if (!$('reader-screen').classList.contains('hidden')) renderChapter();
    hide($('settings-modal'));
    showToast('User data cleared');
  };

  $('redownload-btn').onclick = async () => {
    if (!confirm('Re-download the KJV Bible text?')) return;
    await dbDel('bible-kjv');
    location.reload();
  };
}

// ─────────────────────────────────────────────
// SETUP SCREEN
// ─────────────────────────────────────────────
async function startDownload() {
  $('download-btn').disabled = true;
  $('download-btn').textContent = 'Downloading…';
  show($('progress-wrap'));
  hide($('setup-error'));
  const fill=$('progress-fill'), lbl=$('progress-label');
  try {
    const data = await downloadBible(KJV_URL, p => {
      fill.style.width = (p<0?60:Math.round(p*100))+'%';
      lbl.textContent  = p<0?'Downloading…':Math.round(p*100)+'% downloaded';
    });
    lbl.textContent='Saving to device…'; fill.style.width='95%';
    if (!Array.isArray(data)||data.length<60) throw new Error('Unexpected data format.');
    await dbSet('bible-kjv', data);
    fill.style.width='100%'; lbl.textContent='Done! Loading…';
    await new Promise(r=>setTimeout(r,400));
    S.bibles.kjv = data;
    launchApp();
    // First-time users download before init() checks tutDone, so trigger here
    const tutDone = await dbGet('tutorial-done');
    if (!tutDone) Tutorial.start();
  } catch(err) {
    $('download-btn').disabled=false;
    $('download-btn').textContent='Try Again';
    hide($('progress-wrap'));
    const errEl = $('setup-error');
    errEl.textContent = `Download failed: ${err.message}\n\nCheck your internet connection and try again.`;
    show(errEl);
  }
}

// ─────────────────────────────────────────────
// LAUNCH
// ─────────────────────────────────────────────
function launchApp() {
  hide($('setup-screen'));
  show($('app'));

  // Build chronological plan
  S.chronoPlan = buildChronoPlan();

  renderBookList();
  renderHome();
  renderBookmarksList();
  renderNotesList();
  updateUserPanel();
  applyTheme();
  applyReadingStyle();

  // Register service worker for PWA/offline
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// MOBILE NAV
// ─────────────────────────────────────────────
function updateMobileNav(tab) {
  ['home','read','plan','saved','menu'].forEach(t => {
    $(`mbn-${t}`)?.classList.toggle('active', t === tab);
  });
}

function mobileOpenReader() {
  if (!$('reader-screen').classList.contains('hidden')) {
    updateMobileNav('read'); return;
  }
  // If a chapter has been read before, show it; otherwise open sidebar to book list
  if (Object.keys(S.readChapters).length) {
    navigateTo(S.book, S.chapter, -1);
  } else {
    toggleSidebar();
  }
  updateMobileNav('read');
}

function mobileOpenSaved() {
  switchTab('bookmarks');
  if (window.innerWidth <= 700) { $('sidebar').classList.add('mobile-open'); _setSidebarBackdrop(true); }
  updateMobileNav('saved');
}

// ─────────────────────────────────────────────
// END-OF-DAY DETECTION
// ─────────────────────────────────────────────
function isTodaysPlanLastChapter() {
  if (!S.chronoPlan) return false;
  const readings = S.chronoPlan[S.planDay - 1] || [];
  if (!readings.length) return false;
  const [lb, lc] = readings[readings.length - 1];
  return lb === S.book && lc === S.chapter;
}

function updateChapterNavButtons() {
  const btn = $('next-ch2');
  if (!btn) return;
  const isLast = isTodaysPlanLastChapter() && !S.planDone[S.planDay];
  btn.textContent = isLast ? '✓ Finish Today\'s Reading' : 'Next →';
  btn.classList.toggle('btn-finish-day', isLast);
}

// ─────────────────────────────────────────────
// REFLECTION QUESTIONS (contextual per first book read)
// ─────────────────────────────────────────────
const REFLECTION_QUESTIONS = {
  0:  'What does God\'s creative work in Genesis reveal about His nature, and how does sin entering the world deepen your understanding of why grace matters?',
  1:  'How do you see God\'s faithfulness in delivering Israel from Egypt? What "Egypt" in your own life might God be calling you out of?',
  2:  'Leviticus emphasizes holiness and separation. In what area of your life do you sense God calling you to a deeper level of consecration?',
  3:  'Israel wandered for decades due to unbelief. What "wilderness season" in your faith has ultimately drawn you closer to God?',
  4:  'Deuteronomy calls the people to remember and obey. What is one spiritual truth from your past that you need to remember and act on today?',
  5:  'In Joshua, faithfulness brought victory while compromise led to defeat. Where might compromise be quietly weakening your walk with God?',
  6:  'Judges shows a recurring cycle of sin, suffering, crying out, and deliverance. How do you see this pattern in your own spiritual life?',
  7:  'Ruth shows extraordinary loyalty and is rewarded with redemption. How can your faithfulness in ordinary moments reflect God\'s love to those around you?',
  8:  'Samuel and Saul reveal the danger of looking impressive outwardly while lacking inward devotion. How does God examine your heart versus outward appearances?',
  9:  'David experienced stunning victories and devastating failures. What does his story teach you about God\'s mercy and the long-term consequences of sin?',
  10: 'Solomon started with great wisdom yet let his heart drift through compromise. What distractions most tempt you away from wholehearted devotion to God?',
  11: 'The divided kingdom shows the lasting impact of leadership choices. What kind of spiritual influence are you having on those closest to you?',
  12: 'Chronicles emphasizes worship and seeking God first. How central is sincere worship in your everyday life right now?',
  13: 'Ezra and Nehemiah show God bringing restoration after failure. What area of your spiritual life might God be calling you to rebuild?',
  14: 'Esther showed courage at great personal risk. When has God placed you in a specific situation requiring courage to speak up or act?',
  15: 'Job suffered without knowing why, yet refused to abandon God. How do you maintain trust in God\'s goodness when circumstances make no sense?',
  17: 'The Psalms express every human emotion honestly before God. What emotion do you most need to bring to God honestly today?',
  18: 'Proverbs says wisdom begins with fearing God. How does a reverent awe of God shape your everyday decisions?',
  19: 'Ecclesiastes says life without God is meaningless. Where are you seeking meaning or satisfaction outside of God?',
  20: 'Song of Solomon celebrates deep, intimate love. What does this book suggest about God\'s desire for a close, personal relationship with you?',
  21: 'Isaiah\'s vision of God\'s holiness brought him to his knees. When did you last truly encounter the holiness of God, and how did it change you?',
  22: 'Jeremiah stayed faithful despite rejection and grief. When have you remained obedient to God even when it was deeply costly?',
  23: 'Lamentations grieves honestly yet clings to hope: "His mercies are new every morning." How do you hold onto hope in God during seasons of real loss?',
  24: 'Ezekiel saw stunning visions of God\'s glory and confronted Israel\'s spiritual blindness. What might you be spiritually blind to in your own life right now?',
  25: 'Daniel and his friends remained faithful in a culture hostile to their beliefs. What pressures does your culture place on you, and how are you responding?',
  26: 'Hosea\'s faithful love for an unfaithful wife mirrors God\'s relentless love for us. How does this picture of God\'s love change how you view your own failures?',
  28: 'Joel calls for wholehearted repentance and promises God\'s Spirit poured out on all people. What might genuine repentance look like for you today?',
  29: 'Amos confronted comfortable religion and called for justice. In what ways might God be calling you to move beyond comfort into action for others?',
  30: 'Jonah ran from God\'s call and was redirected. Where might you be resisting what God has asked you to do, and what would obedience look like?',
  33: 'Nahum declares that God is slow to anger but does not leave the guilty unpunished. How does both the patience and the justice of God shape how you live?',
  36: 'Haggai challenged God\'s people who were busy building their own houses while God\'s house lay in ruins. What priorities in your life may be misaligned?',
  37: 'Zechariah is full of visions pointing to the coming Messiah. How does the certainty of God\'s promises strengthen your faith in what is still ahead?',
  38: 'Malachi closes the Old Testament calling people back to sincere worship and covenant faithfulness. What would returning wholeheartedly to God look like for you?',
  39: 'In the Sermon on the Mount, Jesus reframes everything the world values. Which beatitude or teaching most challenges your current way of living?',
  40: 'Mark shows Jesus acting with urgency and serving without hesitation. What is one thing Jesus is calling you to do today without delay?',
  41: 'Luke highlights Jesus\' compassion for the overlooked and marginalized. Who in your life or community might God be calling you to notice and serve?',
  42: 'John reveals Jesus as the eternal Word, the light of the world, the bread of life. What does it mean practically for you that Jesus is the way, the truth, and the life?',
  43: 'Acts shows the Spirit-empowered church transforming the world. What would it look like for your life to be more surrendered to the Holy Spirit\'s direction?',
  44: 'Romans lays out the full scope of the gospel — sin, grace, justification, transformation. Which part of this do you most need to rest in today?',
  45: 'Paul addresses division and pride in Corinth. What attitudes in your relationships might be causing division rather than building up others?',
  47: 'Galatians is Paul\'s passionate defense of grace over religious performance. Where do you find yourself trying to earn God\'s approval rather than resting in His grace?',
  48: 'Ephesians reveals who we truly are in Christ. Which aspect of your identity in Christ do you struggle to genuinely believe about yourself?',
  49: 'Philippians was written from prison yet overflows with joy. What is the biggest obstacle to your joy right now, and how does Paul\'s contentment challenge you?',
  50: 'Colossians declares that Christ is supreme over all things. In what area of your life does Christ need to have greater first place?',
  51: 'Thessalonians encourages believers to hold firm while waiting for Christ\'s return. How does the hope of eternity shape how you live today?',
  57: 'Hebrews calls us to fix our eyes on Jesus, who is greater than anything else. How does focusing on Jesus change how you face today\'s specific challenges?',
  58: 'James says that faith without works is dead. What evidence of living, active faith do you see — or wish you saw — in your daily life?',
  59: 'Peter writes that suffering, when endured faithfully, refines and strengthens. How does knowing suffering can deepen your faith change how you respond to difficulty?',
  60: 'John\'s letters say that love for others is the defining mark of knowing God. How honestly do you love the people around you, including those who are difficult?',
  64: 'Jude urges believers to contend earnestly for the faith once delivered. What does it mean for you personally to guard and hold firmly to the truth of the gospel?',
  65: 'Revelation shows Christ\'s ultimate victory over all evil and the renewal of all things. How does the certainty of Jesus\' triumph shape the way you live right now?',
};

function getReflectionQuestion(readings) {
  const firstBook = readings[0]?.[0];
  return REFLECTION_QUESTIONS[firstBook] ??
    'What stood out most to you in today\'s reading, and how does it connect to your life or faith right now?';
}

// ─────────────────────────────────────────────
// COMPLETION / REFLECTION SCREEN
// ─────────────────────────────────────────────
function showCompletionScreen() {
  _hideAllScreens();
  TTS.stop(); hideVerseMenu();
  updateMobileNav('read');

  const day      = S.planDay;
  const readings = S.chronoPlan?.[day - 1] || [];

  $('completion-badge').textContent = `Day ${day} of 365 Complete`;
  $('completion-heading').textContent =
    day % 7 === 0
      ? `Week ${Math.ceil(day / 7)} done — wonderful faithfulness!`
      : 'Well done — you finished today\'s reading!';

  $('completion-readings').innerHTML = readings.map(([b, c]) =>
    `<button class="home-chip" onclick="navigateTo(${b},${c},-1)">${chapterRefStr(b, c)}</button>`
  ).join('');

  $('completion-question').textContent = getReflectionQuestion(readings);

  // Pre-fill saved reflection if exists
  dbGet(`reflection-${day}`).then(saved => {
    $('completion-textarea').value = saved?.text || '';
    hide($('completion-saved-msg'));
  });

  show($('completion-screen'));
  $('main').scrollTo({ top: 0, behavior: 'instant' });
}

async function saveReflection() {
  const day  = S.planDay;
  const text = $('completion-textarea').value.trim();
  await dbSet(`reflection-${day}`, { text, savedAt: Date.now(), shared: false });
  show($('completion-saved-msg'));
  // Also mark the day complete
  if (!S.planDone[day]) homePlanMarkDone();
  showToast('Reflection saved ✓');
}

// ─────────────────────────────────────────────
// DASHBOARD HELPERS
// ─────────────────────────────────────────────
function calcStreak() {
  let streak = 0;
  for (let d = S.planDay - 1; d >= 1; d--) {
    if (S.planDone[d]) streak++;
    else break;
  }
  return streak;
}

function renderHomePlanCard() {
  const el = $('home-plan-card');
  if (!el || !S.chronoPlan) return;

  const day  = S.planDay;
  const done = Object.keys(S.planDone).length;
  const pct  = Math.round((done / 365) * 100);
  const streak = calcStreak();
  const readings = S.chronoPlan[day - 1] || [];
  const todayDone = !!S.planDone[day];

  const chipsHtml = readings.slice(0, 5).map(([b, c]) =>
    `<button class="home-chip" onclick="navigateTo(${b},${c},-1)">${chapterRefStr(b, c)}</button>`
  ).join('') + (readings.length > 5
    ? `<span class="home-chip-more">+${readings.length - 5} more</span>` : '');

  const firstReading = readings[0];
  const continueTarget = firstReading
    ? `navigateTo(${firstReading[0]},${firstReading[1]},-1)`
    : 'showPlanScreen()';

  el.innerHTML = `
    <div class="hp-header">
      <div class="hp-title-row">
        <span class="hp-icon">📅</span>
        <span class="hp-title">365-Day Chronological Bible</span>
        ${streak > 1 ? `<span class="hp-streak">🔥 ${streak}-day streak</span>` : ''}
      </div>
    </div>
    <div class="hp-body">
      <div class="hp-progress-row">
        <div class="hp-day-label">Day <strong>${day}</strong> of 365</div>
        <div class="hp-pct">${pct}% complete</div>
      </div>
      <div class="hp-progress-bar"><div class="hp-progress-fill" style="width:${pct}%"></div></div>
      <div class="hp-readings-label">Today's Reading — Day ${day}</div>
      <div class="hp-chips">${chipsHtml || '<span class="home-chip-more">No readings assigned</span>'}</div>
    </div>
    <div class="hp-footer">
      <button class="btn-primary hp-continue-btn" onclick="${todayDone ? 'showPlanScreen()' : continueTarget}">
        ${todayDone ? '✓ Today Complete — View Full Plan' : '→ Continue Today\'s Reading'}
      </button>
      ${!todayDone ? `<button class="btn-secondary hp-mark-btn" onclick="homePlanMarkDone()">Mark Complete</button>` : ''}
    </div>`;
}

function renderHomeStats() {
  const el = $('home-stats-row');
  if (!el) return;
  const notes  = Object.keys(S.notes).length;
  const bm     = S.bookmarks.length;
  const chRead = Object.keys(S.readChapters).length;
  const hl     = Object.keys(S.highlights).length;

  const cards = [
    { num: notes,  label: '📝 Notes',         action: "switchTab('notes')" },
    { num: bm,     label: '🔖 Bookmarks',     action: "switchTab('bookmarks')" },
    { num: chRead, label: '📖 Chapters Read',  action: '' },
    ...(hl > 0 ? [{ num: hl, label: '✨ Highlights', action: '' }] : []),
  ];

  el.innerHTML = cards.map(({ num, label, action }) =>
    `<div class="home-stat-card" ${action ? `onclick="${action}"` : ''}>
       <div class="hsc-num">${num}</div>
       <div class="hsc-label">${label}</div>
     </div>`
  ).join('');
}

function homePlanMarkDone() {
  planMarkDone();
  renderHomePlanCard();
  updateUserPanel();
}

function updateUserPanel() {
  const notes  = Object.keys(S.notes).length;
  const bm     = S.bookmarks.length;
  const streak = calcStreak();

  const planLine  = $('su-plan-line');
  const statsLine = $('su-mini-stats');
  if (planLine)  planLine.textContent  = `Day ${S.planDay} of 365`;
  if (statsLine) statsLine.textContent =
    `📝 ${notes}  ·  🔖 ${bm}${streak > 0 ? `  ·  🔥 ${streak}` : ''}`;
}

function updateReaderPlanIndicator() {
  const el = $('reader-plan-indicator');
  if (!el || !S.chronoPlan) return;

  const day      = S.planDay;
  const readings = S.chronoPlan[day - 1] || [];
  const isToday  = readings.some(([b, c]) => b === S.book && c === S.chapter);

  if (!isToday) { hide(el); return; }

  const done = !!S.planDone[day];
  el.innerHTML = done
    ? `<span class="rpi-badge rpi-done">✓ Day ${day} Complete</span>`
    : `<span class="rpi-badge">📅 Day ${day} of 365 — Today's Reading</span>
       <button class="rpi-mark" onclick="homePlanMarkDone(); updateReaderPlanIndicator();">Mark Complete</button>`;
  show(el);
}

// ─────────────────────────────────────────────
// TUTORIAL
// ─────────────────────────────────────────────
const TUTORIAL_STEPS = [
  {
    title: 'Welcome to Holy Bible!',
    desc:  'This quick tour shows you everything the app can do. Tap Next to begin, or Skip Tour to jump straight in.',
    target: null,
  },
  {
    title: 'Browse Books',
    desc:  'The left panel lists every book of the Bible. Tap any book to navigate — Old Testament above, New Testament below. On mobile, tap ☰ Menu to open this panel.',
    target: '#ot-books',
    requiresSidebar: true,
  },
  {
    title: 'Search the Bible',
    desc:  'Type any word or phrase in the search box to find every matching verse across all 66 books. Results are clickable.',
    target: '#search-input',
    requiresSidebar: true,
  },
  {
    title: 'Switch Translations',
    desc:  'Use the translation selector in the reader bar to switch between KJV and WEB (available offline), or NIV/NLT/NASB (requires a free API.Bible key in Settings).',
    target: '#translation-sel',
    requiresReader: true,
  },
  {
    title: 'Interact with Verses',
    desc:  'Tap any verse to open the action menu — highlight in four colors, add a personal note, bookmark it, or copy to share.',
    target: '#chapter-body',
    requiresReader: true,
  },
  {
    title: 'Listen to a Chapter',
    desc:  'Tap the 🔊 button to hear the chapter read aloud. Control reading speed and voice in the audio bar that appears below the toolbar.',
    target: '#tts-toggle',
    requiresReader: true,
  },
  {
    title: 'Bookmarks & Notes',
    desc:  'Your saved bookmarks and notes appear in the Saved and Notes tabs at the top of the side panel — always one tap away.',
    target: '.sidebar-tabs',
    requiresSidebar: true,
  },
  {
    title: '365-Day Reading Plan',
    desc:  'Tap the 📅 Plan button to open your chronological reading plan. It takes you through the entire Bible in the order events occurred.',
    target: '#plan-btn',
    requiresSidebar: true,
  },
  {
    title: 'Your Daily Dashboard',
    desc:  'The home screen shows your plan progress, streak, notes, and bookmarks. On mobile, tap ⌂ Home in the bottom bar to return here anytime.',
    target: '#home-plan-card',
    requiresHome: true,
  },
  {
    title: 'Themes & Settings',
    desc:  'Use ◑ to toggle between Classic Scroll and Modern Night themes, A− / A+ for font size, and ⚙ for full settings including AI voices.',
    target: '.sidebar-footer',
    requiresSidebar: true,
  },
];

const Tutorial = {
  step: 0,
  _overlay: null,
  _box: null,
  _spotlight: null,

  start() {
    this.step = 0;
    this._overlay   = $('tutorial-overlay');
    this._box       = $('tutorial-box');
    this._spotlight = $('tutorial-spotlight');
    this._buildDots();
    show(this._overlay);
    this._show(0);
  },

  _buildDots() {
    const dots = $('tutorial-dots');
    dots.innerHTML = '';
    TUTORIAL_STEPS.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'tutorial-dot' + (i === 0 ? ' active' : '');
      dots.appendChild(d);
    });
  },

  _updateDots(step) {
    $('tutorial-dots').querySelectorAll('.tutorial-dot').forEach((d, i) => {
      d.classList.toggle('active', i === step);
    });
  },

  _show(step) {
    const s    = TUTORIAL_STEPS[step];
    const mob  = window.innerWidth <= 700;
    const sb   = $('sidebar');

    // Steps that need the sidebar panel open
    if (s.requiresSidebar) {
      if (mob) {
        sb.classList.add('mobile-open');
        _setSidebarBackdrop(true);
      } else {
        sb.classList.remove('collapsed');
      }
    }

    // Steps that need the reader — close sidebar on mobile, open John 3
    if (s.requiresReader) {
      if (mob) {
        sb.classList.remove('mobile-open');
        _setSidebarBackdrop(false);
      }
      if ($('reader-screen').classList.contains('hidden')) {
        navigateTo(42, 2, -1); // John 3
      }
    }

    // Steps that need the home screen
    if (s.requiresHome && $('home-screen').classList.contains('hidden')) {
      if (mob) { sb.classList.remove('mobile-open'); _setSidebarBackdrop(false); }
      showHomeScreen(); renderHome();
    }

    $('tutorial-title').textContent      = s.title;
    $('tutorial-desc').textContent       = s.desc;
    $('tutorial-step-badge').textContent = `${step + 1} / ${TUTORIAL_STEPS.length}`;
    $('tutorial-next').textContent       = step < TUTORIAL_STEPS.length - 1 ? 'Next →' : 'Done ✓';
    this._updateDots(step);
    // Delay so DOM updates (navigateTo, sidebar open) settle before measuring
    setTimeout(() => this._positionSpotlightAndBox(s.target), 80);
  },

  _positionSpotlightAndBox(selector) {
    const sp   = this._spotlight;
    const box  = this._box;
    const PAD  = 10;

    const backdrop = this._overlay.querySelector('.tutorial-backdrop');

    const _center = () => {
      sp.style.cssText = 'display:none';
      backdrop.classList.remove('has-spotlight');
      Object.assign(box.style, {
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
      });
    };

    if (!selector) { _center(); return; }

    const el = document.querySelector(selector);
    if (!el) { _center(); return; }

    const r = el.getBoundingClientRect();
    // Element is in a hidden section (display:none parent) — center instead
    if (r.width === 0 && r.height === 0) { _center(); return; }

    backdrop.classList.add('has-spotlight');

    sp.style.cssText = '';
    Object.assign(sp.style, {
      top:    (r.top    - PAD) + 'px',
      left:   (r.left   - PAD) + 'px',
      width:  (r.width  + PAD * 2) + 'px',
      height: (r.height + PAD * 2) + 'px',
    });

    // Place box below target; if not enough room place above
    const BOX_H = 200;
    const vp    = window.innerHeight;
    const vw    = window.innerWidth;
    box.style.transform = '';

    let top  = r.bottom + PAD + 16;
    let left = Math.max(12, r.left);
    if (top + BOX_H > vp - 12)  top  = r.top - BOX_H - PAD - 16;
    if (top < 12)                top  = 12;
    if (left + 350 > vw - 12)   left = vw - 362;
    if (left < 12)               left = 12;

    Object.assign(box.style, { top: top + 'px', left: left + 'px' });
  },

  next() {
    if (this.step < TUTORIAL_STEPS.length - 1) {
      this.step++;
      this._show(this.step);
    } else {
      this.end();
    }
  },

  end() {
    hide($('tutorial-overlay'));
    dbSet('tutorial-done', true);
  },
};

async function init() {
  wireEvents();
  $('download-btn').onclick = startDownload;
  await loadSettings();
  applyTheme();

  // Tutorial buttons
  $('tutorial-next').onclick = () => Tutorial.next();
  $('tutorial-skip').onclick = () => Tutorial.end();
  $('tutorial-btn').onclick  = () => Tutorial.start();

  const kjv = await dbGet('bible-kjv');
  if (kjv && Array.isArray(kjv) && kjv.length >= 60) {
    S.bibles.kjv = kjv;
    await loadUserData();
    const web = await dbGet('bible-web');
    if (web) S.bibles.web = web;
    launchApp();
    // Show tutorial automatically on first ever launch
    const tutDone = await dbGet('tutorial-done');
    if (!tutDone) Tutorial.start();
  } else {
    show($('setup-screen'));
    hide($('app'));
  }
}

init();
