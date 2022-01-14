/* Neurona simple para calcular de c a f*/
	
class NanoNeuron{
	   //constructor de la neurona , parametros w y b
	   //estos son los parametros que la neurona usara para aprender durante el proceso
	   constructor(w , b){
	   	    this.w = w;
	   	    this.b = b;
	   	}
	   	//Esta funcion acepta un parametro 'x' y devuelve la prediccion de 'y'
	   	predict(x){
	   		   return x * this.w + this.b;
	   	}
	   	//funcion para generar la coleccion de datos input=>output a usar en el entrenamiento de la neurona
	   	generateDataSets(maxval){
	   		   //aqui generaremos los ejemplos que la neurona usara para aprender ejemplo 0c = 32f ,1c = 33f
	   	    let cTrain = [] , fTrain= [];
	   	    for(let celsius = 0; celsius < maxval ; celsius++){
	   	    	    const fahrenheit = celsiusToFahrenheit(celsius);
	   	    	    cTrain.push(celsius);
	   	    	    fTrain.push(fahrenheit);
	   	    }
	   	    
	   	    //estos seran los datos de prueba que usaremos para saber si nuestra neurona aprendio a convertir(testing)
	   	    //seran ligeramente diferentes a los de entrenamiento.
	   	    let cTest = [] , fTest = [];
	   	    for(let celsius = 0.5; celsius < maxval ; celsius++){
	   	    	    const fahrenheit = celsiusToFahrenheit(celsius);
	   	    	    cTest.push(celsius);
	   	    	    fTest.push(fahrenheit);
	   	    }
	   	    
	   	    //retornamos los valores generados
	   	    return [cTrain , fTrain , cTest , fTest];
	   	}
	   	
	   	//funcion para calcular el umbral de error de 'x' y la predicción realizada por la neurona
	   	predictionCost(x , prediction){
	   		   return (x - prediction);
	   	}
	   	
	   	//esta funcion toma todos los ejemplos creados para el entrenamiento [cTrain , fTrain] y calcula todos los modelos de predicción para 'cTrain'
               forwardPropagation(model , cTrain , fTrain){
    	           const m = cTrain.length;
    	           let predictions = [];
    	           let cost = 0;
    	           for(let i = 0; i < m ; i++){
    	    	       const prediction = this.predict(cTrain[i]);
    	    	       cost += this.predictionCost(fTrain[i] , prediction);
    	    	       predictions.push(prediction);
    	           }
    	    
    	           cost /= m;
    	           return [predictions , cost];
               }
    
               //esta es la funcion que usara la neurona para aprender a calibrar su camino en la prediccion
               //para ello buscara el camino que menos costo requiera
               backwardPropagation(predictions , cTrain , fTrain){
    	           const m = cTrain.length;
    	           let dW = 0 , dB = 0;
    	   
    	           //funcion para calcular cuanto tiene que cambiar dW y que tan rapido el parametro w tiene que cambiar
    	           for(let i = 0; i < m ; i++){
    	   	       dW += (fTrain[i] - predictions[i]) * cTrain[i];
    	   	    
    	   	       //lo mismo con dB
    	   	       dB += (fTrain[i] - predictions[i]);
    	   	   }
    	          //sacamos el promedio de los resultados
    	          dW /= m;
    	          dB /= m;
    	          return [dW , dB];
           }
    
           //La funcion de entrenamiento , esta es la funcion encargada de entrenar la neurona , empleando un tiempo(epochs)
           //y la velocidad de entrenamiento (alpha)
           train(neuron , epochs , alpha , cTrain , fTrain){
    	       //variable para almacenar la historia de costos de la neurona
    	       let costHistory = [];
    	       for(let epoch = 0; epoch < epochs ; epoch++){
    	    	   const [predictions , cost] = this.forwardPropagation(neuron , cTrain , fTrain);    	    	   
    	    	   costHistory.push(cost);
    	    	   //usando el backwardPropagation ayudamos a la neurona a arreglar el umbral de prediccion
    	    	   const [dW , dB] = this.backwardPropagation(predictions , cTrain , fTrain);
    	    	   
    	    	   //ajustamos los parametros de la neurona para mejorar futuras predicciones
    	    	   this.w += alpha * dW;
    	    	   this.b += alpha * dB;
    	       }
    	      //retornamos toda la historia del costo
    	      return costHistory;
          }
 }

//funcion para convertir de celcius a fahrenheit
function celsiusToFahrenheit(c) {
    const w = 1.8;
    const b = 32;
    const f = c * w + b;
    return f;
};

module.exports = NanoNeuron;
