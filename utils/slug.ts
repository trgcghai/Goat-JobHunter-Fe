export const slugify = (text: string): string =>
    text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // space → -
        .replace(/[^\w-]+/g, '') // remove special chars
        .replace(/--+/g, '-');
