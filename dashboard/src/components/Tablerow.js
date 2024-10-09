import { CTableRow, CTableHeaderCell, CTableDataCell, CImage } from '@coreui/react-pro'

export function Tablerow({ transaction }) {
    return (
        <CTableRow>
            <CTableHeaderCell scope="row">{transaction.id}</CTableHeaderCell>
            <CTableDataCell>{transaction.title}</CTableDataCell>
            <CTableDataCell>{transaction.description}</CTableDataCell>
            <CTableDataCell>{transaction.price}</CTableDataCell>
            <CTableDataCell>{transaction.category}</CTableDataCell>
            <CTableDataCell>{transaction.sold == 1 ? "True" : "False"}</CTableDataCell>
            <CTableDataCell >{String(transaction.dateOfSale).substring(0, 10)}</CTableDataCell>
            <CTableDataCell><CImage src={transaction.image} width={100} height={100}></CImage></CTableDataCell>

        </CTableRow>
    )
}