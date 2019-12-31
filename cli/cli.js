var inquirer = require('inquirer');
inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: 'input',
        name: 'first_name',
        message: "What's your first name"
      },
      {
        type: 'input',
        name: 'first_name2',
        message: "What's your first name"
      }
  ])
  .then(answers => {
      console.log(answers,'22')
    // Use user feedback for... whatever!!
  });