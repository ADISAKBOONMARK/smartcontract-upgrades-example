async function main() {
    const MyToken = await ethers.getContractFactory("MyToken")
    console.log("Deploying MyToken, ProxyAdmin, and then Proxy...")
    const proxy = await upgrades.deployProxy(MyToken,[],{kind: 'uups'})
    console.log("Proxy of MyToken deployed to:", proxy.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
