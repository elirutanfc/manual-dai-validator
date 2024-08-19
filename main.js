import hljs from 'highlight.js';
import { parser } from '@exodus/schemasafe'
import test_url_good_1 from './test_url_good_1.txt'
import test_url_bad_1 from './test_url_bad_1.txt'
import muxip_needed from './muxip_needed.json'

var parse = null
try {
  parse = parser(muxip_needed, { includeErrors: true, allErrors: true, mode: "default" })
} catch (e) {
  setStatus("error", "error parsing schema")
}

document.getElementById('checkButton').addEventListener('click', btnCheckURL)
document.getElementById('btnGoodExample').addEventListener('click', btnGoodExample)
document.getElementById('btnBadExample').addEventListener('click', btnBadExample)

function btnCheckURL(e) {
  e.preventDefault()
  var url = null
  try {
    // grab url from field & parse it
    url = new URL(document.getElementById("urlField").value)
  } catch (e) {
    setStatus("error", "Invalid URL!")
    document.getElementById('result').style.display = "none"
    return
  }
  clearStatus();
  const urlParams = extractParams(url)
  const result = checkURL(urlParams)

  if (result.valid) {
    setResult(JSON.stringify(result, null, 2))
    setStatus("success", "DAI Parameters are all present and valid")
  } else {
    // adding the jsonified url to the result because it doesn't do it when the result is invalid for some reason
    setResult(JSON.stringify(result, null, 2) + "\n" + JSON.stringify(urlParams, null, 2))
    setStatus("error", "Problems found with DAI parameters:")
  }
}

// takes the params from a URL object and converts them to json
function extractParams(url) {
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

  return urlParams
}

// runs the parser on a jsonified set of URL parameters
function checkURL(urlParams) {
  return parse(JSON.stringify(urlParams))
}

function setResult(text) {
  const resultEl = document.getElementById("result")
  resultEl.textContent = text
  resultEl.removeAttribute('data-highlighted')
  hljs.initHighlighting.called = false;
  hljs.highlightAll()
}

function setStatus(status, message) {
  clearStatus()

  if (status === "success") {
    document.getElementById('statusSuccess').style.display = ""
    document.getElementById('statusSuccess').textContent = message
  } else {
    document.getElementById('statusError').style.display = ""
    document.getElementById('statusError').textContent = message
  }
}

function clearStatus() {
  document.getElementById('statusError').style.display = "none"
  document.getElementById('statusSuccess').style.display = "none"
  document.getElementById('result').style.display = ""
}

async function btnGoodExample(e) {
  e.preventDefault()
  try {
    var text = await (await fetch(test_url_good_1)).text()
    document.getElementById('urlField').value = text
    document.getElementById('checkButton').click()
  } catch (e) { }
}

async function btnBadExample(e) {
  e.preventDefault()
  try {
    var text = await (await fetch(test_url_bad_1)).text()
    document.getElementById('urlField').value = text
    document.getElementById('checkButton').click()
  } catch (e) { }
}
