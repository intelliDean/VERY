const hre = require("hardhat");
require("dotenv").config();


const {OWNER, CERTIFICATE, SIGNING_DOMAIN, SIGNATURE_VERSION} = process.env;

async function main() {


    console.log("🚀 Deploying contracts...OwnershipLib");
    // Step 1: Deploy OwnershipLib
    const ownershipLibFactory = await hre.ethers.getContractFactory("OwnershipLib");
    const ownershipLib = await ownershipLibFactory.deploy();
    console.log(`📚 OwnershipLib deployed at: ${ownershipLib.target}`);

    console.log("🚀 Deploying contracts...Ownership Contract");


    // Step 2: Deploy Ownership using OwnershipLib
    const ownershipContract = await hre.ethers.getContractFactory("Ownership", {
        libraries: {
            // OwnershipLib: ownershipLib.target,
            OwnershipLib: ownershipLib.target,
        },
    });
    const ownership = await ownershipContract.deploy();
    console.log(`📦 Ownership deployed at: ${ownership.target}`);

    console.log("🚀 Deploying contracts...Authenticity");
    // Step 3: Deploy Authenticity with Ownership address
    const AuthenticityFactory = await hre.ethers.getContractFactory("Authenticity");

    const authenticity = await AuthenticityFactory.deploy(
        ownership.target,
        OWNER,
        CERTIFICATE,
        SIGNING_DOMAIN,
        SIGNATURE_VERSION
    );
    console.log(`🧾 Authenticity deployed at: ${authenticity.target}`);

    console.log("✅ Deployment complete.");
}

main().catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exitCode = 1;
});


//VERY MAINNET
// 📚 OwnershipLib deployed at: 0x442576ef8EA93B6aA30cb7C779b8cC1e402bca5e

// 📦 Ownership deployed at: 0xBbcD22fd30EFA3c859f3C30a7224aB257D20b112

// 🧾 Authenticity deployed at: 0x97D9bcE273974455Bfc3A51E8Fd956D4209066A3

