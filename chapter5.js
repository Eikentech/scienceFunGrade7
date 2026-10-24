'use strict';
const $ = selector => document.querySelector(selector);
const KEY = 'scienceFunGrade7.heatLab.v1';
const questions = [
 {level:1,q:'A thermometer settles at the same temperature as the water around its bulb. What has it reached?',a:['Thermal equilibrium','The boiling point','Maximum heat energy'],c:0,why:'At thermal equilibrium the bulb and water have equal temperatures, so there is no net heat transfer between them.',hint:'The important condition is equal temperature, not a particular number.'},
 {level:1,q:'Pure ice is melting at 0°C while a heater supplies energy. Why can its temperature stay constant?',a:['No energy enters the ice','The energy helps change its state','The thermometer must be broken'],c:1,why:'During melting at fixed pressure, energy changes the solid into liquid instead of raising its temperature.',hint:'Think about which effect of heating is happening.'},
 {level:1,q:'Which statement uses the correct units?',a:['Heat: kelvin; temperature: joule','Heat: degree Celsius; temperature: calorie','Heat: joule; temperature: kelvin'],c:2,why:'Heat is transferred energy, measured in joules. Kelvin is the SI unit of temperature.',hint:'Match the energy quantity to an energy unit.'},
 {level:1,q:'Which method suits a traditional laboratory thermometer in warm water?',a:['Read it after lifting it out','Keep its bulb immersed, off the container, and read at eye level','Rest its bulb on the hot metal base'],c:1,why:'The immersed bulb senses the water. Contact with the base can measure the container instead; eye-level reading reduces parallax.',hint:'You want the water’s temperature, without a viewing-angle error.'},
 {level:1,q:'Convert 50°C to °F. Enter the number only.',numeric:true,answer:122,tolerance:0.01,unit:'°F',why:'F = 9 × 50 ÷ 5 + 32 = 90 + 32 = 122°F.',hint:'Multiply 50 by 9/5, then add 32.'},
 {level:1,q:'Temperature rises from 20°C to 35°C. What is the rise in kelvin?',numeric:true,answer:15,tolerance:0.01,unit:'K',why:'The rise is 35 − 20 = 15°C. A Celsius interval and a kelvin interval have the same size, so the rise is 15 K.',hint:'Calculate the change first. Do not add 273.15 to a change.'},
 {level:2,q:'A free metal ring is heated uniformly. What usually happens to its hole?',a:['It gets smaller','It stays the same','It gets larger'],c:2,why:'The whole shape expands, including the hole. Imagine a matching metal disc expanding along with the ring.',hint:'All lengths scale up together; metal is not simply pushed into the opening.'},
 {level:2,q:'Metal A expands more than B when heated. They are bonded into a strip. Which way does it bend?',a:['Toward B, with A on the outside','Toward A, with B on the outside','It cannot bend'],c:0,why:'A becomes the longer outside curve. B is the shorter inside curve, so the strip bends toward B.',hint:'The outside of a curve must be longer than the inside.'},
 {level:2,q:'What happens to liquid water as it warms from 0°C to 4°C?',a:['It expands and becomes less dense','It contracts and becomes denser','Its particles grow'],c:1,why:'Water behaves unusually in this interval: its volume decreases and its density increases, reaching maximum density at about 4°C.',hint:'Water is densest at about 4°C.'},
 {level:2,q:'Why do bridges include expansion joints?',a:['To make the bridge colder','To stop all expansion','To allow temperature-related movement'],c:2,why:'Expansion joints accommodate expansion and contraction and help avoid damaging stresses.',hint:'Engineering often allows a natural change instead of trying to prevent it.'},
 {level:2,q:'A gas is heated inside a rigid sealed container. Which explanation is best?',a:['Its volume must increase','Its pressure can rise because its volume cannot increase','The gas disappears'],c:1,why:'The rigid container fixes the volume. More energetic particle collisions can increase pressure. Gas-expansion claims need the right conditions.',hint:'Can the container get bigger in this question?'},
 {level:2,q:'The hole of a heated ring grows by 0.2 mm from an initial diameter of 20 mm. What is its new diameter?',numeric:true,answer:20.2,tolerance:0.001,unit:'mm',why:'New diameter = initial diameter + increase = 20 + 0.2 = 20.2 mm.',hint:'The question gives the increase. Add it to the original diameter.'},
 {level:3,q:'On a typical calm coastal afternoon, the surface sea breeze travels…',a:['From sea to land','From land to sea','Only straight upward'],c:0,why:'Land often warms faster. Air rises over warmer land, and cooler air from the sea moves inland near the surface.',hint:'Which surface is usually cooler during the day?'},
 {level:3,q:'Why does a vacuum gap help a flask retain warmth?',a:['It blocks all radiation','It makes heat','It greatly reduces conduction and prevents convection across the gap'],c:2,why:'With almost no particles in the gap, there is very little conduction and no fluid to circulate. Radiation can still cross the vacuum.',hint:'Which transfer methods need matter?'},
 {level:3,q:'What is the main job of silvered surfaces inside a vacuum flask?',a:['Stop all conduction through the neck','Reduce transfer by thermal radiation','Create convection currents'],c:1,why:'Shiny metal surfaces reflect radiation well and are poor emitters compared with dull dark surfaces at the same temperature.',hint:'A vacuum does not stop every route of energy transfer.'},
 {level:3,q:'Why put a heater low in a room rather than expecting warm air to sink from the ceiling?',a:['Natural convection carries warmer air upward','Heat can only move upward','Cold air has no particles'],c:0,why:'Warmer air is often less dense than surrounding cooler air and rises, helping circulation. Heat itself can transfer in any direction.',hint:'Distinguish the movement of warm air from heat transfer in general.'},
 {level:3,q:'To compare black and shiny surfaces under a lamp, which experiment is fairest?',a:['Use different sizes and different distances','Use equal containers, water amounts, starting temperatures, distances and times','Change the surface and the lamp power together'],c:1,why:'Change the surface finish while keeping the other factors comparable. Otherwise you cannot tell what caused the difference.',hint:'A fair test changes one factor at a time.'},
 {level:3,q:'Which is the best explanation of why the same flask can keep a drink warm or cold?',a:['The flask senses which temperature you want','It creates cold for cold drinks','It slows energy transfer in either direction'],c:2,why:'For a hot drink it slows energy leaving. For a cold drink it slows energy entering from warmer surroundings.',hint:'Compare the drink’s temperature with its surroundings.'}
];
let progress = {};
try { const saved = JSON.parse(localStorage.getItem(KEY) || '{}'); if(saved && typeof saved === 'object' && !Array.isArray(saved)) progress = saved; } catch {}
function mastered(i) { return progress[i]?.mastered === true; }
function updateProgress() {
 const count = questions.filter((_,i)=>mastered(i)).length;
 $('#score').textContent = `${count} / ${questions.length} mastered`;
 $('#progress').style.width = `${count/questions.length*100}%`;
 if(count === questions.length) {
  $('#finishTitle').textContent = 'You are a Heat Lab problem solver!';
  $('#finishText').textContent = 'All three levels mastered. Use your report to explain one idea you changed your mind about.';
  $('#badge').innerHTML = '<span class="badge">★ Heat Lab · 18 ideas mastered</span>';
 }
 try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch {}
}
questions.forEach((q,i)=>{
 const box=document.createElement('article'); box.className='quizItem'; box.id=`question-${i+1}`;
 const title=document.createElement('h4'); title.textContent=`${(i%6)+1}. ${q.q}`;
 const controls=document.createElement('div'); controls.className='options';
 const feedback=document.createElement('p'); feedback.className='feedback'; feedback.setAttribute('aria-live','polite');
 const hint=document.createElement('p'); hint.className='hint';
 let choices=[];
 function submit(correct,selected) {
  progress[i] = {mastered: mastered(i)||correct, attempts:(Number(progress[i]?.attempts)||0)+1};
  choices.forEach(b=>{b.classList.remove('correct','incorrect'); b.setAttribute('aria-pressed','false')});
  if(selected){ selected.classList.add(correct?'correct':'incorrect'); selected.setAttribute('aria-pressed','true'); }
  if(correct){feedback.textContent='✓ Explained: '+q.why; hint.textContent='';}
  else {feedback.textContent='Not yet. Try again.';hint.textContent='Hint: '+q.hint;}
  updateProgress();
 }
 if(q.numeric) {
  const label=document.createElement('label'); label.htmlFor=`answer-${i}`; label.textContent=`Your answer (${q.unit})`;
  const input=document.createElement('input');input.id=`answer-${i}`;input.type='number';input.step='any';input.inputMode='decimal';
  const check=document.createElement('button');check.textContent='Check answer';
  const action=()=>{ if(!input.value.trim()||!Number.isFinite(input.valueAsNumber)){ feedback.textContent='Enter a number first.';return;} submit(Math.abs(input.valueAsNumber-q.answer)<=q.tolerance); };
  check.onclick=action; input.onkeydown=e=>{if(e.key==='Enter')action()};controls.append(label,input,check);
 } else {
  q.a.forEach((text,j)=>{const b=document.createElement('button');b.textContent=text;b.onclick=()=>submit(j===q.c,b);choices.push(b);controls.append(b)});
 }
 if(mastered(i)){feedback.textContent='✓ Previously mastered. '+q.why;if(!q.numeric)choices[q.c].classList.add('correct');}
 box.append(title,controls,feedback,hint);$('#quiz'+q.level).append(box);
});
updateProgress();
const fmt=n=>Number(n.toFixed(2)).toString();
function thermometer(){const d=+$('#division').value;$('#divisionValue').textContent=d;$('#column').style.height=`${d*5}%`;$('#thermoFeedback').textContent='';}
$('#division').oninput=thermometer;
$('#checkThermo').onclick=()=>{const val=$('#thermoAnswer').value;const expected=+$('#division').value*5;$('#thermoFeedback').textContent=val.trim()===''?'Enter a reading first.':Math.abs(Number(val)-expected)<0.01?`✓ Correct: 100 ÷ 20 = 5°C per interval; ${$('#division').value} × 5 = ${expected}°C.`:'Try again: divide 100 degrees by 20 intervals, then multiply by the selected interval count.';};thermometer();
function convert(){const raw=$('#celsius').value,c=Number(raw),valid=raw.trim()!==''&&Number.isFinite(c)&&c>=-273.15&&c<=10000;$('#conversionError').textContent=valid?'':'Enter a temperature from −273.15°C to 10,000°C for this calculator.';if(!valid){['outC','outF','outK'].forEach(id=>$('#'+id).textContent='—');$('#conversionSteps').textContent='';return;}$('#outC').textContent=fmt(c);$('#outF').textContent=fmt(c*9/5+32);$('#outK').textContent=fmt(c+273.15);$('#conversionSteps').textContent=`F = (${fmt(c)} × 9 ÷ 5) + 32 = ${fmt(c*9/5+32)}°F. K = ${fmt(c)} + 273.15 = ${fmt(c+273.15)} K.`;}
$('#celsius').oninput=convert;document.querySelectorAll('[data-temp]').forEach(b=>b.onclick=()=>{$('#celsius').value=b.dataset.temp;convert()});convert();
function bimetal(){
 const t=+$('#stripTemp').value,angle=(t-20)/80*.65;
 $('#stripTempValue').textContent=t;
 if(angle<.001){$('#metalA').setAttribute('d','M55 110 L355 110');$('#metalB').setAttribute('d','M55 123 L355 123');}
 else {const radius=300/angle;const x=55+radius*Math.sin(angle),y=110+radius*(1-Math.cos(angle));const inner=radius-13;const bx=55+inner*Math.sin(angle),by=110+radius-inner*Math.cos(angle);$('#metalA').setAttribute('d',`M55 110 A${radius} ${radius} 0 0 1 ${x} ${y}`);$('#metalB').setAttribute('d',`M55 123 A${inner} ${inner} 0 0 1 ${bx} ${by}`);}
 const on=t<60;
 $('#switchBlade').setAttribute('d',on?'M80 140 L80 90':'M80 140 L115 107');
 $('#switchBlade').setAttribute('stroke',on?'#1d604c':'#a26444');
 $('#thermoWires').setAttribute('stroke',on?'#1d604c':'#83938a');
 $('#heaterCoil').setAttribute('stroke',on?'#d55c32':'#83938a');
 $('#circuitState').textContent=on?'Current flows':'Gap: no current';
 $('#bendReason').textContent=t===20?'At 20°C the strip is straight. The two bonded layers are at their starting lengths.':'Orange A becomes the longer outside curve. The strip bends downward, toward blue B, which expands less.';
 $('#switchReason').textContent=on?'CLOSED means touching contacts: the circuit is complete, so current flows and the heater receives energy.':'OPEN means separated contacts: the gap breaks the circuit, so no current flows through the heater.';
 $('#stripState').textContent=on?(t===20?'Cooler → straight strip → closed switch → heater ON.':'Warming → strip bends → switch still closed → heater ON.'):'Hot enough → strip triggers switch to open → heater OFF. The heater remains hot and cools gradually.';
}

$('#stripTemp').oninput=bimetal;bimetal();
function water(){const t=+$('#waterTemp').value;$('#waterTempValue').textContent=t;$('#waterVolume').style.width=(190+(t-4)*(t-4)*1.4)+'px';$('#waterState').textContent=t<4?`${t}°C: warming toward 4°C makes this same mass contract and become denser.`:t===4?'4°C: smallest volume and greatest density for this mass of liquid water.':`${t}°C: above 4°C, further warming makes this mass expand and become less dense.`;}
$('#waterTemp').oninput=water;water();
function breeze(day){$('#day').setAttribute('aria-pressed',String(day));$('#night').setAttribute('aria-pressed',String(!day));$('#landLabel').textContent=day?'warmer · air rises':'cooler · air sinks';$('#seaLabel').textContent=day?'cooler · air sinks':'warmer · air rises';$('#surfaceWind').textContent=day?'←':'→';$('#upperWind').textContent=day?'→':'←';$('#breezeState').textContent=day?'Day: SEA → LAND at the surface. Air rises over warmer land; air returns toward the sea higher up.':'Night: LAND → SEA at the surface. Land cools faster; air rises over the relatively warmer sea and returns aloft.';}
$('#day').onclick=()=>breeze(true);$('#night').onclick=()=>breeze(false);breeze(true);
$('#testFlask').onclick=()=>{const gap=$('#flaskGap').value,surface=$('#flaskSurface').value,lid=$('#flaskLid').value;const lines=[];let good=0;if(gap==='vacuum'){good++;lines.push('✓ Vacuum: greatly reduces conduction and prevents convection across the gap; radiation can still pass.');}else if(gap==='air')lines.push('Improve the gap: air slows conduction, but can still transfer energy and may circulate. Try a vacuum.');else lines.push('Improve the gap: a metal bridge conducts energy between the walls. Try a vacuum.');if(surface==='shiny'){good++;lines.push('✓ Shiny surfaces: reduce radiation transfer.');}else lines.push('Improve the surface: dull black surfaces absorb and emit radiation well. Try shiny surfaces.');if(lid==='insulated'){good++;lines.push('✓ Insulating stopper: reduces conduction, air exchange, and evaporation at the neck.');}else lines.push('Improve the neck: an open top allows air exchange and evaporation. Fit an insulating stopper.');const area=$('#flaskFeedback');area.replaceChildren();const heading=document.createElement('p');heading.textContent=`${good}/3 defences chosen${good===3?' · Excellent design!':''}`;area.append(heading);lines.forEach(line=>{const p=document.createElement('p');p.textContent=line;area.append(p)});};
['flaskGap','flaskSurface','flaskLid'].forEach(id=>$('#'+id).onchange=()=>{$('#flaskFeedback').textContent='Design changed. Test again to compare your defences.';});
$('#download').onclick=()=>{const lines=['SCIENCE FUN GRADE 7 — HEAT LAB','Learning report (correct answers may follow hints or retries)',''];for(let level=1;level<=3;level++){const ids=questions.map((q,i)=>q.level===level?i:-1).filter(i=>i>=0);lines.push(`Level ${level}: ${ids.filter(mastered).length}/6 mastered`);}lines.push('');questions.forEach((q,i)=>lines.push(`${i+1}. ${q.q}\n${mastered(i)?'MASTERED':'TO REVISIT'} · Attempts: ${progress[i]?.attempts||0}\nExplanation: ${q.why}\n`));const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='Heat-Lab-learning-report.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);};
$('#reset').onclick=()=>{if(confirm('Reset only this advanced lesson’s progress? The foundation lesson is kept.')){try{localStorage.removeItem(KEY)}catch{}location.reload();}};

[['thermoCool',20],['thermoWarm',55],['thermoHot',65]].forEach(([id,t])=>{$('#'+id).onclick=()=>{$('#stripTemp').value=t;bimetal()}});

