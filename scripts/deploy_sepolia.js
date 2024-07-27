const hre = require("hardhat");

async function main() {
  
  const gateway_add = "0x000000007f56768de3133034fa730a909003a165";
  
  const tokenFactory = await hre.ethers.getContractFactory("Counter");
  const counter_token = await tokenFactory.deploy(gateway_add);
	
  //const counter_token = await ethers.deployContract(gateway_add);
  await counter_token.waitForDeployment();

  console.log(`sepolia: ${counter_token.target}`);
  
  console.log(`Pausing 5 seconds in order to verify Contract`);
  await delay();
  console.log(`Pause finished. Verifying Contract...`);

  try {
    await hre.run("verify:verify", {
      address: counter_token.target,
      constructorArguments: [
		"0x000000007f56768de3133034fa730a909003a165"
	  ],
    });
    console.log("Contract verified to", hre.config.etherscan.customChains[1].urls.browserURL + "/address/" + counter_token.target);
  } catch (err) {
    console.error("Error veryfing Contract. Reason:", err);
  }
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 5 * 1000));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//npx hardhat run scripts/deploy_sepolia.js --network sepolia
//npx hardhat run scripts/deploy_shibuya.js --network shibuya

