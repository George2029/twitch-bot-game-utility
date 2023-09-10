import {damageSpellTemplate} from './damageSpellTemplate.js';

export let armag = ({params}) => {
	return damageSpellTemplate(params, 30, 60, 120, 40);
}

