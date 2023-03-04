const fetchTransactions = async (parameters) => {
    let baseUrl = "http://localhost:3000/api/transactions"
    let url

    if(parameters.type !== undefined) {
        url = `${baseUrl}?type=${parameters.type} `
    } else {
        url = baseUrl
        console.log(url)
    }
    console.log(url)
    const res = await fetch(url);
    let data = await res.json();

  return data;
}

export default fetchTransactions