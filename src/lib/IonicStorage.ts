import { Storage, Drivers } from '@ionic/storage'

const storage = new Storage({
    name: 'my-wallet-db',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
})

storage.create()

export default storage
