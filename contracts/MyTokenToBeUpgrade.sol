// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyTokenToBeUpgrade is
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable
{
    uint256 public a;
    uint256 public b;
    uint256 public c;
    string public d;
    string public e;
    string public f;

    enum Status {
        INACTIVE,
        ACTIVE,
        DEACTIVATED,
        REMOVE
    }

    /// @dev This empty reserved space is put in place to allow future versions to add new
    /// variables without shifting down storage in the inheritance chain.
    /// See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps

    string public g;
    string public h;
    uint256[42] private __gap;
    // [44] to [42] because g, h used 2 slots.

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        a = 1;
        b = 2;
        c = 3;
        d = "1";
        e = "2";
        f = "3";
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function version() public pure virtual returns (uint256) {
        return 1;
    }

    function status() public pure virtual returns (Status, Status, Status) {
        return (Status.INACTIVE, Status.ACTIVE, Status.DEACTIVATED);
    }

    function reassign() public virtual {
        a += 2;
        b += 2;
        c += 2;
        d = "3"; // 1 + 2
        e = "4"; // 2 + 2
        f = "5"; // 3 + 2
    }
}
