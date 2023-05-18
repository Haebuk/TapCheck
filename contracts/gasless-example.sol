// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@opengsn/contracts/src/ERC2771Recipient.sol";

contract GaslessExample is ERC2771Recipient {
    constructor(address forwarder) {
        _setTrustedForwarder(forwarder);
    }

    function versionRecipient() external pure returns (string memory) {
        return "1";
    }
}

