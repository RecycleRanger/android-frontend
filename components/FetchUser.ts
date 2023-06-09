import fetch from "node-fetch";


const API_URL = "https://recycle-ranger-api.onrender.com/api/v1/auth/login";

function fetchToken(userType: string) {
  let url: string;
  if (userType == 'teacher') {
    url = API_URL + '/teacher';
  } else {
    url = API_URL + '/student';
  }
  const res = fetch(url, {
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
  return res;
}

async function test() {
  const test = await fetchToken('teacher');
  console.log(test.json())
}
test();


// let dataValue: any;

// let test = fetchToken("teacher")
//   .then(async (res) => {
//     if (res.ok) {
//       const data = await res.json();
//       return data;
//     } else {
//       throw new Error('Response Ok')
//     }
//   })
//   .catch((err) => console.log(err))

// test
//   .then((data) => {
//     dataValue = data;
//   })
//   .catch((error) => {
//     console.log(error);
//   })

// console.log(dataValue);
