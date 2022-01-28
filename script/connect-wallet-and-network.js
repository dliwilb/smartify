// connectWalletAndNetwork.js
// connect wallet and switch network

let isWalletConnected = false;
let isNetworkConnected = false;


async function onConnect() {

    await connectWallet();
    if (isWalletConnected == true){
        await switchNetwork();
        // if (isNetworkConnected == true){
        //     await getMintFee();
        // }
    }

}

async function connectWallet() {

    if (window.ethereum) {
        try {
            const connectedAccount = await window.ethereum.request({ method: 'eth_requestAccounts' });
            isWalletConnected = true;
            document.getElementById('connected-address').value = connectedAccount;
            console.log('log: wallet connected');
        }
        catch (error) {
            if (error.code === 4001) {
                console.log('log: connection rejected by user');
            }

            console.log('log: cannot connect to wallet');
        }
    }

}

async function switchNetwork(){
 
    const chainIdTo = '0x2710';
    const chainIdToName = 'smartBCH';
    // const chainIdTo = '0x4';
    // const chainIdToName = 'Testnet Rinkeby';

    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainIdTo }],
        });

        isNetworkConnected = true;
        console.log(`log: switched to ${chainIdToName}`);
    }
    catch (error) {
        if (error.code === 4001) {
            console.log(`log: user rejected network switch to ${chainIdToName}`);
        }

        console.log(`log: cannot switch to ${chainIdToName}`);
        console.log(isWalletConnected);
        console.log(isNetworkConnected);
    }    
}