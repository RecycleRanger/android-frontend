import axios from "axios";
import * as SecureStore from 'expo-secure-store';

import { UsrType } from "../custom-types/UserTypes";


const API_URL = "https://recycle-ranger-api.onrender.com/api/v1";

export interface SuccessResponseSignUpTeacher {
  username: string;
  id: number;
}

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValue(key: string) {
  return await SecureStore.getItemAsync(key);
}

async function deleteValue(key: string) {
  await SecureStore.deleteItemAsync(key);
}

function decodeJwt(token: string) {
  return JSON.parse(
    Buffer.from(
      token.split('.')[1], 'base64'
    ).toString()
  );
}

function isTokenExpired(token: string): boolean {
  try {
    const decodedToken = decodeJwt(token);
    if (!decodedToken || !decodedToken.exp) {
      // Token or expiry time is missing
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpiryTime = decodedToken.exp;

    return currentTime >= tokenExpiryTime;
  } catch (error) {
    // Invalid token format or unable to decode
    return true;
  }
}


type searchParams = {
  grant_type: string;
  id?: string;
  username?: string;
  password: string;
  scope: string;
  client_id: string;
  client_secret: string;
}

class AuthService {
  login(
    usrType: UsrType,
    password: string,
    username: string,
    id?: number,
  ) {

    let loginUrl: string = "";
    let urlSearchParams: searchParams;

    switch (usrType) {
      case UsrType.teacher: {
        loginUrl = "/auth/login/teacher";
        urlSearchParams = {
          "grant_type": "",
          "username": username,
          "password": password,
          "scope": "",
          "client_id": "",
          "client_secret": "",
        }
        break;
      }
      case UsrType.student: {
        loginUrl = "/auth/login/student";
        if (id) {
          urlSearchParams = {
            "grant_type": "",
            "username": username,
            "password": password,
            "scope": "",
            "client_id": "",
            "client_secret": "",
            "id": id.toString(),
          }
        } else {
          urlSearchParams = {
            "grant_type": "",
            "username": username,
            "password": password,
            "scope": "",
            "client_id": "",
            "client_secret": "",
          }
        }
        break;
      }
    }
    return axios
      .post(
        API_URL + loginUrl,
        new URLSearchParams({ ...urlSearchParams }),
        {
          headers: {
            'accept': 'application/json',
          }
        })
      .then(response => {
        if (response.data.access_token) {
          save("access_token", response.data.access_token)
        }
        return response.data;
      })
      .catch(err => {
        console.log(err);
        return err.data;
      })
  }

  logout() {
    deleteValue("access_token")
  }

  async register(
    username: string,
    password: string,
  ): Promise<SuccessResponseSignUpTeacher> {
    return new Promise<SuccessResponseSignUpTeacher>((resolve, reject) => {
      axios
        .post(
          API_URL + "/auth/signup/teacher",
          {
            'username': username,
            'password': password,
          },
          {
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
            }
          }
        )
        .then((response) => {
          const res: SuccessResponseSignUpTeacher = response.data;
          resolve(res);
        })
        .catch((err) => {
          reject(err.response.data.detail);
        })
    });
  }


  getCurrentUser() {
    getValue("access_token")
      .then((res) => {
        if (res) {
          if (!isTokenExpired(res)) {
            // TODO
          }
        }
      })
  }
}

// auth.login(UsrType.teacher, "UserTestPass", "UserTest");
// auth.login(UsrType.student, "StudentTestPass", "s", 9);
// auth.register("UserTest44", "UserTest44Pass")

export default new AuthService();
