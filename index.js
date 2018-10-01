
const countDown = document.createElement('div')
countDown.className="days-til-cruise"

const
	cruiseDate = new Date("11/30/2019")
, diff = (cruiseDate - new Date())/1000/60/60/24
, daysTillCruise = Math.floor(diff)
, daysTilCruiseElement = document.querySelector('.days-til-cruise')
, addHTML = function addHTML(day) {
   	const
  		div = document.createElement('div')
  	, id = day.split('. ').join('')
  	;
  	div.className="day"
  	div.setAttribute("id", id)
  	div.innerHTML = `
  		<p><strong>${day}</strong></p>
  		<div class="item morning">
  			<span>Morning</span>
  			<input class="name" placeholder="name" />
  			<input class="number" placeholder="number" />
  		</div>
  		<div class="item afternoon">
  			<span>Afternoon</span>
  			<input class="name" placeholder="name" />
  			<input class="number" placeholder="number" />
  		</div>
  		<div class="item evening">
  			<span>Evening</span>
  			<input class="name" placeholder="name" />
  			<input class="number" placeholder="number" />
  		</div>
  		<div class="item night">
  			<span>Night</span>
  			<input class="name" placeholder="name" />
  			<input class="number" placeholder="number" />
  		</div>
  	`
  	document.querySelector('.container').appendChild(div)
  }
, arr = [ "Nov. 30th", "Dec. 1st", "Dec. 2nd", "Dec. 3rd", "Dec. 4th", "Dec. 5th" ]
;

document.querySelector('.count-down').appendChild(countDown)
daysTilCruiseElement.outerHTML=`${daysTillCruise} days until cruise!`

arr.forEach(addHTML);
