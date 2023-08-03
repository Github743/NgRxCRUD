export interface Book {
    id: number,
    title: string,
    author: string,
    cost: number
}

export interface BookState {
    books: Book[],
    expired: boolean
}

export interface Employee {
    name: string,
    role: string,
    skills: string
}