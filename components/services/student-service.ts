import axios from "axios";
import { API_URL } from './service-info';


export type StudentsOfClass = {
  student_name: string;
  id: number;
  score: number;
  class_id: number;
}

export interface GeneratedPasscode {
  student_id: number,
  passcode: string,
}

export type Class = StudentsOfClass[];

export const StudentService = {
  updateName: async (
    id: number,
    newName: string,
    token: string
  ) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${API_URL}/student/update_name`,
          '',
          {
            params: {
              'newName': newName,
              'student_id': id.toString()
            },
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        )
        .then(async (res) => {
          resolve(res.data.student_name)
        })
        .catch((err) => {
          reject(err.response.data.detail);
        })
    });
  },
  getClass: async (id: number, token: string, skip = 0, limit = 100) => {
    return new Promise<Class>((resolve, reject) => {
      axios
        .get(
          `${API_URL}/class/${id.toString()}`,
          {
            params: {
              'skip': skip,
              'limit': limit
            },
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        )
        .then(async (res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response.data.detail);
        })
    });
  },
  autogenerateClass: async (num: number, token: string, skip = 0, limit = 100) => {
    return new Promise<Array<GeneratedPasscode>>((resolve, reject) => {
      axios
        .post(
          `${API_URL}/class/autogenerate/${num}`,
          '',
          {
            params: {
              'skip': skip,
              'limit': limit
            },
            headers: {
              'Accept': "application/json",
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
        .then(async (res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response.data.detail);
        })
    });
  },
  startGame: async (token: string) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(
          `${API_URL}/class/start_game`,
          '',
          {
            headers: {
              'Accept': "application/json",
              'Authorization': `Bearer ${token}`
            }
          }
        )
        .then(async (res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response.data.detail);
        });
    });
  },
};
