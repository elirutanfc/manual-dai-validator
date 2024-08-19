import hljs from 'highlight.js';
import { parse_muxip_needed } from './muxip_needed.js'

var button = document.getElementById('checkButton').addEventListener('click', checkButton)
var button = document.getElementById('btnGoodExample').addEventListener('click', btnGoodExample)
var button = document.getElementById('btnBadExample').addEventListener('click', btnBadExample)

function checkButton(e) {
  e.preventDefault()
  var url = null
  const resultEl = document.getElementById("result")
  try {
    url = new URL(document.getElementById("urlField").value)
  } catch (e) {
    setStatus("error", "Invalid URL!")
    document.getElementById('result').style.display = "none"
    return
  }
  clearStatus();

  const result = checkURL(url)

  resultEl.textContent = JSON.stringify(result, null, 2)
  resultEl.removeAttribute('data-highlighted')
  hljs.initHighlighting.called = false;
  hljs.highlightAll()

  if (result.valid) {
    setStatus("success", "DAI Parameters are all present and valid")
  } else {
    setStatus("error", "Problems found with DAI parameters:")
  }
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
    var text = await (await fetch('./test_url_good_1.txt')).text()
    document.getElementById('urlField').value = text
    document.getElementById('checkButton').click()
  } catch (e) { }
}

async function btnBadExample(e) {
  e.preventDefault()
  try {
    var text = await (await fetch('./test_url_bad_1.txt')).text()
    document.getElementById('urlField').value = text
    document.getElementById('checkButton').click()
  } catch (e) { }
}

// fetch('./test_url_good_1.txt')
//   .then((response) => response.text().then((text) => {
//     console.log(text)
//   }));



