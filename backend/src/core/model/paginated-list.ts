
export class PaginatedList<T> {
     list: T[]
     page: number = 1
     rpp: number = 10
     hasMore: boolean = false
}