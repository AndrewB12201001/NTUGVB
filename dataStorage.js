// Fetch Data

function fetchMatches() {
    let matchesJSON = localStorage.getItem("GVBmatches");
    if (!matchesJSON) {
        console.log("No matches found.");
        saveMatches([]);
        matchesJSON = localStorage.getItem("GVBmatches");
    }
    try {
        return JSON.parse(matchesJSON);
    } catch (error) {
        console.error("Error parsing matches JSON:", error);
        return [];
    }
}

function fetchTeams(){
    let teamsJSON = localStorage.getItem("GVBteams");
    if (!teamsJSON) {
        console.log("No teams found.");
        saveTeams({});
        teamsJSON = localStorage.getItem("GVBteams");
    }
    try {
        return JSON.parse(teamsJSON);
    } catch (error) {
        console.error("Error parsing teams JSON:", error);
        return {};
    }
}

function fetchTeamData(){// for input
    let teamDataJSON = localStorage.getItem("GVBteamData");
    if (!teamDataJSON) {
        console.log("No teamData found.");
        saveTeamData({});
        teamDataJSON = localStorage.getItem("GVBteamData");
    }try {
        return JSON.parse(teamDataJSON);
    } catch (error) {
        console.error("Error parsing teamData JSON:", error);
        return {};
    }
}

function fetchBrackets(){
    const brackets = JSON.parse(localStorage.getItem('GVBbrackets')) || {};
    return brackets;
}

function fetchOfficialStats() {
    const officialStats = JSON.parse(localStorage.getItem('GVBofficialStats')) || {};
    return officialStats;
}

function fetchGamesStarted(){
    const hasGamesStarted = localStorage.getItem('GVBgamesStarted') || false;
    return hasGamesStarted;
}

function fetchGameIDCounter(){
    const gameIDCounter = localStorage.getItem('GVBgameIDCounter') || 0;
    return gameIDCounter;
}

function fetchFirstClick(firstClickKey){
    const isFirstClick = localStorage.getItem(firstClickKey) || false;
    return isFirstClick;
}
// Save data

function saveMatches(matches) {
    try {
        const matchesJSON = JSON.stringify(matches);
        localStorage.setItem("GVBmatches", matchesJSON);
    } catch (error) {
        console.error("Error saving matches:", error);
    }
}

function saveTeams(teams){
    try {
        const teamsJSON = JSON.stringify(teams);
        localStorage.setItem("GVBteams", teamsJSON);
    } catch (error) {
        console.error("Error saving teams:", error);
    }
}

function saveTeamData(teamData){
    try {
        const teamDataJSON = JSON.stringify(teamData);
        localStorage.setItem("GVBteamData", teamDataJSON);
    } catch (error) {
        console.error("Error saving teamData:", error);
    }
}

function saveOfficialStats(officialStats){
    try {
        const officialsJSON = JSON.stringify(officialStats);
        localStorage.setItem("GVBofficialStats", officialsJSON);
    } catch (error) {
        console.error("Error saving officials:", error);
    }
}

function saveBrackets(existingBrackets){
    localStorage.setItem('GVBbrackets', JSON.stringify(existingBrackets));
}

function saveGameIDCounter(gameIDCounter){
    try {
        const gameIDCounterJSON = JSON.stringify(gameIDCounter);
        localStorage.setItem("GVBgameIDCounter", gameIDCounterJSON);
    } catch (error) {
        console.error("Error saving gameIDCounter:", error);
    }
}

function saveFirstClick(firstClickKey, state){
    localStorage.setItem(firstClickKey, state);
}

// 標記比賽已開始
function markGamesStarted(state) {
    localStorage.setItem('GVBgamesStarted', state);
}

function wipeEverything(){
    localStorage.clear();
}

function downloadJSON(jsonString, fileName = "data.json") {
    try {
        // 將字串解析為 JSON 格式
        const jsonObject = jsonString;

        // 將 JSON 物件轉換為字串，並設定縮排
        const formattedJSON = JSON.stringify(jsonObject, null, 2);

        // 創建一個 Blob 物件
        const blob = new Blob([formattedJSON], { type: "application/json" });

        // 創建一個臨時的超連結
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;

        // 觸發下載
        document.body.appendChild(link);
        link.click();

        // 清理資源
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        console.log("JSON 文件已成功下載！");
    } catch (error) {
        console.error("無法解析 JSON 字串:", error);
        alert("提供的字串無法解析為 JSON 格式，請檢查格式是否正確。");
    }
}