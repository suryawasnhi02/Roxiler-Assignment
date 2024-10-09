import { months } from "../services/config";
import { CContainer, CRow, CCol, CCard, CCardHeader, CListGroup, CListGroupItem } from '@coreui/react-pro'

export function Statistics({ selectedMonth, statistics }) {
    return (
        <CContainer className="mt-5 mb-3">
            <h1 className="mb-3">Statistics {months[selectedMonth]}</h1>
            <CCard style={{ width: '400px' }}>
                <CCardHeader>Header</CCardHeader>
                <CListGroup flush>
                    <CListGroupItem>
                        <CRow>
                            <CCol>Total Sum</CCol>
                            <CCol>{statistics.totalSum}</CCol>
                        </CRow>
                    </CListGroupItem>
                    <CListGroupItem>
                        <CRow>
                            <CCol>Total Sold Items</CCol>
                            <CCol>{statistics.countSoldItems}</CCol>
                        </CRow>
                    </CListGroupItem>
                    <CListGroupItem>
                        <CRow>
                            <CCol>Total UnSold Items</CCol>
                            <CCol>{statistics.countUnSoldItems}</CCol>
                        </CRow>
                    </CListGroupItem>
                </CListGroup>
            </CCard>
        </CContainer >
    )
}