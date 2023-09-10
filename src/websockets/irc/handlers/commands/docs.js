import {valueDocs} from './heroes/value.js';
import {guardDocs} from './heroes/guard.js';
import {demonDocs} from './heroes/demon.js';
import {lunaDocs} from './heroes/luna.js';
import {thantDocs} from './heroes/thant.js';
import {fangarmDocs} from './heroes/fangarm.js';
import {damageSpellTemplateDocs} from './heroes/damageSpellTemplate.js';
import {resDocs} from './heroes/res.js';

export let docs = ({params}) => {
	if(!params) return;
	switch (params) {
		case 'guard':
			return guardDocs;
		case 'value':
			return valueDocs;
		case 'demon':
			return demonDocs;
		case 'thant':
			return thantDocs;
		case 'fangarm':
			return fangarmDocs;
		case 'implo':
		case 'armag':
		case 'shower':
		case 'chain':
			return damageSpellTemplateDocs;
		case 'res':
			return resDocs;
	}
}	
