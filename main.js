import hljs from 'highlight.js';
import { parse_muxip_needed } from './muxip_needed.js'

var button = document.getElementById('checkButton').addEventListener('click', checkButton)

function checkButton(e) {
  e.preventDefault()
  const url = new URL(document.getElementById("urlField").value)

  const result = checkURL(url)

  const resultEl = document.getElementById("result")
  resultEl.innerHTML = JSON.stringify(result, null, 2)
  resultEl.removeAttribute('data-highlighted')
  hljs.initHighlighting.called = false;
  hljs.highlightAll()
}

function checkURL(url) {
  const urlParams = Object.fromEntries(url.searchParams.entries());

  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  for (const key in urlParams) {
    const value = urlParams[key]
    if (isNumeric(value)) {
      urlParams[key] = Number(value)
    }
  }

  return parse_muxip_needed(JSON.stringify(urlParams))
}

// const url = new URL(readFileSync('./test_url_1').toString())

// console.log(checkURL(url))