import axios from "axios";


const params = new URLSearchParams();
params.append('username', "UserTest");
params.append('password', "UserTestPass");

axios.post("https://recycle-ranger-api.onrender.com/api/v1/auth/login/teacher", params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
