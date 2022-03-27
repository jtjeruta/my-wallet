import { createContext, FC, useContext, useState } from 'react'
import { Context, Record } from './types'
import storage from '../../lib/IonicStorage'

const RecordContext = createContext<Context | any>({})

export const RecordContextProvider: FC = ({ children }) => {
    const [records, setRecords] = useState<Record[]>([])

    const fetchRecords = async () => {
        let fetchedRecords: Record[] | null = await storage.get('records')

        if (!fetchedRecords) {
            storage.set('records', [])
            fetchedRecords = []
        }

        return fetchedRecords
    }

    const updateRecords = (records: Record[]) => {
        storage.set('records', records)
        setRecords(records)
    }

    const listRecords = async () => setRecords(await fetchRecords())

    const upsertRecord = async (record: Record) => {
        const fetchedRecords = await fetchRecords()

        if (fetchedRecords.some((r) => r.id === record.id)) {
            const newRecords = fetchedRecords.map((r) => {
                if (r.id === record.id) {
                    return record
                }

                return r
            })

            updateRecords(newRecords)
        } else {
            updateRecords([...fetchedRecords, record])
        }
    }

    const deleteRecord = async (id: string) => {
        const fetchedRecords = await fetchRecords()
        updateRecords(fetchedRecords.filter((r) => r.id !== id))
    }

    const values: Context = {
        records,
        listRecords,
        upsertRecord,
        deleteRecord,
    }

    return (
        <RecordContext.Provider value={values}>
            {children}
        </RecordContext.Provider>
    )
}

export const useRecordContext = () => useContext<Context>(RecordContext)
