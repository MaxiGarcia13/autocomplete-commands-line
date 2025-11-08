#!/usr/bin/env node

const {
  getCacheStats,
  clearExpiredEntries,
  clearAllCache,
} = require("./utils/cache");

const args = process.argv.slice(2);
const command = args[0];

function showHelp() {
  console.log(`
Cache Manager for Autocomplete Commands Line

Usage:
  node src/cache-manager.js <command>

Commands:
  stats     Show cache statistics
  clean     Remove expired cache entries
  clear     Clear all cache entries
  help      Show this help message

Examples:
  node src/cache-manager.js stats
  node src/cache-manager.js clean
  node src/cache-manager.js clear
`);
}

function showStats() {
  const stats = getCacheStats();

  console.log("📊 Cache Statistics");
  console.log("==================");
  console.log(`Cache file: ${stats.cacheFile}`);
  console.log(`Total entries: ${stats.totalEntries}`);
  console.log(`Valid entries: ${stats.validEntries}`);
  console.log(`Expired entries: ${stats.expiredEntries}`);
  console.log(`Cache size: ${formatBytes(stats.cacheSizeBytes)}`);

  if (stats.expiredEntries > 0) {
    console.log(`\n💡 Tip: Run 'node src/cache-manager.js clean' to remove ${stats.expiredEntries} expired entries`);
  }
}

function cleanExpired() {
  const statsBefore = getCacheStats();
  const expiredCount = statsBefore.expiredEntries;

  if (expiredCount === 0) {
    console.log("✅ No expired entries to clean");
    return;
  }

  clearExpiredEntries();

  const statsAfter = getCacheStats();
  const sizeSaved = statsBefore.cacheSizeBytes - statsAfter.cacheSizeBytes;

  console.log(`🧹 Cleaned ${expiredCount} expired entries`);
  console.log(`💾 Freed ${formatBytes(sizeSaved)} of disk space`);
  console.log(`📊 Cache now contains ${statsAfter.totalEntries} entries`);
}

function clearAll() {
  const statsBefore = getCacheStats();

  if (statsBefore.totalEntries === 0) {
    console.log("✅ Cache is already empty");
    return;
  }

  clearAllCache();

  console.log(`🗑️  Cleared all ${statsBefore.totalEntries} cache entries`);
  console.log(`💾 Freed ${formatBytes(statsBefore.cacheSizeBytes)} of disk space`);
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// Main execution
switch (command) {
  case "stats":
    showStats();
    break;
  case "clean":
    cleanExpired();
    break;
  case "clear":
    clearAll();
    break;
  case "help":
  case "--help":
  case "-h":
    showHelp();
    break;
  default:
    if (command) {
      console.error(`❌ Unknown command: ${command}`);
    }
    showHelp();
    process.exit(1);
}
