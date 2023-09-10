import {damageSpellTemplate} from './damageSpellTemplate.js';

export let chain = ({params}) => {
	return damageSpellTemplate(params, 25, 50, 100, 40)
}
