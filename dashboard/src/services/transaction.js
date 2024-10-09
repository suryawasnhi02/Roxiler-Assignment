export async function getAll(search, page, month) {
    const res = await fetch(`http://localhost:4000/api/transaction/all?month=${month}&search=${search}&page=${page}`);
    const data = await res.json();
    return data;
}

export async function getStatistics(month) {
    const res = await fetch(`http://localhost:4000/api/transaction/statistics?month=${month}`);
    const data = await res.json();
    return data;
}

export async function getBarDetails(month) {
    const res = await fetch(`http://localhost:4000/api/transaction/barchart?month=${month}`);
    const data = await res.json();
    return data;
}