export interface PromoCode {
    code: string,
    type: 'PERCENT' | 'MINUS',
    value: number
}

export const promoCodes: PromoCode[] = [
    {
        code: 'MAGIC20OFF',
        type: 'PERCENT',
        value: 20
    },
    {
        code: 'BIGDEAL',
        type: 'MINUS',
        value: 50
    },
    {
        code: 'NOTSOBIGDEAL',
        type: 'MINUS',
        value: 10
    },
    {
        code: 'CHRISMAS30OFF',
        type: 'PERCENT',
        value: 20
    }
]