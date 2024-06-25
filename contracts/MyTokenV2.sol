// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MyTokenToBeUpgrade.sol";

contract MyTokenV2 is MyTokenToBeUpgrade {
    function version() public pure virtual override returns (uint256) {
        return 2;
    }

    function status()
        public
        pure
        virtual
        override
        returns (Status, Status, Status)
    {
        return (Status.INACTIVE, Status.ACTIVE, Status.REMOVE);
    }

    function reassign() public virtual override {
        g = "1";
        h = "2";
    }
}
