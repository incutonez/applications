module.exports = (conn, types) => {
  const QuestionModel = conn.define('Question', {
    Id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Type: {
      type: types.INTEGER,
      allowNull: false
    },
    Information: {
      type: types.STRING,
      allowNull: false
    },
    Answer: {
      type: types.STRING
    }
  });

  QuestionModel.includeOptions = [];

  return QuestionModel;
};