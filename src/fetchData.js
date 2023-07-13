export const fetchData = async (query, page) => {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=21858532-01f8fabf05f69063186fd3644&image_type=photo&orientation=horizontal&per_page=12`
    );
    const data = await response.json();
    return data.hits;
  } catch (error) {
    throw error;
  }
};
