export let demonDocs = `This calc gives you the exact amount of creatures to sacrifice for demons to ressurect. The first parameter is a quantity of creatures for a sacrifice, requied. The second parameter is hp of one creature for a sacrifice, required. The third parameter is a quantity of pit lords, optional, default value is 3. Usage example: "!demon 25 16 3" >> 9`

export let demon = ({params}) => {

		if(params?.split(' ').length < 2) return '2 params required. Read the docs. !docs demon' 

		let [creature_qnt, creature_hp, pit_qnt] = params.split(' ');

		pit_qnt = parseInt(pit_qnt) || 3;
		creature_qnt = parseInt(creature_qnt);
		creature_hp = parseInt(creature_hp);	

		// validation
		if (pit_qnt <= 0) return `Pit qnt should be greater than 0`;
		if (typeof creature_qnt !== "number" || creature_qnt <= 0) {
			return `Creature quantity should be greater than 0`;
		};
		if (creature_hp <= 0) return `Creature's hp should be greater than 0`;
		if (creature_hp > 35) creature_hp = 35;

		// start of calc

 		// max amount of demons the given amount of pits can ressurect
		let pit_power = Math.floor(pit_qnt * 50 / 35);

		// max amount of demons that can be made from all the creatures
		let creature_demon_capacity = Math.floor(creature_qnt * creature_hp / 35); 

		// possible demons amount to ressurect with the current data (smallest out of the two capacities);
		let demons = creature_demon_capacity > pit_power ? pit_power : creature_demon_capacity;

		// how many creatures are to be sacrificed 
		let sacrificable = Math.ceil( 35 * demons / creature_hp); 
		
		// leftovers
		let extra = creature_qnt - sacrificable; 

		return `Demons: ${demons}. Sacrifice: ${sacrificable}. ${extra === 0 ? 'Perfecto exchange!' : `Extra: ${extra}`}`;


	}

