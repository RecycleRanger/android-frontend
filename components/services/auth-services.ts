import axios from "axios";
import * as SecureStore from 'expo-secure-store';
global.Buffer = global.Buffer || require('buffer').Buffer;

import { UsrType, Teacher, Student, CurrentUsrType } from "../custom-types/UserTypes";
import { API_URL } from "./service-info";


export interface SuccessResponseSignUpTeacher {
  username: string;
  id: number;
}

export interface LoginSuccessResponse {
  access_token: string;
  token_type: string;
  usr: Teacher | Student;
  type: UsrType;
}

export const storage = {
  set: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },
  get: async (key: string) => {
    return await SecureStore.getItemAsync(key);
  },
  remove: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  }
};

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
      console.log("err");
      // Token or expiry time is missing
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpiryTime = decodedToken.exp;

    return currentTime >= tokenExpiryTime;
  } catch (error) {
    console.log(error);
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
  async login(
    usrType: UsrType,
    password: string,
    username: string,
    id?: number,
  ): Promise<CurrentUsrType> {

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

    return new Promise<CurrentUsrType>((resolve, reject) => {
      axios
        .post(
          `${API_URL}${loginUrl}`,
          urlSearchParams,
          {
            headers: {
              'Accept': "application/json",
              'Content-Type': "application/x-www-form-urlencoded"
            }
          }
        )
        .then((res) => {
          const loginResponse: LoginSuccessResponse = res.data;
          const currUsr: CurrentUsrType = {
            token: loginResponse.access_token,
            type: loginResponse.type,
            user: loginResponse.usr,
          };
          storage.set("access_token", loginResponse.access_token);
          resolve(currUsr);
        })
        .catch((err) => {
          reject(err.response.data.detail);
        })
    })
  }

  logout() {
    storage.remove("access_token")
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


  async getCurrentUser(): Promise<CurrentUsrType> {
    return new Promise<CurrentUsrType>((resolve, reject) => {
      storage.get("access_token")
        .then((token) => {
          console.log(token);
          if (token && !isTokenExpired(token)) {
            axios
              .get(
                `${API_URL}/auth/me`,
                {
                  headers: {
                    'Accept': "application/json",
                    'Authorization': `Bearer ${token}`
                  }
                }
              )
              .then(async (res) => {
                const currUsr: CurrentUsrType = { ...res.data, token: token };
                resolve(currUsr);
              })
              .catch((err) => {
                reject(err.response.data.detail);
              })
          } else {
            reject("Not Loged in");
          }
        })
        .catch((err) => {
          console.log(err);
        })
    })
  }
}

// const auth = new AuthService();

// auth.login(UsrType.teacher, "UserTestPass", "Useest")
//   .then(async (res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// auth.login(UsrType.student, "StudentTestPass", "s", 9);
// auth.register("UserTest44", "UserTest44Pass")

export default new AuthService();
