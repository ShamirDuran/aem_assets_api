/**
 * Get the starting point of the query
 * @param {*} currentPage Actual page number
 * @param {*} listPerPage Number of items per page
 * @returns Starting point of the query
 */
const getOffset = (currentPage = 1, listPerPage) => {
    return (currentPage - 1) * [listPerPage];
};
