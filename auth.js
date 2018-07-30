window.addEventListener('load', function() {

  var webAuth = new auth0.WebAuth({
    domain: 'parent-vacation.auth0.com',
    clientID: 'P2wT0BrYqrjQsMxh2Thyn5A1nSX96drd',
    responseType: 'token id_token',
    audience: 'https://parent-vacation.auth0.com/userinfo',
    scope: 'openid',
    redirectUri: window.location.href
  });

  var loginBtn = document.getElementById('btn-login');

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    webAuth.authorize();
  });
  //var loginStatus = document.querySelector('.container h4');
  //var loginView = document.getElementById('login-view');
  //var homeView = document.getElementById('home-view');

  // buttons and event listeners
  //var homeViewBtn = document.getElementById('btn-home-view');
  var loginBtn = document.getElementById('btn-login');
  var logoutBtn = document.getElementById('btn-logout');

 // homeViewBtn.addEventListener('click', function() {
 // 		// show values
 //   homeView.style.display = 'inline-block';
 //   loginView.style.display = 'none';
 // });

  logoutBtn.addEventListener('click', logout);

//"query": "{ slots { name } }" 
	function getSlots(data) {
		return fetch('https://us1.prisma.sh/jordan-cotter-820a2c/cruise/dev', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => {
			console.log(response.json());
			return	response.json();
		}) // parses response to JSON
    .catch(error => console.error(`Fetch Error =\n`, error));
	}
  function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setSession(authResult);
        //loginBtn.style.display = 'none';
 //       homeView.style.display = 'inline-block';
      } else if (err) {
  //      homeView.style.display = 'inline-block';
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      }
      displayButtons();
    });
  }

  function setSession(authResult) {
    // Set the time that the Access Token will expire at
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    displayButtons();
  }

  function isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  function displayButtons() {
    if (isAuthenticated()) {
			// show values
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
 //     loginStatus.innerHTML = 'You are logged in!';
      document.querySelector('body').setAttribute('class', 'logged-in-body')
			const slotsQuery = {
				"query": "{ slots { name date number time } }"
			}
			getSlots(slotsQuery);
    } else {
			// hide values
      loginBtn.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
      document.querySelector('body').setAttribute('class', '')
 //     loginStatus.innerHTML =
 //       'You are not logged in! Please log in to continue.';
    }
  }

	handleAuthentication();
});
