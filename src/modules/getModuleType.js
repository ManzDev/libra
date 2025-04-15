export const getModuleType = (packageData) => {
  const isESM = packageData.moduleType === "module";
  const isCommonJS = !isESM || packageData.main.endsWith(".mjs");
  const isDual = isESM && isCommonJS;

  console.log({ packageData });

  return {
    isESM,
    isCommonJS,
    isDual
  };
};

// "ESM" -------> type: module
// "CommonJS" --> no tiene type: module o tiene algun fichero
// "Dual" ------> tiene ambos
// "Faux" ------> Dificil de calcular (mirar require())
