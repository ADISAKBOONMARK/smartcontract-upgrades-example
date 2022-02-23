async function main() {
    const MyTokenV2 = await ethers.getContractFactory("MyTokenV2")
    let myTokenV2 = await upgrades.upgradeProxy("0x14635daf3ad34e77D3268E940AaaF8797550Fa22", MyTokenV2)
    console.log("Your upgraded proxy is done!", myTokenV2.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
