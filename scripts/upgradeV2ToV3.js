async function main() {
    const MyTokenV3 = await ethers.getContractFactory("MyTokenV3")
    let myTokenV3 = await upgrades.upgradeProxy("0x14635daf3ad34e77D3268E940AaaF8797550Fa22", MyTokenV3)
    console.log("Your upgraded proxy is done!", myTokenV3.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
