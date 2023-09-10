export let thantDocs = `Returns the amount of fully ressurectable units (i.e. one might actually ressurect one more, but the extra creature would not have full hp). SP: [2, 99] (2), earthLvl: [1, 3] (1), thantLvl: [1, 99] (1), creatureTier: [1, 7] (1), creatureHp: [6, 200] (6).`;

export let thant = ({params}) => {
	let paramsArr = params?.split(' ');

	let sp = parseInt(paramsArr?.[0]) || 2;
	let earthLvl = paramsArr?.[1] || '1'; // an absence of earth or the basic lvl (the difference is just a mana cost)
	let thantLvl = parseInt(paramsArr?.[2]) || 1; // thant lvl
	let creatureTier = parseInt(paramsArr?.[3]) || 1; // creature's tier
	let creatureHp = parseInt(paramsArr?.[4]) || 6; // creature's hp
	
	// validation

	if (! (1 < sp && sp < 100)) 
		return `SP: [2, 99]`

	if (! ['1', '2', '3'].includes(earthLvl) ) 
		return `EarthLVL: [1, 3]`;

	if (! (0 < thantLvl && thantLvl < 100)) 
		return `ThantLVL: [1, 99]`;

	if (! (0 < creatureTier && creatureTier <=7 )) 
		return `CreatureTier: [1, 7]`;

	if (! (6 <= creatureHp && creatureHp <= 200)) 
		return `HP: [6, 200]`;

	// calc

	let bonus;

		switch (earthLvl) {
			case '1':
				bonus = 30;
				break; 
			case '2':
				bonus = 60;
				break; 
			case '3':
				bonus = 160;
		} 

	let result = Math.ceil(( sp * 50 + bonus ) * (1 + (Math.round(thantLvl / creatureTier)) * 0.03));

	return Math.round(result / creatureHp); 
}
