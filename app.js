const ML = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const MS = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];

// ── STORAGE ─────────────────────────────────────────────────
const REMOTE_STORAGE = {
  enabled: true,
  provider: 'firebase',
  rootPath: 'studio_g',
  firebaseConfig: {
    apiKey: "AIzaSyDxYsG4VRLV-syt9Vw09HLQxzmXyMZgi0Y",
    authDomain: "studiog-74fe9.firebaseapp.com",
    databaseURL: "https://studiog-74fe9-default-rtdb.firebaseio.com",
    projectId: "studiog-74fe9",
    storageBucket: "studiog-74fe9.firebasestorage.app",
    messagingSenderId: "1071846455942",
    appId: "1:1071846455942:web:81dff51658461155f52f07",
    measurementId: "G-X7M57HPTJR"
  }
};

function initRemoteStorage(){
  if(!REMOTE_STORAGE.enabled) return;
  if(typeof firebase === 'undefined'){ console.warn('Firebase SDK is not loaded. Remote storage disabled.'); return; }
  try{
    firebase.initializeApp(REMOTE_STORAGE.firebaseConfig);
    REMOTE_STORAGE.db = firebase.database();
  }catch(e){
    console.warn('Remote storage initialization failed:', e);
  }
}

const AUTH = {
  enabled: true,
  provider: 'firebase'
};
let authInitialized = false;

function initAuth(){
  if(!AUTH.enabled) return;
  if(typeof firebase === 'undefined'){ console.warn('Firebase SDK is not loaded. Auth disabled.'); return; }
  try{ firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL); }catch(e){}
  firebase.auth().onAuthStateChanged(async user=>{
    if(user){
      document.getElementById('login-overlay')?.classList.remove('open');
      document.getElementById('app').style.filter = '';
      document.getElementById('logout-btn')?.style.setProperty('display','inline-flex');
      if(!authInitialized){
        authInitialized = true;
        await loadRemoteState().catch(()=>{});
        renderHome();
      }
    } else {
      document.getElementById('logout-btn')?.style.setProperty('display','none');
      document.getElementById('app').style.filter = 'blur(3px)';
      document.getElementById('login-overlay')?.classList.add('open');
    }
  });
}

function setAuthError(message){
  const el = document.getElementById('auth-error');
  if(el) el.textContent = message || '';
}

async function login(){
  const email = (document.getElementById('auth-email')?.value || '').trim();
  const password = document.getElementById('auth-pass')?.value || '';
  if(!email || !password){ return setAuthError('Preencha e-mail e senha.'); }
  try{
    await firebase.auth().signInWithEmailAndPassword(email,password);
  }catch(e){
    setAuthError(e.message || 'Falha ao entrar.');
  }
}

async function signup(){
  const email = (document.getElementById('auth-email')?.value || '').trim();
  const password = document.getElementById('auth-pass')?.value || '';
  if(!email || !password){ return setAuthError('Preencha e-mail e senha.'); }
  try{
    await firebase.auth().createUserWithEmailAndPassword(email,password);
  }catch(e){
    setAuthError(e.message || 'Não foi possível criar a conta.');
  }
}

function logout(){
  if(typeof firebase === 'undefined') return;
  firebase.auth().signOut().catch(()=>{});
}

async function remoteSave(k,v){
  if(!REMOTE_STORAGE.enabled || !REMOTE_STORAGE.db) return;
  try{
    await REMOTE_STORAGE.db.ref(`${REMOTE_STORAGE.rootPath}/${k}`).set(v);
  }catch(e){
    console.warn('Remote save failed:', e);
  }
}

function saveLocal(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
function load(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}}
function save(k,v){saveLocal(k,v); if(REMOTE_STORAGE.enabled) remoteSave(k,v);}

async function remoteLoad(k,d){
  if(!REMOTE_STORAGE.enabled || !REMOTE_STORAGE.db) return {exists:false,value:d};
  try{
    const snap = await REMOTE_STORAGE.db.ref(`${REMOTE_STORAGE.rootPath}/${k}`).once('value');
    if(!snap.exists()) return {exists:false,value:d};
    let value = snap.val();
    if(value && typeof value === 'object' && !Array.isArray(value)){
      const keys = Object.keys(value);
      if(keys.length && keys.every(key=>/^\d+$/.test(key))) {
        value = keys.sort((a,b)=>Number(a)-Number(b)).map(key=>value[key]);
      }
    }
    return {exists:true,value};
  }catch(e){
    console.warn('Remote load failed:', e);
    return {exists:false,value:d};
  }
}

async function loadRemoteState(){
  if(!REMOTE_STORAGE.enabled || !REMOTE_STORAGE.db) return;
  const [alunasData, pagamentosData, gastosData, presencasData] = await Promise.all([
    remoteLoad('sg_alunas', []),
    remoteLoad('sg_pags', []),
    remoteLoad('sg_gastos', []),
    remoteLoad('sg_presencas', {})
  ]);

  if(alunasData.exists){ alunas = alunasData.value; saveLocal('sg_alunas', alunas); }
  else { alunas = load('sg_alunas', []); }

  if(pagamentosData.exists){ pagamentos = pagamentosData.value; saveLocal('sg_pags', pagamentos); }
  else { pagamentos = load('sg_pags', []); }

  if(gastosData.exists){ gastos = gastosData.value; saveLocal('sg_gastos', gastos); }
  else { gastos = load('sg_gastos', []); }

  if(presencasData.exists){ presencas = presencasData.value; saveLocal('sg_presencas', presencas); }
  else { presencas = load('sg_presencas', {}); }
}

initRemoteStorage();

// Variáveis inicializadas vazias — serão preenchidas pelo Firebase no loadRemoteState
let alunas = [];
let pagamentos = [];
let gastos = [];

// ── STATE ────────────────────────────────────────────────────
const hoje = new Date();
let state = {
  dash:{mes:hoje.getMonth(),ano:hoje.getFullYear()},
  mens:{mes:hoje.getMonth(),ano:hoje.getFullYear()},
  gastos:{mes:hoje.getMonth(),ano:hoje.getFullYear()},
  fin:{mes:hoje.getMonth(),ano:hoje.getFullYear()},
  aniv:{mes:hoje.getMonth(),ano:hoje.getFullYear()},
  screen:'home'
};
let editingAlunaId = null;

// ── HELPERS ──────────────────────────────────────────────────
function fmt(v){return 'R$ '+Number(v).toLocaleString('pt-BR',{minimumFractionDigits:0,maximumFractionDigits:0});}
function inits(n){const p=n.trim().split(' ');return(p[0][0]+(p[1]?.[0]||'')).toUpperCase();}
function uid(){return '_'+Math.random().toString(36).slice(2);}
function lbl(m,a){return ML[m]+' '+a;}

// ── NAV ──────────────────────────────────────────────────────
let navBtns = [];
function initNav(){
  navBtns = Array.from(document.querySelectorAll('.nav-btn'));
}
window.addEventListener('DOMContentLoaded', initNav);
function goScreen(id,idx){
  if(navBtns.length===0) initNav();
  const target = document.getElementById('screen-'+id);
  if(!target) return;
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  navBtns.forEach(b=>b.classList.remove('active'));
  target.classList.add('active');
  if(navBtns[idx]) navBtns[idx].classList.add('active');
  state.screen=id;
  if(id==='home')renderHome();
  if(id==='alunas')renderAlunas();
  if(id==='mens')renderMens();
  if(id==='financeiro')renderFinanceiro();
  if(id==='aniv')renderAniv();
}
function chMonth(ctx,d){
  let {mes,ano}=state[ctx];
  mes+=d; if(mes>11){mes=0;ano++;} if(mes<0){mes=11;ano--;}
  state[ctx]={mes,ano};
  if(ctx==='dash')renderHome();
  if(ctx==='mens')renderMens();
  if(ctx==='fin')renderFinanceiro();
  if(ctx==='aniv')renderAniv();
}

// ── MODALS ───────────────────────────────────────────────────
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){
  document.getElementById(id).classList.remove('open');
  if(id==='modal-aluna'){
    editingAlunaId = null;
    const title = document.querySelector('#modal-aluna .modal-title');
    if(title) title.textContent = 'Cadastrar aluna';
    const button = document.querySelector('#modal-aluna .btn-red');
    if(button) button.textContent = 'Cadastrar aluna';
  }
}
document.querySelectorAll('.overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open');}));
function openAdd(){
  const s=state.screen;
  if(navBtns.length===0) initNav();
  if(s==='alunas'){ 
    editingAlunaId = null;
    const title = document.querySelector('#modal-aluna .modal-title');
    if(title) title.textContent = 'Cadastrar aluna';
    const button = document.querySelector('#modal-aluna .btn-red');
    if(button) button.textContent = 'Cadastrar aluna';
    openModal('modal-aluna');
    return;
  }
  if(s==='financeiro'){
    document.getElementById('g-mes').value=state.fin.mes;
    document.getElementById('g-ano').value=state.fin.ano;
    openModal('modal-gasto');return;
  }
  document.getElementById('pay-mes').value=state.mens.mes;
  document.getElementById('pay-ano').value=state.mens.ano;
  const sel=document.getElementById('pay-aluna');
  sel.innerHTML=[...alunas].sort((a,b)=>a.nome.localeCompare(b.nome)).map(a=>`<option value="${a.id}">${a.nome}</option>`).join('');
  openModal('modal-pay');
}

// ── HORÁRIOS DO ESTÚDIO ──────────────────────────────────────
// diasSemana: 0=Dom,1=Seg,2=Ter,3=Qua,4=Qui,5=Sex,6=Sáb
const GRADE = {
  1:[7,8,9,18,19], 2:[7,8,9,18,19], 3:[7,8,9,18,19],
  4:[7,8,9,18,19], 5:[7,8,9,18,19], 6:[8,9,10]
};

function horariosHoje() {
  const diaSem = hoje.getDay(); // 0-6
  return (GRADE[diaSem] || []);
}

function horaAtualEProxima() {
  const agora = new Date();
  const h = agora.getHours();
  const m = agora.getMinutes();
  const horas = horariosHoje();
  let atual = null, prox = null;
  for (let i = 0; i < horas.length; i++) {
    const ini = horas[i];
    const fim = ini + 1; // cada aula dura 1h
    if (h >= ini && h < fim) { atual = ini; prox = horas[i+1] ?? null; break; }
    if (h < ini) { prox = ini; break; }
  }
  return { atual, prox };
}

function alunasDoHorario(hora) {
  if (hora === null) return [];
  const diaSem = hoje.getDay();
  const horaStr = String(hora).padStart(2,'0') + ':00';
  return alunas.filter(a => {
    if (!a.horario || !a.dias) return false;
    return a.horario === horaStr && a.dias.includes(diaSem);
  });
}

// presença: chave "id-YYYY-MM-DD-HH"
function presKey(id, hora) {
  const d = hoje.toISOString().slice(0,10);
  return `pres_${id}_${d}_${hora}`;
}

let presencas = {};

function togglePresenca(id, hora) {
  const k = presKey(id, hora);
  presencas[k] = !presencas[k];
  save('sg_presencas', presencas);
  renderHome();
}

// ── HOME ─────────────────────────────────────────────────────
function renderHome() {
  // Relógio
  const agora = new Date();
  const hh = String(agora.getHours()).padStart(2,'0');
  const mm = String(agora.getMinutes()).padStart(2,'0');
  document.getElementById('relogio').textContent = hh + ':' + mm;

  // Data por extenso
  const dias = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
  const mesesN = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  document.getElementById('data-hoje').textContent =
    dias[agora.getDay()] + ', ' + agora.getDate() + ' de ' + mesesN[agora.getMonth()];

  const { atual, prox } = horaAtualEProxima();

  // Próxima hora label
  document.getElementById('prox-hora-label').textContent =
    prox !== null ? String(prox).padStart(2,'0') + 'h' : '—';

  // Aula atual
  const secAtual = document.getElementById('aula-atual-sec');
  const listAtual = document.getElementById('aula-atual-list');
  const titleAtual = document.getElementById('aula-atual-title');
  if (atual !== null) {
    secAtual.style.display = 'block';
    const horaStr = String(atual).padStart(2,'0') + ':00';
    const lista = alunasDoHorario(atual);
    titleAtual.textContent = 'Aula atual';
    listAtual.innerHTML = renderAulaCard(lista, atual, true);
  } else {
    secAtual.style.display = 'none';
  }

  // Próxima aula
  const secProx = document.getElementById('prox-aula-sec');
  const listProx = document.getElementById('prox-aula-list');
  const titleProx = document.getElementById('prox-aula-title');
  if (prox !== null) {
    secProx.style.display = 'block';
    const listaProx = alunasDoHorario(prox);
    titleProx.textContent = 'Próxima aula';
    listProx.innerHTML = renderAulaCard(listaProx, prox, false);
  } else {
    secProx.style.display = 'none';
    if (atual === null) {
      listAtual.innerHTML = '';
      secAtual.style.display = 'block';
      titleAtual.textContent = 'Hoje no estúdio';
      // mostra todos os horários de hoje
      const horas = horariosHoje();
      if (!horas.length) {
        listAtual.innerHTML = '<div class="empty"><div class="empty-icon">🌿</div>Sem aulas hoje</div>';
      } else {
        listAtual.innerHTML = horas.map(h => {
          const l = alunasDoHorario(h);
          return renderAulaCard(l, h, false);
        }).join('');
      }
    }
  }

  renderAnivHome();
}

function renderAulaCard(lista, hora, aoVivo) {
  const horaFmt = String(hora).padStart(2,'0') + ':00';
  const count = lista.length;
  const presentes = lista.filter(a => presencas[presKey(a.id, hora)]).length;
  return `<div class="card" style="margin-bottom:10px;">
    <div class="aula-card-header">
      <div class="aula-card-hora">
        ${aoVivo ? '<div class="aula-dot-live"></div>' : '<div style="width:8px;height:8px;border-radius:50%;background:var(--gray2);flex-shrink:0;"></div>'}
        <span class="aula-card-hora-txt">${horaFmt}</span>
      </div>
      <span class="aula-count">${aoVivo ? presentes+'/'+count+' presentes' : count+' aluna'+(count!==1?'s':'')}</span>
    </div>
    ${count === 0
      ? '<div class="empty" style="padding:20px 16px;"><div style="font-size:24px;margin-bottom:6px;">🌿</div>Nenhuma aluna neste horário</div>'
      : `<div class="avatar-grid">${lista.map(a => {
          const pres = !!presencas[presKey(a.id, hora)];
          return `<div class="av-item" onclick="${aoVivo ? `togglePresenca('${a.id}',${hora})` : ''}">
            <div class="av-circle ${pres ? 'presente' : 'ausente'}">
              ${inits(a.nome)}
              ${pres ? `<div class="av-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg></div>` : ''}
            </div>
            <div class="av-name">${a.nome.split(' ')[0]}</div>
          </div>`;
        }).join('')}</div>`
    }
  </div>`;
}

// Relógio atualiza a cada minuto
setInterval(renderHome, 60000);

function renderAnivHome(){
  const mn=hoje.getMonth()+1;
  const lista=alunas.filter(a=>{if(!a.aniv)return false;const p=a.aniv.split('/');return parseInt(p[1])===mn;}).sort((a,b)=>parseInt(a.aniv)-parseInt(b.aniv));
  const el=document.getElementById('aniv-home');
  if(!lista.length){el.innerHTML='<div class="empty"><div class="empty-icon">🎂</div>Nenhum aniversariante este mês</div>';return;}
  el.innerHTML=lista.slice(0,5).map(a=>`<div class="aniv-row"><span style="font-size:22px">🎂</span><div class="row-info"><div class="row-name">${a.nome}</div><div class="row-sub">${a.aniv}</div></div></div>`).join('');
}

const DIAS_NOME = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
function diasStr(dias){if(!dias||!dias.length)return'';return dias.map(d=>DIAS_NOME[d]).join(', ');}

// ── ALUNAS ───────────────────────────────────────────────────
function renderAlunas(){
  const q=(document.getElementById('search-alunas')?.value||'').toLowerCase();
  const f=alunas.filter(a=>a.nome.toLowerCase().includes(q)).sort((a,b)=>a.nome.localeCompare(b.nome));
  const el=document.getElementById('alunas-list');
  if(!f.length){el.innerHTML='<div class="empty"><div class="empty-icon">🔍</div>Nenhuma aluna encontrada</div>';return;}
  el.innerHTML='<div class="card">'+f.map(a=>{
    const agenda=[diasStr(a.dias),a.horario].filter(Boolean).join(' · ');
    const sub=agenda||(a.aniv?'🎂 '+a.aniv:'Dia '+a.dia);
    return`<div class="row" onclick="showAluna('${a.id}')">
      <div class="avatar">${inits(a.nome)}</div>
      <div class="row-info"><div class="row-name">${a.nome}</div><div class="row-sub">${sub}</div></div>
      <div class="row-right"><div class="row-val">${fmt(a.valor)}</div></div>
    </div>`;
  }).join('')+'</div>';
}

function showAluna(id){
  const a=alunas.find(x=>x.id===id);if(!a)return;
  const hist=pagamentos.filter(p=>p.nome.trim()===a.nome.trim()).sort((x,y)=>y.ano-x.ano||y.mes-x.mes).slice(0,6);
  const agenda=[diasStr(a.dias),a.horario].filter(Boolean).join(' · ');
  document.getElementById('det-content').innerHTML=`
    <div style="text-align:center;padding:6px 0 16px;">
      <div class="aluna-avatar-big">${inits(a.nome)}</div>
      <div style="font-size:18px;font-weight:800;margin-bottom:3px;">${a.nome}</div>
      <div style="color:var(--text2);font-size:13px;">${fmt(a.valor)}/mês · Vence dia ${a.dia}</div>
      ${agenda?`<div style="margin-top:5px;font-size:12px;color:var(--red);font-weight:700;">📅 ${agenda}</div>`:''}
    </div>
    ${hist.length?`<div class="card" style="margin-bottom:12px;">
      <div class="card-hdr"><div class="card-hdr-dot"></div><span class="card-hdr-txt">Histórico 2026</span></div>
      ${hist.map(p=>`<div class="row" style="cursor:default;">
        <div class="avatar neutral" style="font-size:10px;font-family:inherit;font-weight:800;">${MS[p.mes].toUpperCase()}</div>
        <div class="row-info"><div class="row-name">${ML[p.mes]} ${p.ano}</div></div>
        <div class="row-right"><div class="row-val green">${fmt(p.valor)}</div></div>
      </div>`).join('')}
    </div>`:''}
    <button onclick="editAluna('${a.id}')" class="btn-red" style="margin-right:8px;">Editar aluna</button>
    <button onclick="if(confirm('Remover ${a.nome.replace(/'/g,"\\'")}?')){removeAluna('${a.id}');closeModal('modal-det');}" class="btn-danger">Remover aluna</button>
  `;
  openModal('modal-det');
}

function removeAluna(id){alunas=alunas.filter(a=>a.id!==id);save('sg_alunas',alunas);renderAlunas();}

function toggleDia(btn) { btn.classList.toggle('sel'); }

function editAluna(id){
  closeModal('modal-det');
  const a=alunas.find(x=>x.id===id);if(!a)return;
  editingAlunaId = id;
  document.getElementById('a-nome').value = a.nome;
  document.getElementById('a-valor').value = a.valor;
  document.getElementById('a-dia').value = a.dia;
  document.getElementById('a-aniv').value = a.aniv || '';
  document.getElementById('a-horario').value = a.horario || '';
  document.querySelectorAll('#dias-semana-picker .dia-pill').forEach(b=>{
    const dia = parseInt(b.dataset.dia);
    b.classList.toggle('sel', Array.isArray(a.dias) && a.dias.includes(dia));
  });
  const title = document.querySelector('#modal-aluna .modal-title');
  if(title) title.textContent = 'Editar aluna';
  const button = document.querySelector('#modal-aluna .btn-red');
  if(button) button.textContent = 'Salvar alterações';
  openModal('modal-aluna');
}

function saveAluna(){
  const nome=document.getElementById('a-nome').value.trim();
  const valor=parseFloat(document.getElementById('a-valor').value)||180;
  const dia=parseInt(document.getElementById('a-dia').value)||1;
  const aniv=document.getElementById('a-aniv').value.trim();
  const horario=document.getElementById('a-horario').value;
  const dias=[...document.querySelectorAll('#dias-semana-picker .dia-pill.sel')].map(b=>parseInt(b.dataset.dia));
  if(!nome)return alert('Informe o nome');
  if(editingAlunaId){
    const index = alunas.findIndex(a=>a.id===editingAlunaId);
    if(index !== -1){
      alunas[index] = {...alunas[index],nome,valor,dia,aniv,horario,dias};
    }
  } else {
    alunas.push({id:uid(),nome,valor,dia,aniv,horario,dias});
  }
  save('sg_alunas',alunas);
  closeModal('modal-aluna');
  ['a-nome','a-valor','a-dia','a-aniv'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('a-horario').value='';
  document.querySelectorAll('#dias-semana-picker .dia-pill').forEach(b=>b.classList.remove('sel'));
  renderAlunas();
}

// ── MENSALIDADES ─────────────────────────────────────────────
function renderMens(){
  const{mes,ano}=state.mens;
  document.getElementById('mens-mes-lbl').textContent=lbl(mes,ano);
  const q=(document.getElementById('search-mens')?.value||'').toLowerCase();
  const pagMes=pagamentos.filter(p=>p.mes===mes&&p.ano===ano);
  const pagos=new Set(pagMes.map(p=>p.nome.trim()));
  const lista=alunas.filter(a=>a.nome.toLowerCase().includes(q));
  const pagas=lista.filter(a=>pagos.has(a.nome.trim())).length;
  const pend=lista.length-pagas;
  const totRec=pagMes.filter(p=>lista.some(a=>a.nome.trim()===p.nome.trim())).reduce((s,p)=>s+p.valor,0);
  const esp=lista.reduce((s,a)=>s+a.valor,0);
  document.getElementById('m-pag').textContent=pagas;
  document.getElementById('m-pen').textContent=pend;
  document.getElementById('m-tot').textContent=fmt(totRec);
  document.getElementById('m-arec').textContent=fmt(Math.max(0,esp-totRec));
  const sorted=[...lista].sort((a,b)=>{
    const pa=pagos.has(a.nome.trim()),pb=pagos.has(b.nome.trim());
    if(pa!==pb)return pa?1:-1;
    return a.dia-b.dia;
  });
  document.getElementById('mens-list').innerHTML=sorted.length?'<div class="card">'+sorted.map(a=>{
    const ok=pagos.has(a.nome.trim());
    return`<div class="row" onclick="togglePag('${a.id}',${mes},${ano})">
      <div class="avatar ${ok?'ok':''}">${inits(a.nome)}</div>
      <div class="row-info"><div class="row-name">${a.nome}</div><div class="row-sub">Dia ${a.dia} · ${fmt(a.valor)}</div></div>
      <div class="row-right"><span class="badge ${ok?'pago':'pendente'}">${ok?'✓ Pago':'Pendente'}</span></div>
    </div>`;
  }).join('')+'</div>':'<div class="empty"><div class="empty-icon">🔍</div>Nenhuma aluna encontrada</div>';
}

function togglePag(alunaId,mes,ano){
  const a=alunas.find(x=>x.id===alunaId);if(!a)return;
  const nome=a.nome.trim();
  const idx=pagamentos.findIndex(p=>p.nome.trim()===nome&&p.mes===mes&&p.ano===ano);
  if(idx>=0)pagamentos.splice(idx,1);
  else pagamentos.push({id:uid(),nome,mes,ano,valor:a.valor});
  save('sg_pags',pagamentos);
  renderMens();
  if(state.screen==='home')renderHome();
}

function savePay(){
  const alunaId=document.getElementById('pay-aluna').value;
  const mes=parseInt(document.getElementById('pay-mes').value);
  const ano=parseInt(document.getElementById('pay-ano').value)||2026;
  const a=alunas.find(x=>x.id===alunaId);if(!a)return;
  const nome=a.nome.trim();
  const valor=parseFloat(document.getElementById('pay-valor').value)||a.valor;
  if(!pagamentos.find(p=>p.nome.trim()===nome&&p.mes===mes&&p.ano===ano))
    pagamentos.push({id:uid(),nome,mes,ano,valor});
  save('sg_pags',pagamentos);
  closeModal('modal-pay');
  document.getElementById('pay-valor').value='';
  renderMens();renderHome();
}

// ── GASTOS ───────────────────────────────────────────────────
function renderGastos(){
  const{mes,ano}=state.gastos;
  document.getElementById('gastos-mes-lbl').textContent=lbl(mes,ano);
  const gm=gastos.filter(g=>g.mes===mes&&g.ano===ano);
  document.getElementById('gastos-total').textContent=fmt(gm.reduce((s,g)=>s+g.valor,0));
  document.getElementById('gastos-list').innerHTML=gm.length?'<div class="card">'+gm.map(g=>`
    <div class="row" style="cursor:default;">
      <div class="avatar" style="background:var(--red-light);color:var(--red-dark);font-family:inherit;font-size:10px;font-weight:800;">R$</div>
      <div class="row-info"><div class="row-name">${g.desc}</div></div>
      <div class="row-right" style="display:flex;align-items:center;gap:8px;">
        <div class="row-val red">${fmt(g.valor)}</div>
        <button class="del-btn" onclick="removeGasto('${g.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </div>`).join('')+'</div>':'<div class="empty"><div class="empty-icon">💸</div>Nenhum gasto registrado</div>';
}

function removeGasto(id){gastos=gastos.filter(g=>g.id!==id);save('sg_gastos',gastos);renderGastos();renderHome();}

function saveGasto(){
  const desc=document.getElementById('g-desc').value.trim();
  const mes=parseInt(document.getElementById('g-mes').value);
  const ano=parseInt(document.getElementById('g-ano').value)||2026;
  const valor=parseFloat(document.getElementById('g-valor').value)||0;
  if(!desc)return alert('Informe a descrição');
  if(valor<=0)return alert('Informe o valor');
  gastos.push({id:uid(),desc,mes,ano,valor});
  save('sg_gastos',gastos);
  closeModal('modal-gasto');
  document.getElementById('g-desc').value='';
  document.getElementById('g-valor').value='';
  renderFinanceiro();
}

// ── FINANCEIRO ────────────────────────────────────────────────
function renderFinanceiro(){
  const{mes,ano}=state.fin;
  document.getElementById('fin-mes-lbl').textContent=lbl(mes,ano);
  const pagMes=pagamentos.filter(p=>p.mes===mes&&p.ano===ano);
  const rec=pagMes.reduce((s,p)=>s+p.valor,0);
  const esp=alunas.reduce((s,a)=>s+a.valor,0);
  const gasMes=gastos.filter(g=>g.mes===mes&&g.ano===ano);
  const totalGas=gasMes.reduce((s,g)=>s+g.valor,0);
  const sal=rec-totalGas;
  document.getElementById('fin-rec').textContent=fmt(rec);
  document.getElementById('fin-arec').textContent=fmt(Math.max(0,esp-rec));
  document.getElementById('fin-gas').textContent=fmt(totalGas);
  const sEl=document.getElementById('fin-sal');
  sEl.textContent=fmt(sal);
  sEl.className='metric-val '+(sal>=0?'green':'red');
  // pagas/pendentes
  const pagos=new Set(pagMes.map(p=>p.nome.trim()));
  document.getElementById('fin-pag').textContent=alunas.filter(a=>pagos.has(a.nome.trim())).length;
  document.getElementById('fin-pen').textContent=alunas.filter(a=>!pagos.has(a.nome.trim())).length;
  // gráfico
  const mths=[];
  for(let i=4;i>=0;i--){let m=mes-i,a=ano;if(m<0){m+=12;a--;}mths.push({m,a});}
  const data=mths.map(({m,a})=>({
    lb:ML[m].slice(0,3),
    r:pagamentos.filter(p=>p.mes===m&&p.ano===a).reduce((s,p)=>s+p.valor,0),
    g:gastos.filter(p=>p.mes===m&&p.ano===a).reduce((s,p)=>s+p.valor,0)
  }));
  const mx=Math.max(...data.flatMap(d=>[d.r,d.g]),1);
  document.getElementById('fin-bar-chart').innerHTML=data.map(d=>`
    <div class="bar-grp">
      <div class="bar-pair">
        <div class="bar r" style="height:${Math.round(d.r/mx*76)}px"></div>
        <div class="bar g" style="height:${Math.round(d.g/mx*76)}px"></div>
      </div>
      <div class="bar-lbl">${d.lb}</div>
    </div>`).join('');
  // gastos lista
  document.getElementById('fin-gastos-list').innerHTML=gasMes.length?'<div class="card">'+gasMes.map(g=>`
    <div class="row" style="cursor:default;">
      <div class="avatar" style="background:var(--red-light);color:var(--red-dark);font-family:inherit;font-size:10px;font-weight:800;">R$</div>
      <div class="row-info"><div class="row-name">${g.desc}</div></div>
      <div class="row-right" style="display:flex;align-items:center;gap:8px;">
        <div class="row-val red">${fmt(g.valor)}</div>
        <button class="del-btn" onclick="removeGasto('${g.id}');renderFinanceiro();">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </div>`).join('')+'</div>':'<div class="empty"><div class="empty-icon">💸</div>Nenhum gasto registrado</div>';
}

// ── ANIVERSARIANTES ──────────────────────────────────────────
function renderAniv(){
  const{mes,ano}=state.aniv;
  document.getElementById('aniv-mes-lbl').textContent=lbl(mes,ano);
  const mn=mes+1;
  const lista=alunas.filter(a=>{if(!a.aniv)return false;const p=a.aniv.split('/');return parseInt(p[1])===mn;}).sort((a,b)=>parseInt(a.aniv.split('/')[0])-parseInt(b.aniv.split('/')[0]));
  const el=document.getElementById('aniv-list');
  if(!lista.length){el.innerHTML=`<div class="empty"><div class="empty-icon">🎂</div>Nenhum aniversariante em ${ML[mes]}</div>`;return;}
  el.innerHTML='<div class="card">'+lista.map(a=>`
    <div class="aniv-row">
      <span style="font-size:24px">🎂</span>
      <div class="row-info"><div class="row-name">${a.nome}</div><div class="row-sub">${a.aniv}</div></div>
      <span class="badge hoje">Dia ${a.aniv.split('/')[0]}</span>
    </div>`).join('')+'</div>';
}

// ── INIT ─────────────────────────────────────────────────────
if(AUTH.enabled){
  initAuth();
}else{
  loadRemoteState().then(()=>renderHome()).catch(()=>renderHome());
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}
