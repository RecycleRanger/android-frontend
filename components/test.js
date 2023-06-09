import fetch from "node-fetch";

const API_URL = "https://recycle-ranger-api.onrender.com/api/v1/auth/login";

async function fetchToken(userType) {
  let url;
  if (userType == 'teacher') {
    url = API_URL + '/teacher';
  } else {
    url = API_URL + '/student';
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'accept': 'application/json'
    },
    body: new URLSearchParams({
      'grant_type': '',
      'username': 'UserTest',
      'password': 'UserTestPass',
      'scope': '',
      'client_id': '',
      'client_secret': ''
    })
  });
}

fetchToken('teacher')
    .then(res => res.json())
	.catch(err => console.log(err))
