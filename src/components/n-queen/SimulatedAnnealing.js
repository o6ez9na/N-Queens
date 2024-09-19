// Алгоритм отжига
export const simulatedAnnealing = (
    objectiveFunction,
    initialState,
    initialTemp,
    coolingRate,
    minTemp,
    stepsPerTemp,
    maxIterations,
    setBoardState,
    setTempHistory,
    setErrorHistory,
    setBestEnergyHistory
  ) => {
    return new Promise((resolve) => {
      let currentState = initialState;
      let currentValue = objectiveFunction(currentState);
      let bestState = currentState;
      let bestValue = currentValue;
  
      let temperature = initialTemp;
      const tempHistory = [];
      const errorHistory = [];
      const bestEnergyHistory = [];
  
      for (let iteration = 0; iteration < maxIterations; iteration++) {
        for (let step = 0; step < stepsPerTemp; step++) {
          const newState = generateNeighbor(currentState);
          const newValue = objectiveFunction(newState);
  
          const delta = newValue - currentValue;
  
          if (delta < 0) {
            currentState = newState;
            currentValue = newValue;
  
            if (newValue < bestValue) {
              bestState = newState;
              bestValue = newValue;
            }
          } else {
            const acceptanceProbability = Math.exp(-delta / temperature);
            if (Math.random() < acceptanceProbability) {
              currentState = newState;
              currentValue = newValue;
            }
          }
        }
  
        // Сохраняем историю
        tempHistory.push(temperature);
        errorHistory.push(currentValue);
        bestEnergyHistory.push(bestValue);
  
        // Обновляем доску после шага
        setBoardState([...currentState]);
  
        // Охлаждение температуры
        temperature *= coolingRate;
  
        if (temperature < minTemp) break;
      }
  
      // Устанавливаем данные для графиков
      setTempHistory(tempHistory);
      setErrorHistory(errorHistory);
      setBestEnergyHistory(bestEnergyHistory);
  
      resolve(bestState);
    });
  };
  
  // Генерация нового состояния (рандомная перестановка королев)
  const generateNeighbor = (state) => {
    const newState = [...state];
    const i = Math.floor(Math.random() * state.length);
    const j = Math.floor(Math.random() * state.length);
    newState[i] = j;
    return newState;
  };
  
  // Функция оценки (считаем количество атакующих королев)
  export const objectiveFunction = (state) => {
    let attacks = 0;
    for (let i = 0; i < state.length; i++) {
      for (let j = i + 1; j < state.length; j++) {
        if (state[i] === state[j] || Math.abs(state[i] - state[j]) === j - i) {
          attacks += 1;
        }
      }
    }
    return attacks;
  };
