const { expect } = require('chai')

let MyToken, MyTokenV2, MyTokenV3

let v1,v2,v3;

// Start test block
describe('(deploy proxy)', function () {
  before(async function () {
    MyToken = await ethers.getContractFactory("MyToken")
    v1 = await upgrades.deployProxy(MyToken,[],{kind: 'uups'})
  })
  it('retrieve return a version', async function () {
    expect((await v1.version()).toString()).to.equal('1')
  })
  it('upgrades', async function () {
    MyTokenV2 = await ethers.getContractFactory("MyTokenV2")
    v2 = await upgrades.upgradeProxy(v1.address, MyTokenV2)
  })
  it('retrieve return a version', async function () {
    expect((await v2.version()).toString()).to.equal('2')
  })
  it('upgrades', async function () {
    MyTokenV3 = await ethers.getContractFactory("MyTokenV3")
    v3 = await upgrades.upgradeProxy(v2.address, MyTokenV3)
  })
  it('retrieve return a version', async function () {
    expect((await v3.version()).toString()).to.equal('3')
  })
  it('retrieve return all version', async function () {
    expect((await v1.version()).toString()).to.equal('3')
    expect((await v2.version()).toString()).to.equal('3')
    expect((await v3.version()).toString()).to.equal('3')
  })
})
