const steps = [
  {key:'houseType', label:'House type', type:'select', options:[
    {v:'detached', t:'Detached'},{v:'semi', t:'Semi-detached'},{v:'terraced', t:'Terraced'},{v:'flat', t:'Flat'}
  ]},
  {key:'room', label:'Room it’s going in', type:'select', options:[
    {v:'bedroom', t:'Bedroom'},{v:'living', t:'Living room'},{v:'office', t:'Home office'},{v:'other', t:'Other'}
  ]},
  {key:'floor', label:'Floor the room is in', type:'select', options:[
    {v:'ground', t:'Ground'},{v:'first', t:'First'},{v:'second_plus', t:'Second or above'}
  ]},
  {key:'upperConfirm', label:'If above first floor, confirm you\'re happy to upload photos after booking for fitter approval', type:'confirm', depends:(data)=>data.floor==='second_plus'},
  {key:'roomSize', label:'Room size', type:'select', options:[
    {v:'small', t:'Small (0–150 sq ft)'},{v:'medium', t:'Medium (151–300 sq ft)'},{v:'large', t:'Large (301–500 sq ft)'},{v:'xl', t:'Extra Large (500+ sq ft)'}
  ]},
  {key:'sun', label:'How much sunlight does the room get?', type:'select', options:[
    {v:'low', t:'Low'},{v:'med', t:'Medium'},{v:'high', t:'High (faces sun most of day)'}
  ]},
  {key:'wallType', label:'Type of wall the unit will be on', type:'select', options:[
    {v:'external', t:'External wall (direct to outside)'},{v:'internal', t:'Internal wall (pipework required)'}
  ]},
  {key:'height', label:'Install height', type:'select', options:[
    {v:'floor', t:'Floor level'},{v:'mid', t:'Mid wall'},{v:'high', t:'High wall'}
  ]},
  {key:'distanceUnits', label:'Distance between indoor and outdoor unit (metres)', type:'select', options:[
    {v:'lt3', t:'Under 3m'},{v:'3to7', t:'3–7m'},{v:'gt7', t:'Over 7m'}
  ]},
  {key:'neighbour', label:'Do you have at least 2.5m clearance to your nearest neighbour?', type:'select', options:[
    {v:'yes', t:'Yes'},{v:'no', t:'No'}
  ]},
  {key:'fuse', label:'Approximate distance from fuse board to install location', type:'select', options:[
    {v:'lt5', t:'Less than 5m'},{v:'5to10', t:'5–10m'},{v:'gt10', t:'Over 10m'},{v:'unsure', t:'Not sure'}
  ]},
  {key:'fusePhoto', label:'Please upload a photo of the route from fuse board (demo only, not uploaded)', type:'file', depends:(data)=>data.fuse==='gt10' || data.fuse==='unsure'},
];

const data = {};
let current = 0;

const stepsEl = document.getElementById('steps');
const stepContainer = document.getElementById('stepContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const summary = document.getElementById('summary');

function renderSteps(){
  stepsEl.innerHTML='';
  steps.forEach((s,i)=>{
    if(s.depends && !s.depends(data)) return;
    const el = document.createElement('div');
    el.className='step'+(i===current?' active':'');
    el.textContent = s.label;
    stepsEl.appendChild(el);
  });
}

function renderCurrent(){
  const s = visibleSteps()[current];
  stepContainer.innerHTML='';
  const wrap = document.createElement('div');
  wrap.className='grid';
  const label = document.createElement('label');
  label.textContent = s.label;
  wrap.appendChild(label);

  if(s.type==='select'){
    const sel = document.createElement('select');
    sel.id = s.key;
    s.options.forEach(o=>{
      const opt = document.createElement('option');
      opt.value = o.v; opt.textContent = o.t;
      sel.appendChild(opt);
    });
    if(data[s.key]) sel.value = data[s.key];
    sel.addEventListener('change',()=> data[s.key]=sel.value );
    wrap.appendChild(sel);
  } else if(s.type==='confirm'){
    const note = document.createElement('div');
    note.className='notice';
    note.innerHTML = "Because your room is above first floor, after booking you’ll need to upload photos for the fitter to confirm there’s no extra cost.";
    wrap.appendChild(note);
    const sel = document.createElement('select');
    sel.id = s.key;
    sel.innerHTML = '<option value="yes">I\'m happy to provide photos after booking</option><option value="no">I\'m not happy to provide photos now</option>';
    if(data[s.key]) sel.value = data[s.key];
    sel.addEventListener('change',()=> data[s.key]=sel.value );
    wrap.appendChild(sel);
  } else if(s.type==='file'){
    const inp = document.createElement('input');
    inp.type='file';
    inp.id=s.key;
    wrap.appendChild(inp);
  }

  stepContainer.appendChild(wrap);
}

function visibleSteps(){
  return steps.filter(s=>!s.depends || s.depends(data));
}

function showSummary(){
  document.getElementById('quoteForm').classList.add('hidden');
  summary.classList.remove('hidden');

  // BTU calculation
  let btu = 6000;
  if(data.roomSize==='medium') btu += 3000;
  if(data.roomSize==='large') btu += 6000;
  if(data.roomSize==='xl') btu += 9000;
  if(data.sun==='med') btu += 1000;
  if(data.sun==='high') btu += 2000;
  document.getElementById('btuLine').textContent = `Estimated requirement: ~${btu.toLocaleString()} BTU`;

  // Pricing (demo logic)
  let product = 900;
  if(btu>8000) product = 1100;
  if(btu>12000) product = 1400;
  if(btu>18000) product = 1800;

  let install = 700; // single Installation charges line
  if(data.wallType==='internal') install += 150;
  if(data.height==='mid') install += 75;
  if(data.height==='high') install += 150;
  if(data.distanceUnits==='3to7') install += 120;
  if(data.distanceUnits==='gt7') install += 250;
  if(data.houseType==='detached') install += 120;
  if(data.houseType==='semi') install += 60;
  // Silent fuse board surcharge
  if(data.fuse==='5to10') install += 120;
  if(data.fuse==='gt10' || data.fuse==='unsure') install += 240;

  const consignment = 150;
  const vatRate = 0.20;
  const subtotal = product + install + consignment;
  const vat = (product + install) * vatRate; // VAT on product+install (adjust later if your policy differs)
  const total = subtotal + vat;

  document.getElementById('totalPrice').textContent = `£${total.toFixed(2)}`;

  const breakdown = document.getElementById('breakdown');
  breakdown.innerHTML = '';
  breakdown.appendChild(li(`Product: £${product.toFixed(2)}`));
  breakdown.appendChild(li(`Installation charges: £${install.toFixed(2)}`));
  breakdown.appendChild(li(`Cool Quote consignment fee: £${consignment.toFixed(2)} + VAT`));
  breakdown.appendChild(li(`VAT (on product + installation): £${vat.toFixed(2)}`));

  // Reference number
  const n = Math.floor(Math.random()*9999999)+1;
  const ref = `CQ-${String(n).padStart(7,'0')}`;
  document.getElementById('refNo').textContent = ref;

  // Valid until (30 days)
  const now = new Date();
  const valid = new Date(now.getTime() + 30*24*60*60*1000);
  document.getElementById('validUntil').textContent = `Valid until: ${valid.toDateString()}`;

  document.getElementById('confirmBtn').onclick = () => {
    document.getElementById('confirmNote').classList.remove('hidden');
  };
}

function li(text){ const el=document.createElement('li'); el.textContent=text; return el; }

prevBtn.addEventListener('click', ()=>{
  if(current>0){ current--; renderSteps(); renderCurrent(); }
});

nextBtn.addEventListener('click', ()=>{
  const s = visibleSteps()[current];
  if(s.type==='select'){
    const v = document.getElementById(s.key).value;
    data[s.key]=v;
  } else if(s.type==='confirm'){
    const v = document.getElementById(s.key).value;
    data[s.key]=v;
    if(v==='no'){ window.location.href='fitters.html'; return; }
  } else if(s.type==='file'){
    data[s.key]='uploaded';
  }

  if(s.key==='neighbour' && data.neighbour==='no'){
    stepContainer.innerHTML = '<div class="error">A minimum 2.5m clearance to the nearest neighbour is required. Please contact a local fitter for alternatives.</div>';
    nextBtn.disabled=true; return;
  }

  const vs = visibleSteps();
  if(current < vs.length - 1){ current++; renderSteps(); renderCurrent(); }
  else { showSummary(); }
});

function init(){
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
  const cookie = document.getElementById('cookie');
  if(cookie && !localStorage.getItem('cq_cookie')) cookie.classList.remove('hidden');
  const ca = document.getElementById('cookieAccept'); if(ca) ca.onclick = ()=>{ localStorage.setItem('cq_cookie','1'); cookie.classList.add('hidden'); };
  renderSteps(); renderCurrent();
}
document.addEventListener('DOMContentLoaded', init);
