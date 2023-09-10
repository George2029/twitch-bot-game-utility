import {monsters} from './monsters.js';

export let guardDocs = `Returns a possible monsters quantity range. The first parameter is an object's value, [1000, 1000000], required. The second one is a monster name, singular, required. The last two are optional values, the week is prefixed with '#', the strength is with '$'. Week: [1-9] (1). Strength: [1-3] (2). Case insensitive. Ex.: "!guard 15000 unicorn #2 $3"`;

const getMonstersValue = (params) =>  {
	let findings = monsters.filter(({name}) => name.includes(params));
	if (findings.length === 0) return false;
	if (findings.length > 1) {
		findings = monsters.find(({name}) => {
			return name === params;
		})
		if (!findings) return false;
		return findings;
	}
	return findings[0];
	
}

export let guard = ({params}) => {
	if(!(params?.split(' ').length > 1))
		return 'Not enough parameters for this command';

	let strength, week, value;

	// parsing start

		let weekIdx = params.indexOf('#'); 
		let strengthIdx = params.indexOf('$');
		// week parser

		if(weekIdx !== -1) {
			week = parseInt(params[weekIdx+1]);
			if (isNaN(week) || week < 1) {
				return `Invalid week. Ex.: "#3"`;
			}
		} else {
			week = 1;
		}

		// strength parser

		if(strengthIdx !== -1) {
			strength = parseInt(params[strengthIdx+1]);
			if(isNaN(strength) || strength < 1 || strength > 3) {
				return `Invalid strength. Values: [1;3]`
			}
		} else strength = 2;

		// value parser

		let idx = params.indexOf(' ');
		value = parseInt(params.slice(0, idx));

		if (isNaN(value) || value > 1000000) {
			return `Invalid value`;
		}

		// monster parser

		// calc the end index of monster parameter

		let monsterEndIdx;
		if (strengthIdx  != -1) {
			if (weekIdx != -1) {
				monsterEndIdx = weekIdx < strengthIdx ? weekIdx - 1 : strengthIdx - 1;
			} else {
				monsterEndIdx = strengthIdx - 1;
			}
		} else {
			if (weekIdx != -1) {
				monsterEndIdx = weekIdx - 1;
			} else {
				monsterEndIdx = params.length;
			}
		}

		let monster = getMonstersValue(params.slice(idx+1, monsterEndIdx).trimEnd().toLowerCase());
		if(!monster) return 'Invalid monsters';
		let	{value: monstersValue, advlow, advhigh} = monster;

	// parsing end
	let min_value_1, coeff_1, min_value_2, coeff_2;

	switch (strength) {
		case 1:
			min_value_1 = 1000;
			coeff_1 = 1;
			min_value_2 = 7500;
			coeff_2 = 1;
			break;
		case 2:
			min_value_1 = 500;
			coeff_1 = 1.5;
			min_value_2 = 5000;
			coeff_2 = 1;
			break;
		case 3:
			min_value_1 = 0;
			coeff_1 = 1.5;
			min_value_2 = 5000;
			coeff_2 = 1.5;
			break;
	}

	let part_1 = value - min_value_1;
	if (part_1 < 0) part_1 = 0;
	let part_2 = value - min_value_2;
	if (part_2 < 0) part_2 = 0;

	let totalValue = coeff_1 * part_1 + coeff_2 * part_2;
	if (totalValue < 2000) return 'No monsters for this value'; 

	// check if monsters can be guards for the total value;
	// Math.floor(advhigh + advlow / 2)*respectiveAiValue > totalValue => not possible to be generated 

	if(
		monstersValue * Math.round((advlow + advhigh)/2) > totalValue 
		||  // also not possible to be generated if 100*creature_val < totalvalue
		Math.floor(totalValue / monstersValue) > 100
	) return 'cannot be generated there';

	let avg_qnt = Math.round(totalValue / monstersValue);

	let min_qnt = avg_qnt - Math.floor(avg_qnt*0.25); 

	let max_qnt = avg_qnt + Math.floor(avg_qnt*0.25); 

	let week_coeff = 1;

	while (week != 1) {
		week_coeff *= 1.1;
		week--;
	}
	
	avg_qnt = Math.floor(avg_qnt * week_coeff);
	min_qnt = Math.floor(min_qnt * week_coeff);
	max_qnt = Math.floor(max_qnt * week_coeff);
	if (min_qnt == max_qnt) {
		return min_qnt;
	}
	return `${min_qnt}-${max_qnt} (${avg_qnt})`;
}

