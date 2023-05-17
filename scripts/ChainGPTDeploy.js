const main = async () => {
    
    const ChainGPT = await ethers.getContractFactory("ChainGPT");
    const chainGPTInstance = await ChainGPT.deploy();
  
    await chainGPTInstance.deployed()
    console.log("ChainGPT deployed to:", chainGPTInstance.address);
  
  };
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });