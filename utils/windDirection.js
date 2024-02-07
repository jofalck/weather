export const getWindDirectionIcon = (windDir) => {
    const direction = windDir.slice(-2);
    switch (direction) {
        case "N":
            return "↑";
        case "NE":
            return "↗";
        case "E":
            return "→";
        case "SE":
            return "↘";
        case "S":
            return "↓";
        case "SW":
            return "↙";
        case "W":
            return "←";
        case "NW":
            return "↖";
        default:
            return "";
    }
};