const fetchPatchTransaction = async (data) => {
    //console.log(data)
    //console.log(data.id)
  const res = await fetch(`http://localhost:3000/api/transactions/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
};

export default fetchPatchTransaction;
