'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      'Posts',
      [
        {
          userId: 1,
          subId: 1,
          title: 'my best bread joke',
          body: 'Why was the loaf of bread upset? His plans kept going a rye.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          subId: 1,
          title: 'bread romance',
          body: 'What does a loaf of bread say when breaking up with their significant other? You deserve butter.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Posts', null, {});
  },
};
