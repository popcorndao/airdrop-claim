import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Navbar from "components/NavBar";
import { connectors } from "context/Web3/connectors";
import { ContractContext } from "context/Web3/contracts";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const IndexPage = () => {
  const router = useRouter();
  const context = useWeb3React<Web3Provider>();
  const { contract } = useContext(ContractContext);
  const { library, account, activate, active } = context;

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (!account || !contract) {
      return;
    }
    if (true) {
      router.push("/claim");
    } else {
      router.push("/error");
    }
  }, [account]);

  return (
    <>
      {/* Desktop + Large Desktop */}
      <div className="hidden xl:flex flex-col w-full h-screen bg-primaryLight">
        <Navbar />
        <div className="w-9/12 mx-auto mt-16 2xl:mt-40">
          <h1 className="text-8xl font-light w-1/2">Claim your Airdrop Now!</h1>
          <p className="mt-8 text-2xl 2xl:text-3xl w-5/12 ">
            Awesome that you have participated in our Airdrop. Now is the time
            to claim your eligible token by connecting your{" "}
            <span className="font-medium">Metamask wallet</span>.
          </p>
        </div>
        <img
          src="/images/Mint blue cat hands up.svg"
          alt="catHandsUp"
          className="absolute right-40 bottom-60 2xl:bottom-80 z-10 2xl:w-5/12"
        />
        <img
          src="/images/Mint blue cat with umbrella.svg"
          alt="catUmbrella"
          className="absolute bottom-20 right-60 2xl:right-112 z-10 2xl:w-4/12"
        />
        <img
          src="/images/Yellow_cat.svg"
          alt="catYellow"
          className="absolute bottom-20 2xl:bottom-80 left-40 z-10 2xl:w-4/12"
        />
        <img
          src="/images/Background_ hill.svg"
          alt="bgHill"
          className="absolute bottom-0 w-full"
        />
      </div>
      {/* Mobile + Tablet */}
      <div className="w-full h-screen xl:hidden bg-primaryLight">
        <Navbar />
        <div className="relative w-10/12 text-center mx-auto mt-12 md:mt-40 lg:mt-56 z-20">
          <h1 className="text-5xl font-light">Claim your Airdrop Now!</h1>
          <p className="mt-4 text-2xl font-light">
            Awesome that you have participated in our Airdrop. Now is the time
            to claim your eligible token by connecting your{" "}
            <span className="font-medium">Metamask wallet</span>.
          </p>
          <button
            className="relative w-48 py-3 px-3 mt-4 z-40 mx-auto flex flex-row items-center justify-center rounded-xl cursor-pointer bg-blue-600 hover:bg-blue-700"
            onClick={() => activate(connectors.Injected)}
          >
            <p className="text-xl font-medium text-white">Connect Wallet</p>
          </button>
        </div>
        <img
          src="/images/mobileBlueCat.svg"
          alt="catHandsUp"
          className="absolute right-0 bottom-5 md:bottom-20 md:right-5 lg:right-20 z-10 md:w-4/12 lg:w-3/12"
        />
        <img
          src="/images/Yellow_cat.svg"
          alt="catYellow"
          className="absolute bottom-16 md:bottom-36 left-0 lg:left-18 w-8/12 lg:w-6/12 z-10"
        />
        <img
          src="/images/mobileBg.svg"
          alt="bgHill"
          className="absolute bottom-0 w-full"
        />
      </div>
    </>
  );
};

export default IndexPage;
