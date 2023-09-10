import {damageSpellTemplate} from './damageSpellTemplate.js';

export let shower = ({params}) => {
	return damageSpellTemplate(params, 25, 50, 100, 25);
}
