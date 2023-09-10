import {damageSpellTemplate} from './damageSpellTemplate.js';

export let implo = ({params}) => {
	return damageSpellTemplate(params, 100, 200, 300, 75);
}
