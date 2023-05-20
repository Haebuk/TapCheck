// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract TapCheck is ERC2771Context {
    address public last;
    address[] public walletAddresses;
    mapping(address => bool) public isAuthorized;

    event checkInEvent(address indexed _addr, string _msg);

    constructor(address _trustedForwarder) ERC2771Context(_trustedForwarder) {}

    function addWalletAddress(address _walletAddress) public {
        require(_msgSender() != address(0), "Invalid sender");
        require(!isAuthorized[_walletAddress], "Wallet address already added");

        walletAddresses.push(_walletAddress);
        isAuthorized[_walletAddress] = true;

        last = _msgSender();
        emit checkInEvent(last, "success!");
    }
}
