export let lunaDocs = `Easy calc of Luna's firewall damage. The first parameter is the spellpower, default value is 3. The 2nd is level of fire magic (basic, advanced, expert) with values range from 1 to 3, default value is 3. The last parameter is an orb, 0 means the absence of it and 1 means existence, default value is 0. Example of usage: !luna 8 >> 260. !luna 4 2 >> 120. !luna 5 2 1 >> 210`

export let luna = ({params}) => {
	
	let paramsArr = params?.split(' ');
	let sp = parseInt(paramsArr?.[0]) || 3;
	let lvl = paramsArr?.[1] || '3';
	let orb = paramsArr?.[2] || '0';

	// validation

	if (sp < 3 || sp > 100) {
		return `Spellpower: [3, 100)`;
	};

	if (!(orb == "1" || orb == "0")) {
		return 'Orb: [0, 1]. Default: 0 (absence of the orb).';
	}

	if (! ['1', '2', '3'].includes(lvl))  
			return 'Lvl: [1, 3]. Default: 1 (basic fire magic).';

	// calc

	let bonus;

	switch (lvl) {
		case '1':
			bonus = 10;
			break;
		case '2':
			bonus = 20;
			break;
		case '3': 
			bonus = 50;
	}


	return (sp * 10 + bonus) * 2 * (1 + orb * 0.5);
	
}
