// main command handler

import * as commands from './commands/index.js';

export default 
	({
		command: {botCommand: name, botCommandParams: params} 
	}) => new Promise( async (res, rej) => {

			let result;

			switch (name) {
				// heroes
				case 'docs':

				case 'value':
				case 'guard':
				case 'demon':

				case 'fangarm':
				case 'luna':
				case 'thant':

				case 'implo':
				case 'armag':
				case 'shower':
				case 'chain':
				case 'res':
					result = commands[name]({params});
					break;
   		 	}

			return res(result);
		})
	
