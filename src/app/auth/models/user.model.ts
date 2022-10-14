export interface IUser {
    firstName: string,
    lastName:  string,
    birthday:  string,
    sex:  string,
    mobilePhone:  string,
    email: string,
    password:  string,
    hobby:  string
}

export interface IUserSchema {
    firstName: IFirstName,
    lastName:  ILastName,
    birthday:  IBirthday,
    sex:  IGender,
    mobilePhone:  IMobilePhone,
    email: IEmail,
    password:  IPassword,
    hobby:  IHobby
}

export interface IFirstName {
    required: boolean,
    minLength: string,
    maxLength: string
}

export interface ILastName {
    required: boolean,
    minLength: string,
    maxLength: string
}

export interface IBirthday {
    required: boolean,
    minAge: string,
    maxAge: string
}

export interface IGender {
    required: boolean
}

export interface IMobilePhone {
    required: boolean,
    regExp: string
}

export interface IEmail {
    required: boolean,
    regExp: string
}

export interface IPassword {
    required: boolean,
    minLength: string,
    maxLength: string
}

export interface IHobby {
    required: boolean,
    anyOf: string[],
}