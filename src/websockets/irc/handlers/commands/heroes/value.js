import {objectsValues} from './objectsValues.js';

export let valueDocs = `Returns an object's value. Requires 1 parameter: object's name. Case insensitive.`

export let value = ({params}) => {
	let timestamp1 = performance.now();
	// all in lowercase
	if(!params) return `Object's name is required. ex: "!value ore"`
	params = params.toLowerCase();
	// to make search more flexible
	let	tags = params.split(' ');
	console.log(tags);

	let result =  objectsValues.filter(
		({name})=>tags.every((tag) => name.includes(tag))
	);

	if(!result.length) return  'Not Found';

	if(result.length > 1) {
		result = objectsValues.find(({name})=>name == params);
		if(!result) return 'Try to be more specific';
	} else {
		result = result[0];
	}
	let timestamp2 = performance.now();
	console.log(timestamp2-timestamp1);

	return `${result.value} | ${result.name}`; 
}

