

module.exports = [
  function(program){
    program
    .command('index:command')
    .description('Hello command')
    .action(function(options){
      // settlement(options);
    });
  }
];