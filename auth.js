window.addEventListener('load', function() {

  const webAuth = new auth0.WebAuth({
      domain: 'parent-vacation.auth0.com',
      clientID: 'P2wT0BrYqrjQsMxh2Thyn5A1nSX96drd',
      responseType: 'token id_token',
      audience: 'https://parent-vacation.auth0.com/userinfo',
      scope: 'openid',
      redirectUri: window.location.href
    })
  , loginBtn = document.getElementById('btn-login')
  , logoutBtn = document.getElementById('btn-logout')
  , clearFields = function clearFields() {
      document.querySelectorAll('input').forEach(x => x.value = '');
    }
//"query": "{ slots { name } }"
  , logout = function logout() {
      // Remove tokens and expiry time from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      clearFields();
      displayButtons();
    }
	, getSlots = function getSlots(data) {
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

  , isAuthenticated = function isAuthenticated() {
      // Check whether the current time is past the
      // Access Token's expiry time
      var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

	, populateData = function (date, slots) {
			 console.log('ID', `#${date}-morning-name`);
       document.querySelector(`#${date}-morning-name`).value = slots.find(x => !!x.name).name
       document.querySelector(`#${date}-afternoon-name`).value = slots.find(x => !!x.name).name
       document.querySelector(`#${date}-evening-name`).value = slots.find(x => !!x.name).name
       document.querySelector(`#${date}-night-name`).value = slots.find(x => !!x.name).name

       document.querySelector(`#${date}-morning-number`).value = slots.find(x => !!x.name).name
       document.querySelector(`#${date}-afternoon-number`).value = slots.find(x => !!x.name).name
       document.querySelector(`#${date}-evening-number`).value = slots.find(x => !!x.name).name
       document.querySelector(`#${date}-night-number`).value = slots.find(x => !!x.name).name
		}
  , displayButtons = function displayButtons() {
      if (isAuthenticated()) {
		  	// TODO: show values
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        document.querySelector('body').setAttribute('class', 'logged-in-body')
		  	const slotsQuery = {
		  		"query": "{ slots { name date number time } }"
		  	}
        // TODO: get eslint
		  	getSlots(slotsQuery)
          .then(res => {
            const slots = res.data.slots
            console.log(slots)
						populateData('Nov30th', slots);
						populateData('Dec1st', slots);
						populateData('Dec2nd', slots);
						populateData('Dec3rd', slots);
						populateData('Dec4th', slots);
						populateData('Dec5th', slots);
          })
      } else {
		  	// TODO: hide values
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        document.querySelector('body').setAttribute('class', '')
      }
    }
  , setSession = function setSession(authResult) {
      // Set the time that the Access Token will expire at
      var expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
    }
  , handleAuthentication = function handleAuthentication() {
      webAuth.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          setSession(authResult);
        } else if (err) {
          console.log(err);
          alert(
            'Error: ' + err.error + '. Check the console for further details.'
          );
        }
        displayButtons();
      });
    }
  ;


  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    webAuth.authorize();
  });
  logoutBtn.addEventListener('click', logout);

	handleAuthentication();
});
