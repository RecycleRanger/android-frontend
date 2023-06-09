export enum Actions {
  added = 'added',
  changed = 'changed',
  deleted = 'deleted'
}

export interface Teacher {
  id: number,
  username: string,
  date_started: string,
}

export interface Student {
  id: number,
  student_name: string,
  score: number,
  class_id: number,
  numOfTrash: number,
}

export enum UsrType {
  teacher = 1,
  student = 2
}

export interface CurrentUsrType {
  user: Teacher | Student,
  type: UsrType,
}
