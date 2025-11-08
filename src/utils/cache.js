const {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} = require("node:fs");
const { join } = require("node:path");
const { homedir } = require("node:os");
const { joinArgs } = require("./join-args");

const CACHE_DIR = join(homedir(), ".autocomplete-commands-cache");
const CACHE_FILE = join(CACHE_DIR, "commands-cache.json");
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000 * 7; // 7 days in milliseconds

function ensureCacheDir() {
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function generateCacheKey(args) {
  return joinArgs(args).toLowerCase().trim();
}

function loadCache() {
  try {
    if (!existsSync(CACHE_FILE)) {
      return {};
    }

    const cacheContent = readFileSync(CACHE_FILE, { encoding: "utf8" });
    return JSON.parse(cacheContent);
  } catch {
    return {};
  }
}

function saveCache(cache) {
  try {
    ensureCacheDir();
    writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), {
      encoding: "utf8",
    });
  } catch {
    // Ignore errors
  }
}

function isExpired(entry) {
  if (!entry || !entry.timestamp) {
    return true;
  }

  const now = Date.now();
  return now - entry.timestamp > CACHE_DURATION_MS;
}

function getCachedResponse(args) {
  const cacheKey = generateCacheKey(args);
  const cache = loadCache();

  const entry = cache[cacheKey];

  if (!entry || isExpired(entry)) {
    return null;
  }

  return entry.response;
}

function setCachedResponse(args, response) {
  const cacheKey = generateCacheKey(args);
  const cache = loadCache();

  cache[cacheKey] = {
    response: response,
    timestamp: Date.now(),
  };

  saveCache(cache);
}

function clearExpiredEntries() {
  const cache = loadCache();
  const cleanedCache = {};

  for (const [key, entry] of Object.entries(cache)) {
    if (!isExpired(entry)) {
      cleanedCache[key] = entry;
    }
  }

  saveCache(cleanedCache);
}

function clearAllCache() {
  saveCache({});
}

function getCacheStats() {
  const cache = loadCache();
  const entries = Object.entries(cache);
  const validEntries = entries.filter(([, entry]) => !isExpired(entry));
  const expiredEntries = entries.length - validEntries.length;

  return {
    totalEntries: entries.length,
    validEntries: validEntries.length,
    expiredEntries: expiredEntries,
    cacheFile: CACHE_FILE,
    cacheSizeBytes: existsSync(CACHE_FILE)
      ? readFileSync(CACHE_FILE).length
      : 0,
  };
}

module.exports = {
  getCachedResponse,
  setCachedResponse,
  clearExpiredEntries,
  clearAllCache,
  getCacheStats,
  CACHE_DURATION_MS,
};
