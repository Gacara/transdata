export interface data<T=any> {
    result: resultsInterface<T>;
}

export interface resultsInterface<T> {
    [id: string]: T[];
}

export interface stations {
    slug: string
    name: string
  }

export interface metros{
    code: string
    name: string
    directions: string
    id: number
}

