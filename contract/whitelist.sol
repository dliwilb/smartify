// SPDX-License-Identifier: GPL-3.0
// pragma solidity >=0.7.0 <0.9.0;
pragma solidity ^0.8.0;

contract Whitelist {

    address public owner;

    mapping(address => bool) whitelistedAddresses;

    constructor() {
      owner = msg.sender;
      whitelistedAddresses[msg.sender] = true;
    }

    modifier onlyOwner() {
      require(msg.sender == owner, "Ownable: caller is not the owner");
      _;
    }

    modifier isWhitelisted(address _address) {
      require(whitelistedAddresses[_address], "Whitelist: You need to be whitelisted");
      _;
    }

    // function addUser(address _addressToWhitelist) public onlyOwner {
    //   whitelistedAddresses[_addressToWhitelist] = true;
    // }

    function addUser(address _addressToWhitelist) public isWhitelisted(msg.sender) {
      whitelistedAddresses[_addressToWhitelist] = true;
    }

    function removeUser(address _addressToWhitelist) public onlyOwner {
      whitelistedAddresses[_addressToWhitelist] = false;
    }

    function verifyUser(address _whitelistedAddress) public view returns(bool) {
      bool userIsWhitelisted = whitelistedAddresses[_whitelistedAddress];
      return userIsWhitelisted;
    }

    // function exampleFunction() public view isWhitelisted(msg.sender) returns(bool){
    //   return (true);
    // }

}