const fetchTransactions = async (parameters) => {
    let baseUrl = "http://localhost:3000/api/transactions"
    let url;

    console.log(parameters)

    if(parameters.type !== undefined) {
        url = `${baseUrl}?type=${parameters.type} `
    } else if(parameters.name !== undefined) {
        url = `${baseUrl}?name=${parameters.name}`
    } else if(parameters.category !== undefined) {
        url = `${baseUrl}?category=${parameters.category}`
    } else if(parameters.amount !== undefined && parameters.amount !== "") {
        url = `${baseUrl}?amount=${parameters.amount}`
    } else if(parameters.date !== undefined && parameters.date !== "") {
        url = `${baseUrl}?date=${parameters.date}`
    } else {
        url = baseUrl
    }

    if (parameters.type !== undefined && !url.includes("?type")) {
        url = `${url}&type=${parameters.type} ` 
    } 
    if (parameters.name !== undefined && !url.includes("?name")) {
        url = `${url}&name=${parameters.name} ` 
    } 
    if (parameters.category !== undefined && !url.includes("?category")) {
        url = `${url}&category=${parameters.category}`
    }
    if(parameters.amount !== undefined && !url.includes("?amount") && parameters.amount !== "") {
        url = `${url}&amount=${parameters.amount}`
    } 
    if(parameters.date !== undefined && !url.includes("?date") && parameters.date !== "") {
        url = `${url}&date=${parameters.date}`
    }

    console.log(url)

    const res = await fetch(url);
    let data = await res.json();

  return data;
}

export default fetchTransactions