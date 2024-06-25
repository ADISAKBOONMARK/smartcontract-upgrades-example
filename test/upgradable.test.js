const { expect } = require('chai')
const { ethers, upgrades } = require("hardhat");

// Start test block
describe('upgradable', function () {
  it("deploy v1", async function () {
    const MyToken = await ethers.getContractFactory("MyToken")
    const v1 = await upgrades.deployProxy(MyToken, [], { kind: 'uups', unsafeAllow: ['delegatecall'] })
    expect((await v1.a()).toString()).to.equal('1')
    expect((await v1.b()).toString()).to.equal('2')
    expect((await v1.c()).toString()).to.equal('3')
    expect((await v1.d()).toString()).to.equal('1')
    expect((await v1.e()).toString()).to.equal('2')
    expect((await v1.f()).toString()).to.equal('3')
    expect((await v1.version()).toString()).to.equal('1')
    const status = await v1.status();
    expect(Number(status[0])).to.equal(0)
    expect(Number(status[1])).to.equal(1)
    expect(Number(status[2])).to.equal(2)
  })
  it('upgrade v1 to v2', async function () {
    const MyToken = await ethers.getContractFactory("MyToken")
    const v1 = await upgrades.deployProxy(MyToken, [], { kind: 'uups', unsafeAllow: ['delegatecall'] })
    await v1.reassign();
    const MyTokenV2 = await ethers.getContractFactory("MyTokenV2")
    const v2 = await upgrades.upgradeProxy(await v1.getAddress(), MyTokenV2, { kind: 'uups', unsafeAllow: ['delegatecall'] })
    expect((await v2.a()).toString()).to.equal('3')
    expect((await v2.b()).toString()).to.equal('4')
    expect((await v2.c()).toString()).to.equal('5')
    expect((await v2.d()).toString()).to.equal('3')
    expect((await v2.e()).toString()).to.equal('4')
    expect((await v2.f()).toString()).to.equal('5')
    expect((await v2.g()).toString()).to.equal('')
    expect((await v2.h()).toString()).to.equal('')
    await v2.reassign();
    expect((await v2.g()).toString()).to.equal('1')
    expect((await v2.h()).toString()).to.equal('2')
    expect((await v2.version()).toString()).to.equal('2')
    const status = await v2.status();
    expect(Number(status[0])).to.equal(0)
    expect(Number(status[1])).to.equal(1)
    expect(Number(status[2])).to.equal(3)
  })

  it('upgrade v1 to v2 to v3', async function () {
    const MyToken = await ethers.getContractFactory("MyToken")
    const v1 = await upgrades.deployProxy(MyToken, [], { kind: 'uups', unsafeAllow: ['delegatecall'] })
    const MyTokenV2 = await ethers.getContractFactory("MyTokenV2")
    const v2 = await upgrades.upgradeProxy(await v1.getAddress(), MyTokenV2, { kind: 'uups', unsafeAllow: ['delegatecall'] })
    const MyTokenV3 = await ethers.getContractFactory("MyTokenV3")
    const v3 = await upgrades.upgradeProxy(await v2.getAddress(), MyTokenV3, { kind: 'uups', unsafeAllow: ['delegatecall'] })
    expect((await v3.version()).toString()).to.equal('3')
    const status = await v3.status();
    expect(Number(status[0])).to.equal(1)
    expect(Number(status[1])).to.equal(2)
    expect(Number(status[2])).to.equal(3)
    expect((await v3.g()).toString()).to.equal('')
    expect((await v3.h()).toString()).to.equal('')
    await v3.reassign();
    expect((await v3.g()).toString()).to.equal('1')
    expect((await v3.h()).toString()).to.equal('2')
    expect((await v3.a()).toString()).to.equal('1')
    expect((await v3.b()).toString()).to.equal('2')
    expect((await v3.c()).toString()).to.equal('3')
    expect((await v3.d()).toString()).to.equal('1')
    expect((await v3.e()).toString()).to.equal('2')
    expect((await v3.f()).toString()).to.equal('3')
  })
})
