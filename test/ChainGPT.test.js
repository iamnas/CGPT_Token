
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
	let ChainGPTFactory;
	let chainGPTToken;

	beforeEach(async function () {

		[owner, addr1, addr2, ...addrs] = await ethers.getSigners();

		ChainGPTFactory = await ethers.getContractFactory("ChainGPT");
		chainGPTToken = await ChainGPTFactory.deploy();

	});

	describe("Deployment", function () {

		it("Should assign the total supply of tokens to the owner", async function () {
			const ownerBalance = await chainGPTToken.balanceOf(owner.address);
			expect(await chainGPTToken.totalSupply()).to.equal(ownerBalance);
		});
	});

	describe("Transactions", function () {
		it("Should transfer tokens between accounts", async function () {
			// Transfer 50 tokens from owner to addr1
			await chainGPTToken.transfer(addr1.address, 50);
			const addr1Balance = await chainGPTToken.balanceOf(addr1.address);
			expect(addr1Balance).to.equal(50);

			// Transfer 50 tokens from addr1 to addr2
			// We use .connect(signer) to send a transaction from another account
			await chainGPTToken.connect(addr1).transfer(addr2.address, 50);
			const addr2Balance = await chainGPTToken.balanceOf(addr2.address);
			expect(addr2Balance).to.equal(50);
		});

		it("Should fail if sender doesn’t have enough tokens", async function () {
			const initialOwnerBalance = await chainGPTToken.balanceOf(owner.address);

			// Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
			// `require` will evaluate false and revert the transaction.
			await expect(
				chainGPTToken.connect(addr1).transfer(owner.address, 1)
			).to.be.revertedWith("ERC20: transfer amount exceeds balance");

			// Owner balance shouldn't have changed.
			expect(await chainGPTToken.balanceOf(owner.address)).to.equal(
				initialOwnerBalance
			);
		});

		it("Should update balances after transfers", async function () {
			const initialOwnerBalance = await chainGPTToken.balanceOf(owner.address);

			// Transfer 100 tokens from owner to addr1.
			await chainGPTToken.transfer(addr1.address, 100);

			// Transfer another 50 tokens from owner to addr2.
			await chainGPTToken.transfer(addr2.address, 50);

			// Check balances.
			const finalOwnerBalance = await chainGPTToken.balanceOf(owner.address);
			expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

			const addr1Balance = await chainGPTToken.balanceOf(addr1.address);
			expect(addr1Balance).to.equal(100);

			const addr2Balance = await chainGPTToken.balanceOf(addr2.address);
			expect(addr2Balance).to.equal(50);
		});

		it('should mint',async ()=>{

			const initialOwnerBalance = await chainGPTToken.balanceOf(owner.address);
			await chainGPTToken.mint(owner.address,1000)
			// Check balances.
			const finalOwnerBalance = await chainGPTToken.balanceOf(owner.address);
			expect(finalOwnerBalance).to.equal(initialOwnerBalance.add(1000));
		})

		it('should change the admin ',async ()=>{
			
			await chainGPTToken.setAdmin(addr1.address)
			const adminAddress = await chainGPTToken.admin();
			expect(adminAddress).to.equal(addr1.address);
		})

		it('should mint method call by only owner or admin',async()=>{
			await expect( 
				chainGPTToken.connect(addr1).mint(addr1.address,10000) 
			).to.be.revertedWith("Ownable: caller is not the owner or admin");

			await expect( 
				chainGPTToken.connect(addr1).setAdmin(addr1.address) 
			).to.be.revertedWith("Ownable: caller is not the owner or admin");
		})
	});
});