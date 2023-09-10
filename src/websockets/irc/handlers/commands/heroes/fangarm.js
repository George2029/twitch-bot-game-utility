export let fangarmDocs = `Returns the max creature quantity that can be hypnotized by fangarms. The 1st parameter: fangarms qnt [1; 99999] (3). The 2nd one: unit hp [1; 1000] (30). Ex.: "!fangarm 40 200" >> 5`;

export let fangarm = ({params}) => {

	let paramsArr = params?.split(' ');

	let fangarm_qnt = parseInt(paramsArr?.[0]) || 3;

	let hp = parseInt(paramsArr?.[1]) || 30;
	
	if (! (fangarm_qnt > 0 && fangarm_qnt < 100000) ) return 'Fangarm quantity: [1; 99999]';

	if (! (hp > 0 & hp <= 1000) ) return `Unit's HP: [1; 1000]`;

	let might = 20 + fangarm_qnt * 25;

	return Math.floor(might / hp);
}
	
