export interface IPost {
    id: number,
    topic: string,
    postedBy: string,
    message: string,
    date: Date
}

export interface IUser {
    id: number,
    username: string,
    email: string,
    password: string
}