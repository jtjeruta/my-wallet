type RecordBase = {
    id: string
    title?: string
    amount: number
    currency: string
    date: number
    tags?: string[]
}

export type RecordIncomeType = RecordBase & {
    type: 'income'
    account: string
}

export type RecordExpenseType = RecordBase & {
    type: 'expense'
    account: string
}

export type RecordTransferType = RecordBase & {
    type: 'transfer'
    accountFrom: string
    accountTo: string
}

export type RecordDebtType = RecordBase & {
    type: 'debt'
    account: string
    dateToPay: number
    debtor: 'me' | string
    lender: 'me' | string
    paid: false
}

export type Record =
    | RecordIncomeType
    | RecordExpenseType
    | RecordTransferType
    | RecordDebtType

export type Context = {
    records: Record[]
    listRecords: () => Promise<void>
    upsertRecord: (record: Record) => Promise<void>
    deleteRecord: (id: string) => Promise<void>
}
