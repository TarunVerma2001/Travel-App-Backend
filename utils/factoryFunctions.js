const APIFeatures = require('./apiFeatures');

exports.resSend = (status, data, results, msg, error, res) => {
  res.status(status).json({
    error: error,
    results: results,
    data: data,
    message: msg,
  });
};
exports.readAll = async (mainModel, req, res) => {
  const { parameter, value } = req.body;
  const searchBy = {};
  searchBy[`${parameter}`] = {
    $regex: value,
    $options: 'i',
  };
  const features = new APIFeatures(mainModel.find(searchBy), req.body)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const data = await features.query;
  this.resSend(
    200,
    data,
    data.length,
    ' Request successfully served',
    false,
    res
  );
};
