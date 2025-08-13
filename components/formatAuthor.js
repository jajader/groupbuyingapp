export default function formatAuthor (author, hidename, hideor)  {
    const formattedAuthor = author.match(/^(\d+기)(.+)$/)
    if (hidename && hideor) return '익명';
    if (hidename) return formattedAuthor[1];
    if (hideor) return formattedAuthor[2];
    return author;
}