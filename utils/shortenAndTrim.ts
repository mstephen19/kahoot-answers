const shortenAndTrim = (str: string) => {
    if (!str) return 'N/A';

    const cleaned = str.trim().replace(/<[a-zA-Z]*>|<\/[a-zA-Z]*>/g, '');

    if (cleaned.length > 50) return `${cleaned.slice(0, 50)}...`;

    return cleaned;
};

export default shortenAndTrim;
