import React, { useEffect, useState } from 'react'
import { getAll, getBarDetails, getStatistics } from '../../services/transaction'

import { TransactionTable } from '../../components/TransactionTable';
import { Statistics } from '../../components/Statistics';
import { BarGraph } from '../../components/BarGraph';

let totalData = 0;

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("3")
  const [transactions, setTransactions] = useState([]);
  const [query, setQuery] = useState("");
  const [statistics, setStatistics] = useState({});
  const [barData, setBarData] = useState([]);

  function nextPage() {
    if (currentPage === 1) return;
    setCurrentPage((current) => current + 1);
  }

  function previousPage() {
    if (currentPage === totalData / 10) return;
    setCurrentPage((current) => current - 1);
  }

  useEffect(() => {
    async function fetchData() {
      const allData = await getAll(query, currentPage, selectedMonth);
      totalData = allData.length;
      console.log(totalData)
      const statisticsData = await getStatistics(selectedMonth);
      const bardata = await getBarDetails(selectedMonth);
      const arr = [];
      for (let key in bardata.data[0]) {
        arr.push(bardata.data[0][key]);
      }
      setStatistics(statisticsData.data);
      setTransactions(allData.data);
      setBarData(arr);
    }
    fetchData();

  }, [selectedMonth, query])

  return (
    <>
      <TransactionTable query={query} setQuery={setQuery} setSelectedMonth={setSelectedMonth} nextPage={nextPage} previousPage={previousPage}
        selectedMonth={selectedMonth} transactions={transactions} currentPage={currentPage} totalData={totalData} />
      <Statistics selectedMonth={selectedMonth} statistics={statistics} />
      <BarGraph selectedMonth={selectedMonth} barData={barData} />
    </>
  )
}

export default Dashboard
