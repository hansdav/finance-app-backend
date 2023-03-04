const fetchCategories = async (parameters) => {
    let baseUrl = "http://localhost:3000/api/categories"
    const res = await fetch(baseUrl);
    let data = await res.json();

  return data;
}

export default fetchCategories