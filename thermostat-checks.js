(() => {
 const checks=[
  ['Why does a heated bimetallic strip bend?',['Only one metal becomes hot.','The joined metals expand by different amounts.'],1,'Both metals warm up. One expands more, so the bonded layers curve together; the longer layer lies outside the bend.'],
  ['The thermostat opens the heater switch. What happens immediately?',['Current through the heater stops.','The heater instantly becomes cold.'],0,'The gap stops current, so electrical heating stops. The heater can remain hot and lose energy gradually.'],
  ['As the strip cools and the switch closes again, why does the heater turn on?',['A complete path for current is restored.','The strip creates electrical energy.'],0,'Touching contacts complete the circuit. The power supply can send current through the heater again.']
 ];
 const target=document.getElementById('thermostatChecks');
 checks.forEach(([question,answers,correct,why],index)=>{const box=document.createElement('article');box.className='quizItem';const heading=document.createElement('h4');heading.textContent=(index+1)+'. '+question;const options=document.createElement('div');options.className='options';const feedback=document.createElement('p');feedback.className='feedback';feedback.setAttribute('aria-live','polite');answers.forEach((text,i)=>{const button=document.createElement('button');button.textContent=text;button.onclick=()=>{[...options.children].forEach(b=>{b.classList.remove('correct','incorrect');b.setAttribute('aria-pressed','false')});button.classList.add(i===correct?'correct':'incorrect');button.setAttribute('aria-pressed','true');feedback.textContent=(i===correct?'✓ ':'Try again. ')+why};options.append(button)});box.append(heading,options,feedback);target.append(box)});
})();
