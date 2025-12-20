import { useTable } from "#base/src/helpers/contexts/TableContext"

const Detail = () => {
    const {rowData} = useTable()
    console.log(rowData);
    return (<>test Detail</>)
}
export default Detail