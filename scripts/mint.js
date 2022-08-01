const { ethers } = require("hardhat");
const artifact = require("../artifacts/contracts/DropGenerativeArt.sol/DropGenerativeArt.json");

const main = async () => {
    const [admin] = await ethers.getSigners();
    console.log("admin: ", admin.address);
    
    // const contract = new ethers.Contract("0x2dB36cFA35fc3C0dC00Bf9A0286E4f3Ca9C60714", artifact.abi, admin);
    // const contract = new ethers.Contract("0x8569013bf45c1B2789d6d9D322CE61ec3F510f48", artifact.abi, admin);
    // const contract = new ethers.Contract("0x50D0095B43b3Ce4EcAb52c37F0cb6bC3A42F4E90", artifact.abi, admin);
    const contract = new ethers.Contract("0x8166041D01dac30C19519CB9986576C7cdc8B789", artifact.abi, admin);

    // const tx = await contract.setClaimConditions({
    //     startTimestamp: 0,
    //     maxClaimableSupply: 1000,
    //     supplyClaimed: 0,
    //     quantityLimitPerTransaction: 100,
    //     waitTimeInSecondsBetweenClaims: 0,
    //     merkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000",
    //     pricePerToken: 0,
    //     currency: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    // }, false);
    // await tx.wait();
    // console.log("tx: ", tx.hash);

    // const tx = await contract.lazyMint(100, "https://gen-art-api.herokuapp.com/metadata/", []);
    // await tx.wait();
    // console.log("tx hash: ", tx.hash);

    const tx = await contract.claim(admin.address, 2, "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", 0, {
        proof: ["0x0000000000000000000000000000000000000000000000000000000000000000"],
        maxQuantityInAllowlist: 0
    }, []);
    await tx.wait();
    console.log("tx hash: ", tx.hash);

}

main()
.then(() => process.exit(0))
.catch((err) => {
    console.log(err);
    process.exit(1);
});