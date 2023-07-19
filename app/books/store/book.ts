export interface Book {
    id: number,
    title: string,
    author: string,
    cost: number
}

export interface BookState {
    books: Book[]
}