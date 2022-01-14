const NanoNeuron = require('./neuron.js');
//creamos la instancia de la nano neurona con parametros aleatorios
const nanoNeuron = new NanoNeuron(Math.random() , Math.random());

//generamos el modelo de entrenamiento
const [cTrain , fTrain] = nanoNeuron.generateDataSets(100);

//definimos la cantidad de veces a entrenar(epochs) y la velocidad (alpha);
const epochs = 10000;
const alpha = 0.0005;
//entrenamos la neurona
const training = nanoNeuron.train(nanoNeuron , epochs , alpha , cTrain , fTrain);

console.log(training[0]);// primer entrenamiento
console.log(training[epochs -1]); //entrenamiento final

//predicción neuronal luego del entrenamiento
console.log(nanoNeuron.predict(70) + 'f');