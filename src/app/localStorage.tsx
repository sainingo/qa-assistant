class StoreData {
    data: {[key: string]: any}
    constructor() {
        this.data = this.loadData()
    }

    saveInfo = (data: {[key: string]: any}) => localStorage.setItem('userInformation', JSON.stringify(data))
    loadData = () => localStorage.getItem('userInformation') || {}
    removeData = (st:string)=>localStorage.removeItem(st)
}
const storage = new StoreData()
export default storage;
