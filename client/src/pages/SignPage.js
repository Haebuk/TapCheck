import styled from "styled-components";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import "@rainbow-me/rainbowkit/styles.css";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import axios from "axios";
import { signTypedData } from "wagmi/actions";
import CONTRACT_ABI from "../abi/test.json";
import FORWARDER_ABI from "../abi/forwarder.json";
import Web3 from "web3";
import * as ethUtil from "ethereumjs-util";

export const SignPage = () => {
  const account = useAccount();
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_EVM_CHAIN_RPC_URL));
  const forwarderContract = new web3.eth.Contract(FORWARDER_ABI, process.env.REACT_APP_TRUSTED_FORWARDER_CONTRACT_ADDRESS);
  const eventContract = new web3.eth.Contract(CONTRACT_ABI, "0x8F92e9e9e7a64f2400Bc9131B9d550fC863E51f7");

  const isHolder = () => {};

  const sign = async () => {
    const callData = eventContract.methods.addWalletAddress(account.address).encodeABI();
    const domain = {
      name: "AAAA Platform",
      version: "1",
      chainId: 2000777,
      verifyingContract: process.env.REACT_APP_TRUSTED_FORWARDER_CONTRACT_ADDRESS,
      salt: null,
    };

    const types = {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      Message: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "gas", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "data", type: "bytes" },
        { name: "validUntilTime", type: "uint256" },
        { name: "ABCDEFGHIJKLMNOPQRSTGSN", type: "bytes32" },
      ],
    };

    const estimateGas = "4000000";
    const primaryType = "Message";

    const message = {
      data: callData,
      from: account.address,
      gas: ethUtil.bnToHex(Number(estimateGas)),
      nonce: ethUtil.bnToHex(Number(await forwarderContract.methods.getNonce(account.address).call())),
      to: "0x8F92e9e9e7a64f2400Bc9131B9d550fC863E51f7",
      validUntilTime: String("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),
      value: String("0x0"),
    };

    const dataToSign = {
      domain,
      types,
      primaryType,
      message: {
        ...message,
        ABCDEFGHIJKLMNOPQRSTGSN: Buffer.from("bytes32 ABCDEFGHIJKLMNOPQRSTGSN)", "utf8"),
      },
    };

    const sig = await signTypedData(dataToSign);

    console.log(sig);
    // const forwardRequest = {
    //   domain,
    //   types,
    //   primaryType,
    //   message,
    // };

    // const relayTx = {
    //   forwardRequest: forwardRequest,
    //   metadata: {
    //     signature: sig.substring(2),
    //   },
    // };

    // const hexRawTx = "0x" + Buffer.from(JSON.stringify(relayTx)).toString("hex");
    // console.log(hexRawTx);

    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("POST", process.env.REACT_APP_GAS_RELAYER_RPC_URL);
    // xmlhttp.send(JSON.stringify({ jsonrpc: "2.0", method: "eth_sendRawTransaction", params: [hexRawTx], id: 1 }));
  };

  return (
    <SignPageStyle>
      {account.address ? (
        <button className="sign-button" onClick={sign}>
          Sign for auth
        </button>
      ) : (
        <ConnectButton className="connect-button" />
      )}
    </SignPageStyle>
  );
};

const SignPageStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .sign-button {
    background-color: #ef5cd8;
    border: none;
    border-radius: 1000px;
    font-size: 1.5rem;
    width: 12rem;
    height: 3rem;
    cursor: pointer;
  }
`;
