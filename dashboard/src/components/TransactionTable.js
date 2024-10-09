import { CTable, CTableHead, CTableRow, CTableHeaderCell, CFormSelect, CTableBody, CFormInput, CContainer, CRow, CCol, CButton, } from '@coreui/react-pro'
import { Tablerow } from './Tablerow';

export function TransactionTable({ setQuery, setSelectedMonth, selectedMonth, transactions, currentPage, query, totalData, nextPage, previousPage }) {
    return <><CRow className="justify-content-between">
        <CFormInput
            type="text"
            placeholder="Search Transaction"
            className="w-25 mb-3"
            value={query}
            onChange={
                (e) => {
                    setQuery(e.target.value);
                }
            }

        />

        <CFormSelect className="mb-3 w-25" aria-label="Large select example" value={selectedMonth} onChange={(e) => {
            setSelectedMonth(e.target.value);
        }}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </CFormSelect>
    </CRow>

        <CTable bordered>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col">id</CTableHeaderCell>
                    <CTableHeaderCell scope="col" responsive>Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col" responsive="sm">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col" responsive>Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col" responsive>Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col" responsive>Sold</CTableHeaderCell>
                    <CTableHeaderCell scope='col' responsive="xxl" style={{ width: "130px" }}>Date of Sale</CTableHeaderCell>
                    <CTableHeaderCell scope="col" responsive>Image</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {transactions.map((trans) => {
                    return <Tablerow transaction={trans} key={trans.id}></Tablerow>
                })}
            </CTableBody>
        </CTable>


        <CContainer>
            <CRow className="d-flex flex-row justify-content-between">
                <CCol sm="auto" className="align-self-center">Page No. {currentPage}</CCol>
                {totalData > 10 ? <CCol sm="auto">
                    <CContainer>
                        <CButton onClick={previousPage}>Previous</CButton>
                        <div className="d-inline">-</div>
                        <CButton onClick={nextPage}>Next</CButton>

                    </CContainer>
                </CCol> : <></>}
                <CCol sm="auto" className="align-self-center">Per Page 10</CCol>
            </CRow>
        </CContainer>
    </>
}