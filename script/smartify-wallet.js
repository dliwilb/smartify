// smartify-wallet.js
// onConnect();

function showInput(inputId, element){
    document.getElementById(inputId).style.display = element.value == '0x0' ? 'block' : 'none';
}

let isRunning = false;

async function showNFTs() {

    if (isRunning == false) {
        isRunning = true;

        await connectWallet();
        await switchNetwork();
        // console.log(connected0xAccount);

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // const nftContractAddress = '0xf7774f3538ABB28c802933303d7ceA7367D95478';  // TPSI on Rinkeby --> ok
        // const nftContractAddress = '0xEC77b8C58013FeDFF20464cA7ac7B243CB1ED359';  // TPSI on smartBCH --> ok
        // const nftContractAddress = '0xD27CFd5b254E8D958c0c8e7f99E17A1e33652C1A'; // cryptor.at
        // const nftContractAddress = '0xE9513fCfdc498bEC30BE5eeD5EbB41B7C909AdDA';  // Duck --> ok
        // const nftContractAddress = '0xc4A688f832627DDeFF42E5346daD10A0df9879b6';  // Darker Duck --> ok
        // const nftContractAddress = '0x36F7e5eaFA2E96872B40cFBeD8e41767337ca8cF';  // Queens;
        // const nftContractAddress = '0xE765026Cad648785b080E78700cBF6fa1C050d7C';  // CashCats
        // const nftContractAddress = '0x88fA0495d5E9C1B178EAc1D76DF9D729e39fD8E8';  // Poolside Puffers
        // const nftContractAddress = '0x48973dbAC0d46B939CD12A7250eFBA965e8a8cf2';  // Reapers

        let nftContractAddress = document.getElementById('nft-contract-address').value;

        if (nftContractAddress === 'none-selected'){
            document.getElementById('collection-and-owner').innerHTML = '<h3>Please specify a collection.</h3>';
            isRunning = false;
            return 0;
        }
        else if (nftContractAddress === '0x0'){
            nftContractAddress = document.getElementById('custom-nft-contract-address').value;
        }
        console.log(nftContractAddress);

        const nftContract = new ethers.Contract(nftContractAddress, ERC721Abi, provider);

        const nameOfNft = await nftContract.name();

        // connected0xAccount = '0x2a01a145a28b465d1Ff2De331dAdD829E570fBB6';
        const eventFilterReceived = nftContract.filters.Transfer(null, connected0xAccount, null);
        const eventsReceived = await nftContract.queryFilter(eventFilterReceived);
        // console.log(eventsReceived);

        const eventFilterSent = nftContract.filters.Transfer(connected0xAccount, null, null);
        const eventsSent = await nftContract.queryFilter(eventFilterSent);
        // console.log(eventsSent);

        let ownedCandidates = {};
        for (let i = 0; i < eventsReceived.length; i++){
            const tokenId = eventsReceived[i].args[2];
            ownedCandidates[String(tokenId)] = {};
            ownedCandidates[String(tokenId)]["blockNumber"] = eventsReceived[i].blockNumber;
            ownedCandidates[String(tokenId)]["owned"] = true;
        }
        for (let i = 0; i < eventsSent.length; i++){
            const tokenId = eventsReceived[i].args[2];
            if  ( eventsSent[i].blockNumber >= ownedCandidates[String(tokenId)]["blockNumber"]){

            }
            ownedCandidates[String(tokenId)]["owned"] = false;
        }
        // console.log(ownedCandidates);
        // console.log(Object.keys(ownedCandidates));

        let arrayTokenId = Object.keys(ownedCandidates);
        let ownedIndex = 0;

        document.getElementById('collection-and-owner').innerHTML = `<h3>${nameOfNft} owned by ${connected0xAccount}... </h3>`;

        document.getElementById('list-of-nfts').innerHTML = '';
        for (let i = 0; i < arrayTokenId.length; i++) {
            if (ownedCandidates[String(arrayTokenId[i])]["owned"] === true) {

                ownedIndex++;
                const nftURI = await nftContract.tokenURI(arrayTokenId[i]);
                const nftJSON = await fetchJSON(nftURI);

                document.getElementById('list-of-nfts').innerHTML +=
                    `<span class="nftdisplay">[${ownedIndex}] Token ID: ${arrayTokenId[i]}<img src="${nftJSON.image}" width=200 height=200></span>`;

            }
        }

        document.getElementById('collection-and-owner').innerHTML = `<h3>${nameOfNft} owned by ${connected0xAccount}...&nbsp;&nbsp; ${ownedIndex} in total</h3>`;
        isRunning = false;
    }
}

// let numNFT = 0;
// document.getElementById('list-of-nfts').innerHTML = '';
// for (let i = 0; i < eventsReceived.length; i++) {
//     const transferFrom = eventsReceived[i].args[0];
//     const transferTo = eventsReceived[i].args[1];
//     const transferTokenId = eventsReceived[i].args[2];

//     const owner0xAccount = await nftContract.ownerOf(transferTokenId);
//     console.log(owner0xAccount + ":" + connected0xAccount);
//     if (String(owner0xAccount).toLowerCase() === String(connected0xAccount).toLowerCase()) {
//         numNFT++;
//         const nftURI = await nftContract.tokenURI(transferTokenId);
//         const nftJSON = await fetchJSON(nftURI);

//         document.getElementById('list-of-nfts').innerHTML = 
//         document.getElementById('list-of-nfts').innerHTML + 
//         `<div>From: ${transferFrom}<br>To: ${transferTo}<br>Token ID: ${transferTokenId}<br><img src="${nftJSON.image}" width=200 height=200></div><br>`;
//     }
// }
// console.log(numNFT);


async function fetchJSON(api_uri) {
	let response = await fetch(api_uri);
	
	if (!response.ok) {
	throw new Error(`HTTP error! status: ${response.status}`);
	}
	
	let myJSON = await response.json();
	
	return await myJSON;
}
