import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Navbar from "components/NavBar";
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
    <div className="w-full h-screen bg-primaryLight">
      <Navbar />
      <div className="w-9/12 mx-auto mt-16">
        <h1 className="text-8xl font-light w-1/2">Claim your Airdrop Now!</h1>
        <p className="mt-8 text-2xl w-5/12">
          Awesome that you have participated in our Airdrop. Now is the time to
          claim your eligible token by connecting your{" "}
          <span className="font-medium">Metamask wallet</span>.
        </p>
      </div>
      <img
        src="/images/Mint blue cat hands up.svg"
        alt="catHandsUp"
        className="absolute right-40 bottom-60 z-10"
      />
      <img
        src="/images/Mint blue cat with umbrella.svg"
        alt="catUmbrella"
        className="absolute bottom-20 right-60 z-10"
      />
      <img
        src="/images/Yellow_cat.svg"
        alt="catYellow"
        className="absolute bottom-20 left-40 z-10"
      />
      <img
        src="/images/Background_ hill.svg"
        alt="bgHill"
        className="absolute bottom-0"
      />
    </div>
  );
};

export default IndexPage;
