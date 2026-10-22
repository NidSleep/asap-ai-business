const root=document.documentElement;
const toggle=document.querySelector('.lang-toggle');
const optionButtons=[...document.querySelectorAll('.diagnostic-options button')];
const titleEl=document.getElementById('result-title');
const beforeEl=document.getElementById('result-before');
const actionEl=document.getElementById('result-action');
const outcomeEl=document.getElementById('result-outcome');
const diagnosticCta=document.getElementById('diagnostic-cta');

const diagnostics={
  slow_reply:{
    en:{title:'Respond while intent is still high.',before:'A good lead waits. Interest cools.',action:'Replies instantly and understands the request.',outcome:'Receives a clearer opportunity to follow up.'},
    zh:{title:'在购买意愿最高时及时回应。',before:'优质 Lead 等待回复，兴趣逐渐下降。',action:'即时回复并理解顾客需求。',outcome:'收到更清楚、更值得跟进的商机。'}
  },
  follow_up:{
    en:{title:'Keep the conversation moving.',before:'The first reply happens, then follow-up disappears.',action:'Remembers context and continues the right conversation.',outcome:'Knows who needs attention and why.'},
    zh:{title:'让销售对话持续推进。',before:'完成首次回复后，跟进就中断了。',action:'保留上下文，并继续正确的对话。',outcome:'知道应该跟进谁，以及原因。'}
  },
  qualification:{
    en:{title:'Spend human time on stronger opportunities.',before:'The team treats every enquiry the same.',action:'Asks relevant questions and captures useful facts.',outcome:'Focuses on qualified leads with context.'},
    zh:{title:'把真人时间留给更好的商机。',before:'团队用同样方式处理所有询盘。',action:'追问相关问题并整理有用资料。',outcome:'集中处理有上下文的合格 Lead。'}
  },
  booking:{
    en:{title:'Remove friction before the booking.',before:'Customers ask, wait and leave before confirming.',action:'Explains the next step and guides booking details.',outcome:'Receives a prepared booking request.'},
    zh:{title:'减少顾客完成预约前的阻力。',before:'顾客询问后等待，最终没有确认。',action:'说明下一步并引导完成预约资料。',outcome:'收到已经整理好的预约需求。'}
  },
  visibility:{
    en:{title:'Turn conversations into sales context.',before:'Important patterns stay buried inside chat history.',action:'Structures goals, objections and current status.',outcome:'Sees what is happening without reading every chat.'},
    zh:{title:'把对话转成清晰的销售信息。',before:'重要趋势埋在大量聊天记录里。',action:'整理目标、疑虑和当前状态。',outcome:'无需阅读每段对话，也能掌握情况。'}
  }
};

const resultEl=document.querySelector('.diagnostic-result');

let selected='slow_reply';
function currentLang(){return root.dataset.lang==='zh'?'zh':'en'}
function readSavedLanguage(){try{return localStorage.getItem('asap-language')}catch(error){return null}}
function saveLanguage(lang){try{localStorage.setItem('asap-language',lang)}catch(error){}}
function renderDiagnostic(){
  const content=diagnostics[selected][currentLang()];
  titleEl.textContent=content.title;
  beforeEl.textContent=content.before;
  actionEl.textContent=content.action;
  outcomeEl.textContent=content.outcome;
  diagnosticCta.href=`https://t.me/presale_copyabc_bot?start=${selected}`;
  optionButtons.forEach(button=>{
    const active=button.dataset.key===selected;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
}
function setLanguage(lang){
  root.dataset.lang=lang;
  root.lang=lang==='zh'?'zh-Hans':'en';
  document.querySelectorAll('[data-en][data-zh]').forEach(el=>{el.textContent=el.dataset[lang]});
  document.querySelectorAll('[data-aria-en][data-aria-zh]').forEach(el=>el.setAttribute('aria-label',lang==='zh'?el.dataset.ariaZh:el.dataset.ariaEn));
  toggle.querySelectorAll('span').forEach((el,index)=>el.classList.toggle('active',lang==='en'?index===0:index===1));
  toggle.setAttribute('aria-label',lang==='zh'?'切换到英文 (English)':'Switch to Chinese (中文)');
  document.title=lang==='zh'?'Wave AI — 推动 Lead 进入下一步':'Wave AI — AI Sales Agents That Move Leads Forward';
  saveLanguage(lang);
  renderDiagnostic();
}
optionButtons.forEach(button=>button.addEventListener('click',()=>{
  if(button.dataset.key===selected)return;
  selected=button.dataset.key;
  renderDiagnostic();
  resultEl.classList.remove('refresh');
  void resultEl.offsetWidth;
  resultEl.classList.add('refresh');
}));
toggle.addEventListener('click',()=>setLanguage(currentLang()==='en'?'zh':'en'));
const saved=readSavedLanguage();
const browserZh=navigator.language&&navigator.language.toLowerCase().startsWith('zh');
setLanguage(saved==='zh'||saved==='en'?saved:(browserZh?'zh':'en'));
document.getElementById('year').textContent=new Date().getFullYear();
