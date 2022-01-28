// smartify-wallet.js

let isWalletConnected = false;
let isNetworkConnected = false;

// onConnect();


async function showNFTs() {
    await connectWallet();
    await switchNetwork();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    console.log(signer);

    // awaitconnectWallet()
    // .then(() => switchNetwork()
    //             .then( () => {
    //                 const provider = new ethers.providers.Web3Provider(window.ethereum);
    //                 const signer = provider.getSigner(0);
    //                 console.log(signer);
    // }));

    // const nftaddress = '0xf7774f3538ABB28c802933303d7ceA7367D95478';  // TPSI on Rinkeby --> ok
    // const nftaddress = '0xEC77b8C58013FeDFF20464cA7ac7B243CB1ED359';  // TPSI on smartBCH --> ok
    const nftaddress = '0xD27CFd5b254E8D958c0c8e7f99E17A1e33652C1A'; // cryptor.at
    // const nftaddress = '0xE9513fCfdc498bEC30BE5eeD5EbB41B7C909AdDA';  // Duck --> ok
    // const nftaddress = '0xc4A688f832627DDeFF42E5346daD10A0df9879b6';  // Darker Duck --> ok
    // const nftaddress = '0x36F7e5eaFA2E96872B40cFBeD8e41767337ca8cF';  // Queens;
    // const nftaddress = '0xE765026Cad648785b080E78700cBF6fa1C050d7C';  // CashCats
    // const nftaddress = '0x88fA0495d5E9C1B178EAc1D76DF9D729e39fD8E8';  // Poolside Puffers
    // let nftaddress = '0x48973dbAC0d46B939CD12A7250eFBA965e8a8cf2';  // Reapers

    // const nftContractAddress = '0x48973dbAC0d46B939CD12A7250eFBA965e8a8cf2';  // Reapers

    // const eventFilter = marketContract.filters.MakeOrder(nftContractAddress);
    // const events = await marketContract.queryFilter(eventFilter, fromBlock, toBlock);
    // console.log(events);

    // const nOfEvents = events.length;

    // document.getElementById('list-of-reapers').innerHTML = `<p>[MakeOrder events from block ${fromBlock} to block ${toBlock}]</p><br>`;
    // for (let i = 0; i < events.length; i++) {
    //     const orderHash = events[i].args[2];
    //     const tokenId = events[i].args[1];
    //     const seller = events[i].args[3];
        
    //     const nftPrice = await marketContract.getCurrentPrice(orderHash);
    //     const nftPriceBCH = nftPrice / 1e18;
    //     const orderInfo = await marketContract.orderInfo(orderHash);
    //     // console.log(orderInfo);
    //     const auctionType = ['Fixed Price', 'Dutch Auction', 'English Auction'];

    //     const nftContract = new ethers.Contract(nftContractAddress, ERC721Abi, provider);

    //     const nftURI = await nftContract.tokenURI(tokenId);
    //     const nftJSON = await fetchJSON(nftURI);

    //     // document.getElementById('price-of-reaper').innerHTML = nftPrice;

    //     document.getElementById('list-of-reapers').innerHTML = 
    //         document.getElementById('list-of-reapers').innerHTML + 
    //         '<p>Token ID: ' + tokenId + '<br> Seller: ' + seller + '<br> Order Hash: ' + orderHash + '<br>' +
    //         `<img src="${nftJSON.image}" width=300 height=300><br> Current Price: ` + 
    //         nftPriceBCH + ` BCH @ ${auctionType[orderInfo[0]]} | sold? ${orderInfo[10]} | cancelled? ${orderInfo[11]} | ` + 
    //         `<a href="https://oasis.cash/token/${nftContractAddress}/${tokenId}" target="_blank">check it out on OASIS&thinsp;<img src="icons8-external-link-16_goldish.png"></a> | <a href="${nftURI}" target="_blank">check attributes&thinsp;<img src="icons8-external-link-16_goldish.png"></a></p><br>`;
    //         // '<p>' + tokenId + '<br>' + seller + '<br>' + orderHash + '<br>' + nftPriceBCH + 
    //         // ` BCH ${auctionType[orderInfo[0]]} Sold? ${orderInfo[10]} Cancelled? ${orderInfo[11]}<br>` + 
    //         // nftURI + '<br>' + `<img src="${nftJSON.image}" width=300 height=300>` + '</p>';
    //         // `<p>Token ID: ${tokenId}<br> Seller: ${seller}<br> orderHash: ${orderHash}<br>`;
    // }

    // const eventObj = JSON.parse(events);
    // console.log(events.length);
}


async function fetchJSON(api_uri) {
	let response = await fetch(api_uri);
	
	if (!response.ok) {
	throw new Error(`HTTP error! status: ${response.status}`);
	}
	
	let myJSON = await response.json();
	
	return await myJSON;
}
