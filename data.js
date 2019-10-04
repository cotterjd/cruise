window.addEventListener('load', function() {

  const log = console.log
  , getSlots = function getSlots(data) {
      log(data)
      return fetch('https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      })
      .then(response => {
        return response.json();
      }) // parses response to JSON
      .catch(error => console.error(`Fetch Error =\n`, error));
    }

  , populateData = function (date, slots) {
      const populate = (time, prop) => {
        log(date, time, slots)
        const slot = slots.find(x => x.date === date && x.time === time)
        if (!slot) {
          console.error(`no slot found for date ${date} and time ${time}`)
        }
        const value = slot[prop]
        const selector = `#${date}-${time}-${prop}`
        document
          .querySelector(selector)
          .value = value

      }
      populate('morning', 'name');
      populate('afternoon', 'name');
      populate('evening', 'name');
      populate('night', 'name');

      populate('morning', 'number');
      populate('afternoon', 'number');
      populate('evening', 'number');
      populate('night', 'number');
    }
  , displayValues = function displayValues() {
        const slotsQuery = {
          "query": "{ slots { name date number time } }"
        }
        getSlots(slotsQuery)
          .then(res => {
            const slots = res.data.slots
            populateData('SatNov30th', slots);
            populateData('SunDec1st', slots);
            populateData('MonDec2nd', slots);
            populateData('TueDec3rd', slots);
            populateData('WedDec4th', slots);
            populateData('ThurDec5th', slots);
          })
    }
  ;

  displayValues()
});
