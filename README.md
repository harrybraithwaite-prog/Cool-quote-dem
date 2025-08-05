# Cool-quote-dem
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cool Quote – Instant Air Conditioning Quote</title>
<meta name="description" content="At Cool Quote we work with local fitters to give you an instant price for your air conditioning supply and installation.">
<link rel="manifest" href="manifest.json">
<link rel="stylesheet" href="styles.css">
<script defer src="script.js"></script>
</head>
<body>
<header>
  <div class="brand">
    <img src="assets/logo.svg" alt="Cool Quote logo">
    <strong>Cool Quote</strong>
  </div>
  <nav>
    <a href="index.html">Home</a>
    <a href="faq.html">FAQ</a>
    <a href="terms.html">Terms</a>
    <a href="privacy.html">Privacy</a>
  </nav>
</header>

<section class="hero container">
  <div>
    <h1>Air Conditioning Quotes in Minutes</h1>
    <p>At Cool Quote we work with local fitters to give you an instant price for your air conditioning supply and installation.</p>
    <a class="cta" href="#quote">Get an instant quote</a>
    <div class="brand-strip">
      <span class="small">Starting with:</span>
      <img class="logo-inline" src="assets/wb.svg" alt="Worcester Bosch">
      <span class="small">More brands later.</span>
    </div>
  </div>
  <div class="card">
    <h2>What you’ll get</h2>
    <ul>
      <li>Instant pricing incl. installation</li>
      <li>30-day quote validity</li>
      <li>Deposit now (£150 + VAT), balance after completion</li>
      <li>Local, vetted fitters only</li>
    </ul>
    <span class="badge">Install as App (PWA)</span>
  </div>
</section>

<section id="quote" class="container card">
  <h2>Quote wizard</h2>
  <div class="progress" id="steps"></div>
  <form id="quoteForm" onsubmit="return false;">
    <div id="stepContainer"></div>
    <div style="display:flex;gap:8px;margin-top:12px;">
      <button id="prevBtn" class="secondary" type="button">Back</button>
      <button id="nextBtn" type="button">Next</button>
    </div>
  </form>

  <div id="summary" class="hidden">
    <h3>Your estimate</h3>
    <div id="btuLine" class="small"></div>
    <p class="price" id="totalPrice">£0</p>
    <ul id="breakdown"></ul>
    <div class="notice">Deposit: £150 + VAT (Cool Quote consignment fee). Balance after completion is paid to your fitter.</div>
    <div class="card success">
      <strong>Reference:</strong> <span id="refNo"></span><br>
      We’ll be in touch shortly to book in a time to come and complete the job.
      <div class="small" id="validUntil"></div>
    </div>

    <h4>Booking details</h4>
    <div class="grid two">
      <div>
        <label>Full name</label>
        <input id="name" required>
      </div>
      <div>
        <label>Email</label>
        <input id="email" type="email" required>
      </div>
      <div>
        <label>Phone</label>
        <input id="phone" required>
      </div>
      <div>
        <label>Installation address</label>
        <input id="address" required>
      </div>
    </div>
    <button type="button" id="confirmBtn">Confirm (demo)</button>
    <div id="confirmNote" class="hidden success" style="margin-top:10px;padding:10px;border-radius:10px;">
      Thank you. A local fitter will be in touch shortly.
    </div>
  </div>
</section>

<section class="container">
  <div class="card">
    <h3>Track your job</h3>
    <div class="progress">
      <div class="step active">Quote Created</div>
      <div class="step">Consignment Fee Paid</div>
      <div class="step">Fitter Assigned</div>
      <div class="step">Site Info Confirmed</div>
      <div class="step">Installation Booked</div>
    </div>
    <p class="small">You’ll receive email updates as your job progresses.</p>
  </div>
</section>

<footer class="container">
  <div>© <span id="year"></span> Cool Quote. All rights reserved.</div>
  <div><a href="terms.html">Terms</a> · <a href="privacy.html">Privacy</a> · <a href="faq.html">FAQ</a></div>
</footer>

<div id="cookie" class="cookie hidden">
  <div><strong>Cookies:</strong> We use cookies to improve your experience. <a href="privacy.html">Learn more</a>.</div>
  <div>
    <button id="cookieAccept">Accept</button>
  </div>
</div>

<script>
  if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js');}
</script>
</body>
</html>
