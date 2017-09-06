module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn(
      'steps',
      'assign_id',
      {
        type: Sequelize.INTEGER
      }
    );
  },
  down: (queryInterface) => {
    queryInterface.removeColumn('steps', 'assign_id');
  }
}
