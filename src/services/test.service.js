const getMultiple = async (page = 1) => {
  // const offset = helper.getOffset(page, config.listPerPage);
  // const rows = await db.query(
  //     `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank
  //   FROM programming_languages LIMIT ?,?`,
  //     [offset, config.listPerPage]
  // );
  // const data = helper.emptyOrRows(rows);
  // const meta = { page };
  // return {
  //     data,
  //     meta,
  // };

  return 'Get multiple successfull';
};

const create = async (data) => {
  // create logic
  return 'Create successfull';
};

const update = async (id, data) => {
  // update logic

  // Example of uncaught exception
  unknown.toString();

  return 'Update successfull';
};

const remove = async (id) => {
  // remove logic
  return 'Delete successfull';
};

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
