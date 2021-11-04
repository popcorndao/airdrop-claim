import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { connectors } from "../context/Web3/connectors";

const Navbar: React.FC = () => {
  const context = useWeb3React<Web3Provider>();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  return (
    <nav className="w-9/12 mx-auto flex flex-row items-center pt-12 justify-between">
      <img src="/textLogo.png" className="h-12" />
      <button
        className="w-48 py-3 px-3 z-20 flex flex-row items-center justify-center rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-700"
        onClick={() => activate(connectors.Injected)}
      >
        <p className="text-xl font-medium text-white">
          Connect{account ? "ed" : " Wallet"}
        </p>
      </button>
    </nav>
  );
};
export default Navbar;
