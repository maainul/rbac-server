const createSuccess = (message, result) => {
  return {
    status: "success",
    title: "Success",
    message: message + ` Added Successfully`,
    data: result,
  };
};

module.exports = { createSuccess };
