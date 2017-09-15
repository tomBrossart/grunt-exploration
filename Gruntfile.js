module.exports = function(grunt) {
  grunt.registerTask('world', 'world task description', function(){
    console.log('hello world');
  });
  grunt.registerTask('hello', 'say hello', function(name){
    if(!name || !name.length)
      grunt.warn('you need to provide a name.');
    console.log('hello ' + name + ' you are a bomb ass developer');
  });

  grunt.registerTask('default', ['world', 'hello:Tom']);
};
