const data = {
	"query": "{ slots { name } }" 
}
fetch('https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        //mode: "no-cors", // no-cors, cors, *same-origin
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        //redirect: "follow", // manual, *follow, error
        //referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => {
			console.log(response)
			const foo =	response.json()
			console.log(JSON.stringify(data))
			console.log(foo)
		}) // parses response to JSON
    .catch(error => console.error(`Fetch Error =\n`, error));

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
	;
	div.className="day"
	div.innerHTML = `
		<p><strong>${day}</strong></p>
		<div class="item">
			<span>Morning</span>
			<input placeholder="name" />
			<input placeholder="number" />
		</div>
		<div class="item">
			<span>Afternoon</span>
			<input placeholder="name" />
			<input placeholder="number" />
		</div>
		<div class="item">
			<span>Evening</span>
			<input placeholder="name" />
			<input placeholder="number" />
		</div>
		<div class="item">
			<span>Night</span>
			<input placeholder="name" />
			<input placeholder="number" />
		</div>
	`
	document.querySelector('.container').appendChild(div)
}

const arr = [ "Nov. 30", "Dec. 1st", "Dec. 2nd", "Dec. 3rd", "Dec. 4th", "Dec. 5th" ]
arr.forEach(x => {
		addHTML(x)
});
