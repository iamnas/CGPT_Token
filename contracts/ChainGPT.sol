// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChainGPT is ERC20, ERC20Burnable, Ownable {

    address public admin ;
    constructor() ERC20("ChainGPT", "CGPT") {
        admin = _msgSender();
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }

    modifier onlyOwnerOrAdmin{
        require(_msgSender()==owner() || _msgSender()== admin,"Ownable: caller is not the owner or admin");
        _;
    }

    function mint(address to, uint256 amount) public onlyOwnerOrAdmin {
        _mint(to, amount);
    }

    function setAdmin(address account) external onlyOwnerOrAdmin {
        require(account != address(0),"Invalid Address, Address should not be zero");
        admin = account;
    }


}
