import {PythonShell} from 'python-shell';

let options = {
  mode: 'text',
  pythonPath: 'path/to/python',
  pythonOptions: ['-u'],
  scriptPath: 'apps/text-generator/text-generator.py',
  args: ['apps/text-generator/cache/KanyeWest.h5', 'apps/text-generator/cache/KanyeWest-Tokenizer.json', 'Inputstring']
};

PythonShell.run('my_script.py', options, function (err, results) {
  if (err) throw err;
  console.log('results: %j', results);
});