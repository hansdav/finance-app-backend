const fetchTransactions = async (parameters) => {
    let baseUrl = "http://localhost:3000/api/transactions"
    let url;

    console.log(parameters)

    if(parameters.type !== undefined && parameters.type !== "") {
        url = `${baseUrl}?type=${parameters.type} `
    } else if(parameters.description !== undefined && parameters.description !== "") {
        url = `${baseUrl}?description=${parameters.description}`
    } else if(parameters.category !== undefined && parameters.category !== "") {
        url = `${baseUrl}?category=${parameters.category}`
    } else if(parameters.amount !== undefined && parameters.amount !== "") {
        url = `${baseUrl}?${parameters.amount}=amount`
    } else if(parameters.date !== undefined && parameters.date !== "") {
        url = `${baseUrl}?${parameters.date}=date`
    } else {
        url = baseUrl
    }

    if (parameters.type !== undefined && !url.includes("?type") && parameters.type !== "") {
        url = `${url}&type=${parameters.type} ` 
    } 
    if (parameters.description !== undefined && !url.includes("?description") && parameters.description !== "") {
        url = `${url}&description=${parameters.description} ` 
    } 
    if (parameters.category !== undefined && !url.includes("?category") && parameters.category !== "") {
        url = `${url}&category=${parameters.category}`
    }
    if(parameters.amount !== undefined && !url.includes(`?${parameters.amount}=amount`) && parameters.amount !== "") {
        url = `${url}&${parameters.amount}=amount`
    } 
    if(parameters.date !== undefined && !url.includes(`?${parameters.date}=date`) && parameters.date !== "") {
        url = `${url}&${parameters.date}=date`
    }

    console.log(url)

    const res = await fetch(url);
    let data = await res.json();

  return data;
}

export default fetchTransactions