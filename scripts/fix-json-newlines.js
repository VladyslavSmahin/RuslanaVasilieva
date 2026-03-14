import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const filePath = path.join(__dirname, '..', 'public', 'data', 'content.json')

let raw = fs.readFileSync(filePath, 'utf8')

// Fix: the "ru" string in petersburg body has literal newlines. Find and replace with \n.
// Pattern: from "body": { \n      "ru": " to the next ", \n      "en":
const start = raw.indexOf('"body": { \n      "ru": "')
if (start === -1) {
  console.log('Pattern not found')
  process.exit(1)
}
const strStart = start + '"body": { \n      "ru": "'.length
const rest = raw.slice(strStart)
// Find the end: ", \n      "en": or ", \n      "de":
const endMatch = rest.match(/\",\s*\n\s*"en":/)
if (!endMatch) {
  console.log('End pattern not found')
  process.exit(1)
}
const strEnd = strStart + endMatch.index
let ruContent = raw.slice(strStart, strEnd)
// Replace literal newlines with \n
ruContent = ruContent.replace(/\r\n/g, '\n').replace(/\n/g, '\\n')
const before = raw.slice(0, strStart)
const after = raw.slice(strEnd)
raw = before + ruContent + after
fs.writeFileSync(filePath, raw)
console.log('Fixed content.json')
