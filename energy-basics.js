(() => {
 'use strict';
 const find = id => document.getElementById(id);
 function cups(count) {
  find('oneCup').setAttribute('aria-pressed',String(count===1));find('threeCups').setAttribute('aria-pressed',String(count===3));
  const tray=find('energyCups');tray.replaceChildren();
  for(let i=0;i<count;i++){const cup=document.createElement('div');cup.className='energy-cup';const temp=document.createElement('b');temp.textContent='40°C';const dots=document.createElement('span');dots.textContent='● ● ●';dots.setAttribute('aria-label','a group of particles');const caption=document.createElement('small');caption.textContent='same amount per cup';cup.append(temp,dots,caption);tray.append(cup);}
  find('energyAmount').textContent=count===1?'One cup: 40°C. Now add two identical cups. Will the temperature of the water change?':'Three cups: still 40°C in every cup, but three times as much water. At the same temperature, this water has three times the total thermal energy of one identical cup, using the same energy reference.';
 }
 find('oneCup').onclick=()=>cups(1);find('threeCups').onclick=()=>cups(3);cups(1);
 let stage=0;
 function equilibrium(){
  const mass=Number(find('equilibriumMass').value)||200;
  const final=(mass*80+200*20)/(mass+200),fraction=stage/4;
  const a=80+(final-80)*fraction,b=20+(final-20)*fraction;
  const number=n=>Number(n.toFixed(2)).toString();
  find('equilibriumA').textContent=number(a)+'°C';find('equilibriumB').textContent=number(b)+'°C';find('massA').textContent=mass+' g of water';find('energyStep').disabled=stage===4;
  find('energyStep').textContent=stage===4?'Equal temperatures reached':stage===0?'Let energy move →':'Let more energy move →';
  find('equilibriumStatus').textContent=stage===4?`Thermal equilibrium: both are at ${number(final)}°C. No net heat transfer between A and B. Both still have thermal energy; their particles still move.`+(mass===600?' A contains three times as much water at this shared temperature, so A still has more total thermal energy.':' Equal amounts of the same water are now at the same temperature.'):`Stage ${stage} of 4: A is warmer than B, so energy transfers from A → B. A cools while B warms. They are not yet in thermal equilibrium.`;
 }
 find('energyStep').onclick=()=>{if(stage<4)stage++;equilibrium()};find('energyRestart').onclick=()=>{stage=0;equilibrium()};find('equilibriumMass').onchange=()=>{stage=0;equilibrium()};equilibrium();
 const checks=[
  {q:'A cup and a bucket of liquid water are both at 40°C. Which statement is correct?',answers:['They must have equal total thermal energy.','Their temperatures are equal, but the bucket has more total thermal energy.'],correct:1,why:'Same material, same state, same temperature—but more water means more particles contributing energy. Temperature does not count the particles.'},
  {q:'Two objects have reached thermal equilibrium with each other. What must be equal?',answers:['Their temperatures.','Their masses and total thermal energies.'],correct:0,why:'Thermal equilibrium requires equal temperatures and no net heat transfer between them. A big and a small object can reach equilibrium without having equal total thermal energy.'},
  {q:'At thermal equilibrium, have the particles stopped moving?',answers:['Yes; all thermal energy is gone.','No; the particles still move, but there is no net heat transfer between the objects.'],correct:1,why:'Equilibrium means balanced overall energy transfer, not zero energy or motion. Both objects still have thermal energy.'}
 ];
 checks.forEach((check,index)=>{const box=document.createElement('article');box.className='quizItem';const q=document.createElement('h4');q.textContent=(index+1)+'. '+check.q;const options=document.createElement('div');options.className='options';const feedback=document.createElement('p');feedback.className='feedback';feedback.setAttribute('aria-live','polite');check.answers.forEach((text,j)=>{const button=document.createElement('button');button.textContent=text;button.onclick=()=>{[...options.children].forEach(b=>{b.classList.remove('correct','incorrect');b.setAttribute('aria-pressed','false')});button.classList.add(j===check.correct?'correct':'incorrect');button.setAttribute('aria-pressed','true');feedback.textContent=j===check.correct?'✓ '+check.why:'Try again. '+check.why;};options.append(button)});box.append(q,options,feedback);find('energyChecks').append(box)});
})();
