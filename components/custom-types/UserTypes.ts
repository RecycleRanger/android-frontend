export enum Actions {
  added = 'added',
  changed = 'changed',
  deleted = 'deleted'
}

export type Teacher = {
  id: number;
  username: string;
  date_started?: string;
}

export function isTeacher(usr: Teacher | Student): usr is Teacher {
  if ("username" in usr) {
    return true;
  } else {
    return false;
  }
}

export type Student = {
  id: number;
  student_name: string;
  score: number;
  class_id: number;
  numOfTrash: number;
}

export function isStudent(usr: Teacher | Student): usr is Student {
  return usr.hasOwnProperty('student_name');
}

export enum UsrType {
  teacher = 1,
  student = 2
}

export interface CurrentUsrType {
  token: string;
  user: Teacher | Student;
  type: UsrType;
}
