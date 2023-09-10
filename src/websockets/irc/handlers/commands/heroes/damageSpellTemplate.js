export let damageSpellTemplateDocs = `Return spell damage. Order: spell power: [1, 99] (2), magic level: [1, 3], orb: [0, 1] (0), sorcery level: [0; 3] (0), sorcery specialist level: [0; 99] (0)`;

export let damageSpellTemplate = (params, bonus1, bonus2, bonus3, spMultiplier) => {

	let paramsArr = params?.split(' ');

	let sp = parseInt(paramsArr?.[0]) || 2;
	let magicLVL = parseInt(paramsArr?.[1]) || 1;
	let orb  = parseInt(paramsArr?.[2]) || 0;
	let sorceryLvl = parseInt(paramsArr?.[3]) || 0;
	let sorcerySpecLvl = parseInt(paramsArr?.[4]) || 0;

	// validation

	if ( !(1 <= sp && 100 > sp) ) return `SP: [1, 99]`;

	if ( !(magicLVL == 1 || magicLVL == 2 || magicLVL == 3) ) return `Magic skill level: [1, 3]`;

	if ( !(orb == 1 || orb == 0) ) return `Orb: 0 or 1`;

	if ( !(!sorceryLvl || (sorceryLvl == 1 || sorceryLvl == 2 || sorceryLvl == 3)) )  return `Level of the sorcery: [0, 3]`;

	if ( !(!sorcerySpecLvl || ( sorceryLvl && (1 <= sorcerySpecLvl && 100 > sorcerySpecLvl))) ) return `Sorcery level must be specified. Level of the sorcery specialist: [0, 99]`; 
	
	let bonus;
	
	switch (magicLVL) {
		case 1:
			bonus = bonus1;
			break;
		case 2:
			bonus = bonus2;
			break;
		case 3:
			bonus = bonus3;
	}

	let sorceryImpact;

	if (sorceryLvl) {
		let inc;
		if (sorcerySpecLvl) {
			inc = 0.05*sorcerySpecLvl;
		}
		switch (sorceryLvl) {
			case 1:
				sorceryImpact = 0.05;
				break;
			case 2:
				sorceryImpact = 0.10;
				break;
			case 3:
				sorceryImpact = 0.15;
		}
		sorceryImpact *= (isNaN(inc) ? 1 : 1+inc);
	}

	if (!sorceryImpact) sorceryImpact = 0;
	let result = Math.floor((bonus + sp * spMultiplier) * (1 + sorceryImpact) * (1 + 0.5*orb)); 
	return  result;
}
