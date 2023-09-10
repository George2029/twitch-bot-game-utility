export let resDocs = `Returns ressurection health points. Spell Power: [1, 99] (2). Earth Magic: [1-3] (1)`;

export let res = ({params}) => {

	let paramsArr = params?.split(' ');

	let sp = parseInt(paramsArr?.[0]) || 2;
	let magicLvl = parseInt(paramsArr?.[1]) || 1;

	// validation

	if (sp < 1 || sp > 99) return 'SP: [1, 99]';
	if (magicLvl < 1 || magicLvl > 3) return 'Earth Magic: [1; 3]';

	// calculation

	let bonus;

	switch (magicLvl) {
		case 1:
			bonus = 40;
			break;
		case 2:
			bonus = 80;
			break;
		case 3:
			bonus = 160;
	}

	return bonus + 50 * sp;
}
