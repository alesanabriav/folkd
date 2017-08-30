module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn(
      'attachments',
      'drive_id',
      {
        type: Sequelize.STRING
      }
    );
  },
  down: (queryInterface) => {
    queryInterface.removeColumn('attachments', 'drive_id');
  }
}
