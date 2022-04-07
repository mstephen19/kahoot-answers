const shortenAndTrim = (str: string) => {
    const cleaned = str.trim().replace(/<[a-zA-Z]*>|<\/[a-zA-Z]*>/g, '');

    if (cleaned.length > 60) return `${cleaned.slice(0, 60)}...`;

    return cleaned;
};

export default shortenAndTrim;
