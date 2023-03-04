const fetchTransactions = async (parameters) => {
    let baseUrl = "http://localhost:3000/api/transactions"
    let url

    if(parameters.type !== undefined) {
        url = `${baseUrl}?type=${parameters.type} `
    } else if(parameters.type !==undefined && parameters.category !== undefined) {
        url = `${baseUrl}?tyoe=${parameters.type}&category=${parameters.category}`
    } else {
        url = baseUrl
    }

    const res = await fetch(url);
    let data = await res.json();

  return data;
}

export default fetchTransactions