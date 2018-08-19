module.exports = articles

if (process.argv.includes('-v')) function l() { console.log.apply(console, arguments)}
else function l() {}

function canonical() {
  return `<link rel="canonical" href=${JSON.stringify(url.href)}>`
}
