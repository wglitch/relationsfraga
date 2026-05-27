let a=[],b=[],lastA=-1,lastB=-1,locked=false;
const text=document.getElementById('text');
const card=document.getElementById('card');

async function loadDeck(file){
 const raw=await (await fetch(file,{cache:'no-store'})).text();
 return raw.replace(/\r\n/g,'\n')
 .replace(/\r/g,'\n')
 .split(/^\s*---+\s*$/gm)
 .map(x=>x.trim()).filter(Boolean);
}

function pick(deck,last){
 if(deck.length===0) return ['',last];
 if(deck.length===1) return [deck[0],0];
 let i=last;
 while(i===last){ i=Math.floor(Math.random()*deck.length); }
 return [deck[i],i];
}

function animate(fn){
 if(locked) return;
 locked=true;
 card.classList.add('switching');
 setTimeout(fn,110);
 setTimeout(()=>{card.classList.remove('switching');locked=false;},240);
}

document.getElementById('zoneA').addEventListener('click',(e)=>{
 e.stopPropagation();
 animate(()=>{
   const result=pick(a,lastA); text.textContent=result[0]; lastA=result[1];
 });
});

document.getElementById('zoneB').addEventListener('click',(e)=>{
 e.stopPropagation();
 animate(()=>{
   const result=pick(b,lastB); text.textContent=result[0]; lastB=result[1];
 });
});

(async()=>{
 try{
  a=await loadDeck('kort-a.txt');
  b=await loadDeck('kort-b.txt');
 }catch(e){
  text.textContent='Kunde inte läsa kort-a.txt eller kort-b.txt';
 }
})();