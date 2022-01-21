async function onConnect() {
	// ethereum.request({ method: 'eth_requestAccounts' });
	
	window.ethereum.request({
		method: 'eth_requestAccounts',
	}).then((response)=>{
		provider = new ethers.providers.Web3Provider(window.ethereum);
		document.querySelector('input[name="connectedAddress"]').value = response[0];
		
		window.ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: '0x4' }],
		}).then((response)=>{
		});
	});
	
	console.log( 'Is MetaMask? ' + ethereum.isMetaMask);
}

async function onMint() {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	let nftaddress = '0xf7774f3538ABB28c802933303d7ceA7367D95478';
	let nft_abi = [{"inputs": [],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_owner","type": "address"},{"indexed": true,"internalType": "address","name": "_approved","type": "address"},{"indexed": true,"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_owner","type": "address"},{"indexed": true,"internalType": "address","name": "_operator","type": "address"},{"indexed": false,"internalType": "bool","name": "_approved","type": "bool"}],"name": "ApprovalForAll","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_from","type": "address"},{"indexed": true,"internalType": "address","name": "_to","type": "address"},{"indexed": true,"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [],"name": "CANNOT_TRANSFER_TO_ZERO_ADDRESS","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "NOT_CURRENT_OWNER","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_approved","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "approve","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "getApproved","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"},{"internalType": "address","name": "_operator","type": "address"}],"name": "isApprovedForAll","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"},{"internalType": "string","name": "_uri","type": "string"}],"name": "mint","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "_name","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "ownerOf","outputs": [{"internalType": "address","name": "_owner","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"},{"internalType": "bytes","name": "_data","type": "bytes"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_operator","type": "address"},{"internalType": "bool","name": "_approved","type": "bool"}],"name": "setApprovalForAll","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bytes4","name": "_interfaceID","type": "bytes4"}],"name": "supportsInterface","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "_symbol","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "tokenURI","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "transferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"}];	
    let contract = new ethers.Contract(nftaddress, nft_abi, signer)
	
	// console.log(document.querySelector('input[name="mintTo"]').value);
	// console.log(document.querySelector('input[name="tokenId"]').value);
	// console.log(document.querySelector('input[name="tokenUri"]').value);
	
	let mintTo = document.querySelector('input[name="mintTo"]').value;
	let tokenId = document.querySelector('input[name="tokenId"]').value;
	let tokenUri = document.querySelector('input[name="tokenUri"]').value;
	// console.log(mintTo + tokenId + tokenUri);
	
	
	// function mint(address _to, uint256 _tokenId, string calldata _uri) external onlyOwner {
    let transaction = await contract.mint(mintTo, tokenId, tokenUri);
    // let tx = await transaction.wait();
    // let event = tx.events[0];
    // let value = event.args[2];
    // let tokenId = value.toNumber()
	
}

// if (typeof window.ethereum !== 'undefined') {
	// console.log('MetaMask is installed!');
// }