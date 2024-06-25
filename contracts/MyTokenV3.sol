// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MyTokenV2.sol";

contract MyTokenV3 is MyTokenV2 {
    function version() public pure virtual override returns (uint256) {
        return 3;
    }

    function status()
        public
        pure
        virtual
        override
        returns (Status, Status, Status)
    {
        return (
            Status.ACTIVE,
            Status.DEACTIVATED,
            Status.REMOVE
        );
    }
}
