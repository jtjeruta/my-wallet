import { useEffect, useState } from 'react'
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
import {
    RecordContextProvider,
    useRecordContext,
} from '../../contexts/RecordContext'
import './Records.css'

const RecordsPageContent: React.FC = () => {
    const { records, listRecords } = useRecordContext()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function init() {
            setLoading(true)
            await listRecords()
            setLoading(false)
        }

        init()
    }, [])

    if (loading) return <p>Loading...</p>

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

const RecordsPage: React.FC = () => (
    <RecordContextProvider>
        <RecordsPageContent />
    </RecordContextProvider>
)

export default RecordsPage
