const API_BASE = 'http://35.183.68.100:5000';
const entity_img="resources/img/"
    const btn = document.getElementById('searchBtn');
    const input = document.getElementById('tagInput');
    const errorDiv = document.getElementById('error');
    const table = document.getElementById('profileTable');
    const tableHeros = document.getElementById('heroes-table');
    const tableTroops = document.getElementById('troops-table');
    const tableSpells = document.getElementById('spells-table');
    const tablePet = document.getElementById('pet-table');
    const tableSiege = document.getElementById('siege-table');
    const tbody = table.querySelector('tbody');
    const tbodyHeros = tableHeros.querySelector('tbody');
    const tbodyTroops = tableTroops.querySelector('tbody');
    const tbodySpells = tableSpells.querySelector('tbody');
    const tbodyPet = tablePet.querySelector('tbody');
    const tbodySiege = tableSiege.querySelector('tbody');

    function showError(msg) {
      errorDiv.textContent = msg;
      table.hidden = true;
    }

    function clearError() {
      errorDiv.textContent = '';
    }

    function populateTable(data) {
      // clear old rows
      tbody.innerHTML = '';
      // pick a few key fields
      const fields = [
        ['Tag', data.tag],
        ['Name', data.name],
        ['Town Hall Level', data.townHallLevel],
        ['Trophies', data.trophies],
        ['Best Trophies', data.bestTrophies],
        ['War Stars', data.warStars],
        ['Role', data.role],
        ['Donations', data.donations]
      ];
      for (const [label, val] of fields) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<th>${label}</th><td>${val ?? ''}</td>`;
        tbody.appendChild(tr);
      }
      table.hidden = false;
      const troopsArray = data.troops;






      // Loop and log each element:
      troopsArray.forEach(element => {
      const id = getKeyByValue(entity, element.name);
        if (id === undefined) return;  // no mapping, skip
        
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        const img = document.createElement('img');
        if(super_entity.includes( Number(id))){
          console.log("super")
          img.src = `${entity_img}${id}.png`;
          console.log(img.src)
        }
        else {
          console.log("not super")
          img.src = `${entity_img}${id}_${element.level}.png`;
          console.log(img.src)
        }
        img.alt   = element.name;
        img.width = 38;
        img.height= 38;
        img.style.verticalAlign = 'middle';
        img.style.marginRight   = '0.5em';

        th.appendChild(img);
        th.appendChild(document.createTextNode(element.name));

        const td = document.createElement('td');
        td.textContent = element.level ?? '';
        tr.appendChild(th);
        tr.appendChild(td);
        if(siege_entity.includes(Number(id))){
          tbodySiege.append(tr);
        }
        else if(pet_entity.includes(Number(id))){
          tbodyPet.append(tr);
        }
        else tbodyTroops.appendChild(tr);
      });
      tableTroops.hidden = false;
      tablePet.hidden = false;
      tableSiege.hidden = false;


      const spells=data.spells;
      // Loop and log each element:
      spells.forEach(element => {
      const id = getKeyByValue(entity, element.name);
        if (id === undefined) return;  // no mapping, skip
        
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        const img = document.createElement('img');
        if(super_entity.includes( Number(id))){
          console.log("super")
          img.src = `${entity_img}${id}.png`;
          console.log(img.src)
        }
        else {
          console.log("not super")
          img.src = `${entity_img}${id}_${element.level}.png`;
          console.log(img.src)
        }
        img.alt   = element.name;
        img.width = 38;
        img.height= 38;
        img.style.verticalAlign = 'middle';
        img.style.marginRight   = '0.5em';

        th.appendChild(img);
        th.appendChild(document.createTextNode(element.name));

        const td = document.createElement('td');
        td.textContent = element.level ?? '';
        tr.appendChild(th);
        tr.appendChild(td);
        tbodySpells.appendChild(tr);
      });
      tableSpells.hidden = false;




      const heroes=data.heroes;
      // Loop and log each element:
      heroes.forEach(element => {
      const id = getKeyByValue(entity, element.name);
        if (id === undefined) return;  // no mapping, skip
        
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        const img = document.createElement('img');
        if(super_entity.includes( Number(id))){
          console.log("super")
          img.src = `${entity_img}${id}.png`;
          console.log(img.src)
        }
        else {
          console.log("not super")
          img.src = `${entity_img}${id}_${element.level}.png`;
          console.log(img.src)
        }
        img.alt   = element.name;
        img.width = 38;
        img.height= 38;
        img.style.verticalAlign = 'middle';
        img.style.marginRight   = '0.5em';

        th.appendChild(img);
        th.appendChild(document.createTextNode(element.name));

        const td = document.createElement('td');
        td.textContent = element.level ?? '';
        tr.appendChild(th);
        tr.appendChild(td);
        tbodyHeros.appendChild(tr);
      });
      tableHeros.hidden = false;
    }

    function lookup() {
      const tag = input.value.trim();
      if (!tag) {
        return showError('Please enter a valid tag.');
      }
      clearError();
      table.hidden = true;
      const url = `${API_BASE}/player?tag=${encodeURIComponent(tag)}`;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText);
            populateTable(data);
            console.log(data)
            console.log("done")
          } catch (e) {
            showError('Invalid JSON response');
          }
        } else {
          showError(`Error ${xhr.status}: ${xhr.statusText}`);
        }
      };
      // xhr.onerror = () => {
      //   showError('Network error');
      // };
      xhr.send();
    }

    btn.addEventListener('click', lookup);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') lookup();
    });
function getKeyByValue(obj, value) {
  const entry = Object.entries(obj).find(([key, val]) => val === value);
  return entry ? entry[0] : undefined;
}
const siege_entity =[
  125,134,120,109,106,105
]
const pet_entity =[
  129,131,130,132,141
]
const super_entity = [
  100,
110,
122,
124,
129,
130,
131,
132,
140,
141,
142,
143,
144,
148,
155,
157,
158,
159,
160,
161,
162,
163,
164,
165,
166,
167,
168,
169,
170,
171,
172,
173,
174,
175,
176,
177,
178,
179,
180,
181,
182,
183,
184,
185,
186,
187,
188,
189,
190,
191,
192,
193,
194,
195,
198,
199,
205,
208,
209,
210,
211,
213,
216,
217,
219,
220,
221,
43,
44,
45,
46,
47,
48,
49,
50,
51,
52,
61,
62,
63
]




  const entity = Object.freeze({
  1:   'townHallLevel',
  44: "Healing Spell",
  45:"Rage Spell",
  46:"Jump Spell",
  47:"Freeze Spell",
  49:"Poison Spell",
  50:"Earthquake Spell",
  51:"Haste Spell",
  48:"Clone Spell",
  52:"Skeleton Spell",
 110: "Bat Spell",
  124:"Invisibility Spell",
  140:"Recall Spell",
  175:"Overgrowth Spell",
  205:"Revive Spell",
  61:"Barbarian King",
  62:"Archer Queen",
  63:"Archer Queen",
  62:"Grand Warden",
  208:"Minion Prince",
  122:"Royal Champion",
  100:"Battle Machine",
  148:"Battle Copter",
  31:"Barbarian",
32:"Archer",
34:"Goblin",
33:"Giant",
35:"Wall Breaker",
36:"Balloon",
37:"Wizard",
38:"Healer",
39:"Dragon",
40:"P.E.K.K.A",
53:"Minion",
54:"Hog Rider",
55:"Valkyrie",
56:"Golem",
57:"Witch",
58:"Lava Hound",
59:"Bowler",
95:"Baby Dragon",//this should be 41
42:"Miner",
177:"Super Barbarian",
178:"Super Archer",
181:"Super Wall Breaker",
179:"Super Giant",
90:"Raged Barbarian",
91:"Sneaky Archer",
93:"Beta Minion",
92:"Boxer Giant",
94:"Bomber",
101:"Power P.E.K.K.A",
96:"Cannon Cart",
98:"Drop Ship",
95:"Baby Dragon",
97:"Night Witch",
105:"Wall Wrecker",
106:"Battle Blimp",
121:"Yeti",
180:"Sneaky Goblin",
191:"Super Miner",
182:"Rocket Balloon",
111:"Ice Golem",
103:"Electro Dragon",
109:"Stone Slammer",
185:"Inferno Dragon",
187:"Super Valkyrie",
133:"Dragon Rider",
188:"Super Witch",
113:"Hog Glider",
120:"Siege Barracks",
189:"Ice Hound",
190:"Super Bowler",
184:"Super Dragon",
123:"Headhunter",
183:"Super Wizard",
186:"Super Minion",
125:"Log Launcher",
134:"Flame Flinger",
138:"Electro Titan",
151:"Apprentice Warden",
192:"Super Hog Rider",
150:"Electrofire Wizard",
197:"Druid",
221:"Super Yeti",
218:"Furnace",
129:"L.A.S.S.I",
131:"Mighty Yak",
130:"Electro Owl",
132:"Unicorn",
141:"Frosty"
});
