
const countDown = document.createElement('div')
countDown.className="days-til-cruise"
countDown.innerHTML="hey"
document.querySelector('.count-down').appendChild(countDown)

const
	cruiseDate = new Date("11/30/2019")
, diff = (cruiseDate - new Date())/1000/60/60/24
, daysTillCruise = Math.floor(diff)
, daysTilCruiseElement = document.querySelector('.days-til-cruise')
;
daysTilCruiseElement.outerHTML=`${daysTillCruise} days until cruise!`

function addHTML(day) {
	const
		div = document.createElement('div')
	, id = day.split('. ').join('').split(' ').join('')
	// TODO: grab ids from database
	, morningNameId = id+'-morning-name'
	, morningNumberId = id+'-morning-number'
	, afternoonNameId = id+'-afternoon-name'
	, afternoonNumberId = id+'-afternoon-number'
	, eveningNameId = id+'-evening-name'
	, eveningNumberId = id+'-evening-number'
	, nightNameId = id+'-night-name'
	, nightNumberId = id+'-night-number'
	;
	div.className="day"
	div.setAttribute('id', id)
	div.innerHTML = `
		<p><strong>${day}</strong></p>
		<div class="item morning">
			<span>Morning</span>
			<input id=${morningNameId} placeholder="name" />
			<input id=${morningNumberId} placeholder="number" />
		</div>
		<div class="item afternoon">
			<span>Afternoon</span>
			<input id=${afternoonNameId} placeholder="name" />
			<input id=${afternoonNumberId} placeholder="number" />
		</div>
		<div class="item evening">
			<span>Evening</span>
			<input id=${eveningNameId} placeholder="name" />
			<input id=${eveningNumberId} placeholder="number" />
		</div>
		<div class="item night">
			<span>Night</span>
			<input id=${nightNameId} placeholder="name" />
			<input id=${nightNumberId} placeholder="number" />
		</div>
	`

	document.querySelector('.container').appendChild(div)
	const createListener = (inputId) => {
		const selector = `#${inputId}`
		document.querySelector(selector).addEventListener("change", (evt) => {
			const id = evt.target.id
			const [date, time, prop] = id.split('-')
			const query = {
				query: `mutation {
				  updateManySlots(
						data: {
						  ${prop}: ${JSON.stringify(evt.target.value)}
						}, 
						where: { 
							AND: [{ time: ${JSON.stringify(time)} }, { date: ${JSON.stringify(date)} }]
						}
					 ) {
					   count
					 }
				}`
			}
	  	return fetch('https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(query),
      })
      .then(response => {
	  		return response.json();
	  	}) // parses response to JSON
      .catch(error => console.error(`Fetch Error =\n`, error));
		})
	}
	createListener(morningNameId)
	createListener(morningNumberId)
	createListener(afternoonNameId)
	createListener(afternoonNumberId)
	createListener(eveningNameId)
	createListener(eveningNumberId)
	createListener(nightNameId)
	createListener(nightNumberId)
}

const arr = [ "Sat Nov. 30th", "Sun Dec. 1st", " Mon Dec. 2nd", "Tue Dec. 3rd", "Wed Dec. 4th", "Thur Dec. 5th" ]
arr.forEach(x => {
		addHTML(x)
});
