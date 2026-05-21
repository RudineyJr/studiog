const ML = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const MS = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];

// ── DADOS 2026 da planilha ──────────────────────────────────
const PAGS_2026 = [
  // JANEIRO
  ...['Jamille Godinho','Raissa Beleboni','Doracy Carvalho','Eloyse Carvalho','Daniella Rodrigues','Itamara Moura','Josilena Moita','Leandro Ribeiro','Joelma Ribeiro','Maria Iêda Amaral','Sandra Rocha','Pérola Amorim','Lucilene Silva','Rosane Santos','Alba Maia','Sophia Neves','Sidney Lima','Izolda Omena','Larissa Sousa','Sofia Amorim','Savia Amorim','Walleska Trindade','Wilsiene Silva','Graça Rocha','Bianca Oliveira','Valderice Pereira','Lígia Rebelo','Maria de Sousa','Odilia Godinho','Anne Dias','Eloisa Aguiar','Carol Rayol','Izete Lima','Isaura Lima','Maria Eunice Lopes','Shirley Marinho','Helena Sato','Nerina Hayashida','Maria Sato','Joselma Maciel','Diva Lameira','Andreza Carvalho','Lindalva Castro','Camila Lameira','Pamela Garcia','Déborh Marinho','Elaine Vasconcelos'].map(n=>({nome:n,mes:0,ano:2026,valor:getValorAluna(n)})),
  // FEVEREIRO
  ...['Jamille Godinho','Josilena Moita','Leandro Ribeiro','Joelma Ribeiro','Daniella Rodrigues','Raissa Beleboni','Itamara Moura','Maria de Nazaré Castro','Livia Lopes','Sandra Rocha','Pérola Amorim','Sophia Neves','Larissa Sousa','Alba Maia','Rosane Santos','Odilia Godinho','Wilsiene Silva','Graça Rocha','Anne Dias','Shirley Marinho','Lígia Rebelo','Eloisa Aguiar','Izolda Omena','Maria Clara Bentes','Izete Lima','Maria José Oliveira','Isaura Lima','Sofia Amorim','Valderice Pereira','Savia Amorim','Pamela Garcia','Monica Godinho','Carol Rayol','Lidiane Silva','Helena Sato','Nerina Hayashida','Maria Sato','Camila Lameira','Regina Taketomi','Nice Barreto','Ariane Salgado','Andreza Carvalho','Déborh Marinho','Niviane Dolzane','Leomara Lobato','Joselma Maciel','Walleska Trindade','Rayene Nascimento','Lindalva Castro','Elaine Vasconcelos','Diva Lameira'].map(n=>({nome:n,mes:1,ano:2026,valor:getValorAluna(n)})),
  // MARÇO
  ...['Keice Azevedo','Daniella Rodrigues','Itamara Moura','Josilena Moita','Leandro Ribeiro','Joelma Ribeiro','Aldenilza','Raissa Beleboni','Sandra Rocha','Pérola Amorim','Livia Lopes','Sophia Neves','Rosane Santos','Eloisa Aguiar','Maria José Oliveira','Alba Maia','Larissa Sousa','Karynna Monteiro','Arnely Neves','Izolda Omena','Anne Dias','Elke Gonçalves','Anne Gonçalves','Odilia Godinho','Shirley Marinho','Milvaneth Cardoso','Maria de Nazaré Castro','Maria Clara Bentes','Emily Nascimento','Aila Maria Sousa','Dienny Frota','Izete Lima','Isaura Lima','Valderice Pereira','Ester Godinho','Laura Amancio','Nerina Hayashida','Eliene Costa','Leomara Lobato','Carol Rayol','Monica Godinho','Helena Sato','Pamela Garcia','Andreza Carvalho','Lidiane Silva','Rayene Nascimento','Nice Barreto','Ariane Salgado','Regina Taketomi','Niviane Dolzane','Joselma Maciel','Diva Lameira','Déborh Marinho','Walleska Trindade','Elaise Souza','Maria Iêda Amaral','Eloyse Carvalho','Doracy Carvalho','Vilma da Luz','Lindalva Castro','Camila Lameira','Maria de Sousa','Elaine Vasconcelos'].map(n=>({nome:n,mes:2,ano:2026,valor:getValorAluna(n)})),
  // ABRIL
  ...['Samara Oliveira','Aldenilza','Ilda Oliveira','Dilair Vieira','Daniella Rodrigues','Itamara Moura','Raissa Beleboni','Josilena Moita','Mira Pereira','Karini Pereira','Milvaneth Cardoso','Sandra Rocha','Maria Clara Bentes','Pérola Amorim','Márcia Malcher','Inaida Costa','Leandro Ribeiro','Joelma Ribeiro','Livia Lopes','Sophia Neves','Eloisa Aguiar','Graça Rocha','Izolda Omena','Helcimyria Amaral','Maria de Nazaré Castro','Alba Maia','Arnely Neves','Maria José Oliveira','Shirley Marinho','Odilia Godinho','Laiza Silva','Anne Dias','Ester Godinho','Eliene Costa','Emily Nascimento','Aila Maria Sousa','Izete Lima','Isaura Lima','Fernanda Bonfim','Valderice Pereira','Clara Amancio','July Godinho','Laura Amancio','Monica Godinho','Leomara Lobato','Karynna Monteiro','Nice Barreto','Helena Sato','Nerina Hayashida','Wilsiene Diniz','Ariane Salgado','Pamela Garcia','Vilma da Luz','Déborh Marinho','Regina Taketomi','Maria de Sousa','Maria Iêda Amaral','Elaise Souza','Rayene Nascimento','Walleska Trindade','Doracy Carvalho','Niviane Dolzane','Eloyse Carvalho','Elaine Vasconcelos','Lindalva Castro','Joselma Maciel'].map(n=>({nome:n,mes:3,ano:2026,valor:getValorAluna(n)})),
  // MAIO
  ...['Joice Mendonça','Maíra de Figueiredo','Jorge de Figueiredo','Márcia Barbosa','Andressa Pires','Emily Nascimento','Izete Lima','Isaura Lima','Ester Godinho','Eliene Costa','Irio Luiz Orth','Elen Orth','Luciane Budelon Albuquerque','Leomara Lobato','Wilsiene Diniz','Helena Sato','Nerina Hayashida','Antônia Rita','Valderice Pereira','July Godinho','Monica Godinho','Laura Amancio','Clara Amancio','Fernanda Bonfim','Déborh Marinho','Pamela Garcia','Bianca Lima','Ariane Salgado','Regina Taketomi','Vilma da Luz','Elaise Souza','Maria de Sousa','Walleska Trindade','Rayene Nascimento','Eloyse Carvalho','Doracy Carvalho','Niviane Dolzane','Lindalva Castro','Elaine Vasconcelos','Joselma Maciel'].map(n=>({nome:n,mes:4,ano:2026,valor:getValorAluna(n)})),
];

function getValorAluna(nome) {
  const n = nome.trim().toLowerCase();
  const especiais = {
    'lindalva castro':200,'maria josé oliveira':250,'nerina hayashida':120,
    'july godinho':120,'ester godinho':145,'odilia godinho':145,'jamille godinho':145,'rosane santos':145,
    'valderice pereira':150,'anne dias':150,'monica godinho':150,'joelma ribeiro':150,
    'leandro ribeiro':150,'aldenilza':150,'dilair vieira':150,'daniella rodrigues':150,
    'itamara moura':150,'livia lopes':150,'eloisa aguiar':120,'shirley marinho':100,
    'izete lima':170,'isaura lima':170,'elaine vasconcelos':170,'sandra rocha':170,
    'maria de sousa':170,'milvaneth cardoso':180,'karynna monteiro':180,
    'izolda omena':174,'anne gonçalves':174,'elaise souza':60,'nerina hayashida':100,
    'sid':150,'camila lameira':150,'diva lameira':150,'sidney lima':150,
    'maria eunice lopes':170,'lígia rebelo':180,'bianca oliveira':180,
    'larissa sousa':180,'sofia amorim':180,'savia amorim':180,'wilsiene silva':180,
    'keice azevedo':180,'lucilene silva':180,'dienny frota':180,'elke gonçalves':180,
    'lidiane silva':180,'carol rayol':180,'andreza carvalho':180,'nice barreto':180,
    'sophia neves':180,'maria iêda amaral':180,'ilda oliveira':180,'samara oliveira':180,
    'mira pereira':180,'karini pereira':180,'márcia malcher':180,'inaida costa':180,
    'laiza silva':180,'helcimyria amaral':180,'arnely neves':180,'maria clara bentes':180,
    'raissa beleboni':180,'josilena moita':180,'alba maia':180,'graça rocha':180,
    'shirley marinho':180,'milvaneth cardoso':180
  };
  return especiais[n] || 180;
}

// Alunas cadastradas
const ALUNAS_INIT = [
  {id:'a1',nome:'Joselma Maciel',valor:180,dia:1,aniv:'23/10'},
  {id:'a2',nome:'Elaine Vasconcelos',valor:170,dia:1,aniv:'26/02'},
  {id:'a3',nome:'Lindalva Castro',valor:200,dia:1,aniv:''},
  {id:'a4',nome:'Doracy Carvalho',valor:180,dia:2,aniv:''},
  {id:'a5',nome:'Eloyse Carvalho',valor:180,dia:2,aniv:'31/03'},
  {id:'a6',nome:'Vilma da Luz',valor:180,dia:2,aniv:'29/09'},
  {id:'a7',nome:'Nerina Hayashida',valor:100,dia:3,aniv:'17/06'},
  {id:'a8',nome:'Niviane Dolzane',valor:180,dia:2,aniv:''},
  {id:'a9',nome:'Rayene Nascimento',valor:180,dia:3,aniv:''},
  {id:'a10',nome:'Déborh Marinho',valor:180,dia:5,aniv:'15/11'},
  {id:'a11',nome:'Valderice Pereira',valor:150,dia:4,aniv:''},
  {id:'a12',nome:'Maria de Sousa',valor:170,dia:3,aniv:'29/06'},
  {id:'a13',nome:'Walleska Trindade',valor:180,dia:3,aniv:''},
  {id:'a14',nome:'Bianca Lima',valor:180,dia:5,aniv:''},
  {id:'a15',nome:'Helena Sato',valor:180,dia:5,aniv:'22/09'},
  {id:'a16',nome:'Pamela Garcia',valor:180,dia:5,aniv:'25/12'},
  {id:'a17',nome:'July Godinho',valor:120,dia:8,aniv:''},
  {id:'a18',nome:'Ester Godinho',valor:145,dia:10,aniv:'31/07'},
  {id:'a19',nome:'Regina Taketomi',valor:150,dia:5,aniv:''},
  {id:'a20',nome:'Ariane Salgado',valor:180,dia:5,aniv:'23/10'},
  {id:'a21',nome:'Antoni Rita de Sá',valor:180,dia:7,aniv:''},
  {id:'a22',nome:'Monica Godinho',valor:150,dia:7,aniv:''},
  {id:'a23',nome:'Wilsiene Diniz',valor:180,dia:6,aniv:''},
  {id:'a24',nome:'Anne Dias',valor:150,dia:10,aniv:'31/10'},
  {id:'a25',nome:'Leomara Lobato',valor:180,dia:9,aniv:'13/02'},
  {id:'a26',nome:'Clara Amancio',valor:180,dia:9,aniv:''},
  {id:'a27',nome:'Isaura Lima',valor:170,dia:12,aniv:'20/05'},
  {id:'a28',nome:'Maria José Oliveira',valor:250,dia:12,aniv:'15/02'},
  {id:'a29',nome:'Izete Lima',valor:170,dia:12,aniv:''},
  {id:'a30',nome:'Fernanda Bonfim',valor:180,dia:9,aniv:''},
  {id:'a31',nome:'Shirley Marinho',valor:180,dia:12,aniv:''},
  {id:'a32',nome:'Laura Amancio',valor:180,dia:9,aniv:''},
  {id:'a33',nome:'Odilia Godinho',valor:145,dia:15,aniv:''},
  {id:'a34',nome:'Laiza Silva',valor:180,dia:14,aniv:'21/11'},
  {id:'a35',nome:'Izolda Omena',valor:174,dia:15,aniv:'17/05'},
  {id:'a36',nome:'Eliene Costa',valor:180,dia:9,aniv:'24/01'},
  {id:'a37',nome:'Maria de Nazaré Castro',valor:180,dia:13,aniv:''},
  {id:'a38',nome:'Graça Rocha',valor:180,dia:15,aniv:'28/04'},
  {id:'a39',nome:'Alba Maia',valor:180,dia:20,aniv:'20/11'},
  {id:'a40',nome:'Helcimyria Amaral',valor:180,dia:16,aniv:''},
  {id:'a41',nome:'Rosane Santos',valor:145,dia:12,aniv:'31/03'},
  {id:'a42',nome:'Arnely Neves',valor:180,dia:19,aniv:''},
  {id:'a43',nome:'Livia Lopes',valor:180,dia:23,aniv:''},
  {id:'a44',nome:'Joelma Ribeiro',valor:150,dia:23,aniv:''},
  {id:'a45',nome:'Leandro Ribeiro',valor:150,dia:23,aniv:''},
  {id:'a46',nome:'Pérola Amorim',valor:180,dia:24,aniv:'13/09'},
  {id:'a47',nome:'Aila Maria Sousa',valor:180,dia:10,aniv:''},
  {id:'a48',nome:'Emily Nascimento',valor:180,dia:12,aniv:''},
  {id:'a49',nome:'Sandra Rocha',valor:170,dia:26,aniv:''},
  {id:'a50',nome:'Josilena Moita',valor:180,dia:28,aniv:''},
  {id:'a51',nome:'Raissa Beleboni',valor:180,dia:28,aniv:''},
  {id:'a52',nome:'Itamara Moura',valor:150,dia:29,aniv:''},
  {id:'a53',nome:'Daniella Rodrigues',valor:150,dia:29,aniv:''},
  {id:'a54',nome:'Milvaneth Cardoso',valor:180,dia:16,aniv:''},
  {id:'a55',nome:'Karynna Monteiro',valor:180,dia:19,aniv:'19/08'},
  {id:'a56',nome:'Aldenilza',valor:150,dia:30,aniv:''},
  {id:'a57',nome:'Germana Baró',valor:180,dia:14,aniv:''},
  {id:'a58',nome:'Ilda Oliveira',valor:180,dia:29,aniv:''},
  {id:'a59',nome:'Inaida Costa',valor:180,dia:23,aniv:''},
  {id:'a60',nome:'Márcia Malcher',valor:180,dia:23,aniv:''},
  {id:'a61',nome:'Maria Clara Bentes',valor:180,dia:27,aniv:''},
  {id:'a62',nome:'Karini Pereira',valor:180,dia:28,aniv:''},
  {id:'a63',nome:'Mira Pereira',valor:180,dia:28,aniv:''},
  {id:'a64',nome:'Samara Oliveira',valor:180,dia:28,aniv:''},
  {id:'a65',nome:'Dilair Vieira',valor:150,dia:30,aniv:''},
  {id:'a66',nome:'Jamille Godinho',valor:145,dia:30,aniv:'28/06'},
  {id:'a67',nome:'Luciane Budelon Albuquerque',valor:180,dia:11,aniv:'26/07'},
  {id:'a68',nome:'Elen Orth',valor:180,dia:13,aniv:''},
  {id:'a69',nome:'Irio Luiz Orth',valor:180,dia:13,aniv:''},
  {id:'a70',nome:'Jorge de Figueiredo',valor:180,dia:12,aniv:''},
  {id:'a71',nome:'Maíra de Figueiredo',valor:180,dia:12,aniv:''},
  {id:'a72',nome:'Andressa Pires',valor:180,dia:13,aniv:'27/05'},
  {id:'a73',nome:'Márcia Barbosa',valor:180,dia:13,aniv:''},
  {id:'a74',nome:'Joice Mendonça',valor:180,dia:13,aniv:''}
];

// ── STORAGE ─────────────────────────────────────────────────
const REMOTE_STORAGE = {
  enabled: false,
  provider: 'firebase',
  rootPath: 'studio_g',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
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

async function remoteSave(k,v){
  if(!REMOTE_STORAGE.enabled || !REMOTE_STORAGE.db) return;
  try{
    await REMOTE_STORAGE.db.ref(`${REMOTE_STORAGE.rootPath}/${k}`).set(v);
  }catch(e){
    console.warn('Remote save failed:', e);
  }
}

function load(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){} if(REMOTE_STORAGE.enabled) remoteSave(k,v);}

initRemoteStorage();

let alunas = load('sg_alunas', ALUNAS_INIT);

// Init pagamentos com dados 2026
let pagamentos = load('sg_pags', null);
if(!pagamentos){
  pagamentos = PAGS_2026.map((p,i)=>({id:'p'+i,...p}));
  save('sg_pags', pagamentos);
}

const GASTOS_2026 = [
  {id:'g1',desc:'Unimed',mes:0,ano:2026,valor:280},{id:'g2',desc:'Cartão Bradesco/carro',mes:0,ano:2026,valor:3280},
  {id:'g3',desc:'Supermercado/feira',mes:0,ano:2026,valor:500},{id:'g4',desc:'Energia',mes:0,ano:2026,valor:345},
  {id:'g5',desc:'Aniversário pai',mes:0,ano:2026,valor:280},{id:'g6',desc:'Roupa',mes:0,ano:2026,valor:360},
  {id:'g7',desc:'Contador',mes:0,ano:2026,valor:420},{id:'g8',desc:'Internet',mes:0,ano:2026,valor:137},
  {id:'g9',desc:'Maria',mes:0,ano:2026,valor:200},{id:'g10',desc:'Farmácia',mes:0,ano:2026,valor:100},
  {id:'g11',desc:'Sítio/comida',mes:0,ano:2026,valor:180},{id:'g12',desc:'Academia',mes:0,ano:2026,valor:289},
  {id:'g13',desc:'Combustível',mes:0,ano:2026,valor:50},{id:'g14',desc:'Spotify',mes:0,ano:2026,valor:50},
  {id:'g15',desc:'Açaí',mes:0,ano:2026,valor:100},{id:'g16',desc:'Farmácia 2',mes:0,ano:2026,valor:60},
  {id:'g17',desc:'Imposto Studio',mes:0,ano:2026,valor:445},{id:'g18',desc:'Supermercado',mes:0,ano:2026,valor:280},
  {id:'g19',desc:'Combustível 2',mes:0,ano:2026,valor:100},{id:'g20',desc:'Farmácia 3',mes:0,ano:2026,valor:50},
  {id:'g21',desc:'Lanche/bijú/presente',mes:0,ano:2026,valor:100},{id:'g22',desc:'Jantar',mes:0,ano:2026,valor:40},
  {id:'g23',desc:'Urbano',mes:0,ano:2026,valor:40},{id:'g24',desc:'Unimed 2',mes:0,ano:2026,valor:244},
  {id:'g25',desc:'Mês seguinte',mes:0,ano:2026,valor:180},
  // FEVEREIRO
  {id:'g26',desc:'Alex',mes:1,ano:2026,valor:250},{id:'g27',desc:'Unimed',mes:1,ano:2026,valor:280},
  {id:'g28',desc:'Lanche',mes:1,ano:2026,valor:100},{id:'g29',desc:'Gás',mes:1,ano:2026,valor:90},
  {id:'g30',desc:'Cartão/carro',mes:1,ano:2026,valor:2900},{id:'g31',desc:'Urbano Alex',mes:1,ano:2026,valor:190},
  {id:'g32',desc:'Alex/combustível',mes:1,ano:2026,valor:300},{id:'g33',desc:'Comida semana',mes:1,ano:2026,valor:200},
  {id:'g34',desc:'Supermercado',mes:1,ano:2026,valor:500},{id:'g35',desc:'Energia',mes:1,ano:2026,valor:305},
  {id:'g36',desc:'Internet',mes:1,ano:2026,valor:137},{id:'g37',desc:'Carne/feira',mes:1,ano:2026,valor:250},
  {id:'g38',desc:'Contador',mes:1,ano:2026,valor:420},{id:'g39',desc:'Presente Eduardo',mes:1,ano:2026,valor:30},
  {id:'g40',desc:'Final de semana',mes:1,ano:2026,valor:150},{id:'g41',desc:'Spotify',mes:1,ano:2026,valor:40},
  {id:'g42',desc:'Netflix',mes:1,ano:2026,valor:60},{id:'g43',desc:'Alex',mes:1,ano:2026,valor:100},
  {id:'g44',desc:'Farmácia',mes:1,ano:2026,valor:70},{id:'g45',desc:'Patrocínio insta',mes:1,ano:2026,valor:50},
  {id:'g46',desc:'Final de semana 2',mes:1,ano:2026,valor:100},{id:'g47',desc:'Dízimo',mes:1,ano:2026,valor:30},
  {id:'g48',desc:'Maria',mes:1,ano:2026,valor:80},{id:'g49',desc:'Carne semana',mes:1,ano:2026,valor:180},
  {id:'g50',desc:'Casa',mes:1,ano:2026,valor:80},{id:'g51',desc:'Roupa aniver. Ivete',mes:1,ano:2026,valor:50},
  {id:'g52',desc:'Açaí',mes:1,ano:2026,valor:25},{id:'g53',desc:'Farmácia 2',mes:1,ano:2026,valor:30},
  {id:'g54',desc:'Aniversário mãe',mes:1,ano:2026,valor:900},{id:'g55',desc:'Combustível',mes:1,ano:2026,valor:100},
  {id:'g56',desc:'Alter',mes:1,ano:2026,valor:70},{id:'g57',desc:'Carne semana 2',mes:1,ano:2026,valor:100},
  {id:'g58',desc:'Patrocínio insta 2',mes:1,ano:2026,valor:65},{id:'g59',desc:'Imposto',mes:1,ano:2026,valor:112},
  {id:'g60',desc:'Para março',mes:1,ano:2026,valor:116},{id:'g61',desc:'Fev/março',mes:1,ano:2026,valor:145},
  // MARÇO
  {id:'g62',desc:'Unimed',mes:2,ano:2026,valor:281},{id:'g63',desc:'Imposto',mes:2,ano:2026,valor:340},
  {id:'g64',desc:'Casa',mes:2,ano:2026,valor:100},{id:'g65',desc:'Super/dia da mulher/niver',mes:2,ano:2026,valor:500},
  {id:'g66',desc:'Farmácia',mes:2,ano:2026,valor:68},{id:'g67',desc:'Urbano',mes:2,ano:2026,valor:40},
  {id:'g68',desc:'Parcela aparelhos',mes:2,ano:2026,valor:2000},{id:'g69',desc:'Carro',mes:2,ano:2026,valor:2016},
  {id:'g70',desc:'Energia',mes:2,ano:2026,valor:290},{id:'g71',desc:'Roupa dança',mes:2,ano:2026,valor:100},
  {id:'g72',desc:'Carne semana',mes:2,ano:2026,valor:80},{id:'g73',desc:'Roupa/make/aniver',mes:2,ano:2026,valor:900},
  {id:'g74',desc:'Internet',mes:2,ano:2026,valor:137},{id:'g75',desc:'Peixe',mes:2,ano:2026,valor:85},
  {id:'g76',desc:'Vivo',mes:2,ano:2026,valor:58},{id:'g77',desc:'Meia',mes:2,ano:2026,valor:40},
  {id:'g78',desc:'Combustível',mes:2,ano:2026,valor:100},{id:'g79',desc:'Farmácia 2',mes:2,ano:2026,valor:55},
  {id:'g80',desc:'Supermercado/feira',mes:2,ano:2026,valor:510},{id:'g81',desc:'Contador',mes:2,ano:2026,valor:420},
  {id:'g82',desc:'Unha/urbano',mes:2,ano:2026,valor:170},{id:'g83',desc:'Lanche/jantar',mes:2,ano:2026,valor:100},
  {id:'g84',desc:'Alex',mes:2,ano:2026,valor:485},{id:'g85',desc:'Balança',mes:2,ano:2026,valor:80},
  {id:'g86',desc:'Alex cartão',mes:2,ano:2026,valor:350},{id:'g87',desc:'Mercado do bairro',mes:2,ano:2026,valor:60},
  {id:'g88',desc:'Carne',mes:2,ano:2026,valor:125},{id:'g89',desc:'Final de semana',mes:2,ano:2026,valor:130},
  {id:'g90',desc:'Combustível 2',mes:2,ano:2026,valor:50},{id:'g91',desc:'Impostos',mes:2,ano:2026,valor:460},
  {id:'g92',desc:'Aniversário',mes:2,ano:2026,valor:720},{id:'g93',desc:'Para abril',mes:2,ano:2026,valor:303},
  // ABRIL
  {id:'g94',desc:'Sítio',mes:3,ano:2026,valor:336},{id:'g95',desc:'Cartão de crédito/carro',mes:3,ano:2026,valor:2800},
  {id:'g96',desc:'Urbano',mes:3,ano:2026,valor:300},{id:'g97',desc:'Ingresso',mes:3,ano:2026,valor:256},
  {id:'g98',desc:'Energia',mes:3,ano:2026,valor:290},{id:'g99',desc:'Tia Monica',mes:3,ano:2026,valor:500},
  {id:'g100',desc:'Pai',mes:3,ano:2026,valor:800},{id:'g101',desc:'Gás',mes:3,ano:2026,valor:100},
  {id:'g102',desc:'Conta Vivo',mes:3,ano:2026,valor:58},{id:'g103',desc:'Pati. Cabelo',mes:3,ano:2026,valor:150},
  {id:'g104',desc:'Avaliação academia',mes:3,ano:2026,valor:200},{id:'g105',desc:'Whey',mes:3,ano:2026,valor:115},
  {id:'g106',desc:'Shirley calcinha',mes:3,ano:2026,valor:143},{id:'g107',desc:'Unha',mes:3,ano:2026,valor:150},
  {id:'g108',desc:'Maria',mes:3,ano:2026,valor:20},{id:'g109',desc:'Farmácia',mes:3,ano:2026,valor:50},
  {id:'g110',desc:'Maquiagem Josi',mes:3,ano:2026,valor:165},{id:'g111',desc:'Combustível Alex',mes:3,ano:2026,valor:70},
  {id:'g112',desc:'Supermercado',mes:3,ano:2026,valor:419},{id:'g113',desc:'Cabelo/unha',mes:3,ano:2026,valor:260},
  {id:'g114',desc:'Urbano 2',mes:3,ano:2026,valor:40},{id:'g115',desc:'Almoço',mes:3,ano:2026,valor:70},
  {id:'g116',desc:'Jantar',mes:3,ano:2026,valor:65},{id:'g117',desc:'Internet',mes:3,ano:2026,valor:137},
  {id:'g118',desc:'Roupa',mes:3,ano:2026,valor:95},{id:'g119',desc:'Spotify',mes:3,ano:2026,valor:41},
  {id:'g120',desc:'Final de semana',mes:3,ano:2026,valor:240},{id:'g121',desc:'Lavanderia',mes:3,ano:2026,valor:40},
  {id:'g122',desc:'Sushi',mes:3,ano:2026,valor:50},{id:'g123',desc:'Contador',mes:3,ano:2026,valor:420},
  {id:'g124',desc:'Remédio',mes:3,ano:2026,valor:41},{id:'g125',desc:'Combustível',mes:3,ano:2026,valor:50},
  {id:'g126',desc:'Feira',mes:3,ano:2026,valor:240},{id:'g127',desc:'Pai 2',mes:3,ano:2026,valor:360},
  {id:'g128',desc:'Farmácia 2',mes:3,ano:2026,valor:40},{id:'g129',desc:'Mãe',mes:3,ano:2026,valor:25},
  {id:'g130',desc:'Roupa 2',mes:3,ano:2026,valor:80},{id:'g131',desc:'Imposto Studio DAS',mes:3,ano:2026,valor:114},
  {id:'g132',desc:'Central de ar',mes:3,ano:2026,valor:800},{id:'g133',desc:'Imposto',mes:3,ano:2026,valor:343},
  {id:'g134',desc:'Farmácia 3',mes:3,ano:2026,valor:133},{id:'g135',desc:'Cadeiras',mes:3,ano:2026,valor:110},
  {id:'g136',desc:'Casa',mes:3,ano:2026,valor:100},{id:'g137',desc:'Roupa 3',mes:3,ano:2026,valor:75},
  {id:'g138',desc:'Maria',mes:3,ano:2026,valor:100},{id:'g139',desc:'Maio',mes:3,ano:2026,valor:429},
  // MAIO
  {id:'g140',desc:'Lavanderia',mes:4,ano:2026,valor:40},{id:'g141',desc:'Almoço',mes:4,ano:2026,valor:78},
  {id:'g142',desc:'Unimed',mes:4,ano:2026,valor:281},{id:'g143',desc:'Cartão de crédito',mes:4,ano:2026,valor:2409},
  {id:'g144',desc:'Combustível',mes:4,ano:2026,valor:100},{id:'g145',desc:'Parcela tia Monica',mes:4,ano:2026,valor:500},
  {id:'g146',desc:'Aparelhos',mes:4,ano:2026,valor:400},{id:'g147',desc:'Imposto de Renda Alex',mes:4,ano:2026,valor:120},
  {id:'g148',desc:'Dia das mães',mes:4,ano:2026,valor:369},{id:'g149',desc:'Endócrino',mes:4,ano:2026,valor:300},
];

let gastos = load('sg_gastos', null);
if(!gastos){ gastos = GASTOS_2026; save('sg_gastos', gastos); }

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
function closeModal(id){document.getElementById(id).classList.remove('open');}
document.querySelectorAll('.overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open');}));
function openAdd(){
  const s=state.screen;
  if(navBtns.length===0) initNav();
  if(s==='alunas'){openModal('modal-aluna');return;}
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

let presencas = load('sg_presencas', {});

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
    <button onclick="if(confirm('Remover ${a.nome.replace(/'/g,"\\'")}?')){removeAluna('${a.id}');closeModal('modal-det');}" class="btn-danger">Remover aluna</button>
  `;
  openModal('modal-det');
}

function removeAluna(id){alunas=alunas.filter(a=>a.id!==id);save('sg_alunas',alunas);renderAlunas();}

function toggleDia(btn) { btn.classList.toggle('sel'); }

function saveAluna(){
  const nome=document.getElementById('a-nome').value.trim();
  const valor=parseFloat(document.getElementById('a-valor').value)||180;
  const dia=parseInt(document.getElementById('a-dia').value)||1;
  const aniv=document.getElementById('a-aniv').value.trim();
  const horario=document.getElementById('a-horario').value;
  const dias=[...document.querySelectorAll('#dias-semana-picker .dia-pill.sel')].map(b=>parseInt(b.dataset.dia));
  if(!nome)return alert('Informe o nome');
  alunas.push({id:uid(),nome,valor,dia,aniv,horario,dias});
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
renderHome();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}
