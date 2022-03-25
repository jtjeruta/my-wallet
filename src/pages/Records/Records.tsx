import {
    IonCol,
    IonFab,
    IonFabButton,
    IonGrid,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonRow,
} from '@ionic/react'
import { add } from 'ionicons/icons'
import AppPageLayout from '../../components/AppPageLayout'
import './Records.css'

type RecordCommonType = {
    id: string
    title?: string
    amount: number
    currency: string
    date: number
    tags?: string[]
}

type RecordIncomeType = RecordCommonType & {
    type: 'income'
    account: string
}

type RecordExpenseType = RecordCommonType & {
    type: 'expense'
    account: string
}

type RecordTransferType = RecordCommonType & {
    type: 'transfer'
    accountFrom: string
    accountTo: string
}

type RecordDebtType = RecordCommonType & {
    type: 'debt'
    account: string
    dateToPay: number
    debtor: 'me' | string
    lender: 'me' | string
    paid: false
}

type RecordType =
    | RecordIncomeType
    | RecordExpenseType
    | RecordTransferType
    | RecordDebtType

const Page: React.FC = () => {
    const records: RecordType[] = [
        {
            id: '12sd123sdd',
            type: 'debt',
            account: 'BPI',
            amount: 5000,
            currency: 'PHP',
            date: new Date().getTime() / 1000,
            dateToPay: new Date().getTime() / 1000,
            debtor: 'manay',
            lender: 'me',
            paid: false,
        },
    ]
    return (
        <AppPageLayout pageTitle="Records">
            <IonList>
                {records.map((record) => {
                    return (
                        <IonItem key={record.id}>
                            <IonGrid>
                                <IonRow>
                                    {record.type === 'debt' && (
                                        <>
                                            <IonCol>
                                                <IonLabel>
                                                    <h2>{record.debtor}</h2>
                                                </IonLabel>
                                                <IonLabel>
                                                    <h3>{record.account}</h3>
                                                </IonLabel>
                                                <IonLabel>
                                                    <p>
                                                        {record.paid
                                                            ? new Date(
                                                                  record.dateToPay *
                                                                      1000
                                                              ).toDateString()
                                                            : 'Paid'}
                                                    </p>
                                                </IonLabel>
                                            </IonCol>
                                            <IonCol className="ion-text-end">
                                                <IonLabel>
                                                    <p>{record.amount}</p>
                                                </IonLabel>
                                                <IonLabel>
                                                    <p>
                                                        {new Date(
                                                            record.date * 1000
                                                        ).toDateString()}
                                                    </p>
                                                </IonLabel>
                                            </IonCol>
                                        </>
                                    )}
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    )
                })}
            </IonList>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton>
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>
        </AppPageLayout>
    )
}

export default Page
