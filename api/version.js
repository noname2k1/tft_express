const getLatestVersion = async () => {
  try {
    const fetchData = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    const data = await fetchData.json();
    return data[0];
  } catch (error) {
    console.log("error when getLatestVersion:", error);
  }
};

module.exports = getLatestVersion;
