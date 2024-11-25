export const toTitleCase = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const extractPageTitle = (value: string) => {
    return value
        .split("/")[2]
        .replace("-", " ")
        .split(" ")
        .map((val) => toTitleCase(val))
        .join(" ");
};
