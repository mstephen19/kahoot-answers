const validateUrl = (url: string) => {
    let toUrl: URL;

    try {
        toUrl = new URL(url);
    } catch (error) {
        return false;
    }

    if (!toUrl) return false;

    const condition = !toUrl.searchParams.get('challenge-id') && !toUrl.searchParams.get('quiz-id');

    if (condition) return false;

    return true;
};

export default validateUrl;
