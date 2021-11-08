import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Navbar from "components/NavBar";
import { ContractContext } from "context/Web3/contracts";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const ErrorPage = () => {
  const router = useRouter();
  const context = useWeb3React<Web3Provider>();
  const { contract } = useContext(ContractContext);
  const { library, account, activate, active } = context;

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  return (
    <div className="w-full h-screen bg-primaryLight">
      <Navbar />
      <div className="w-full text-center mt-14 z-20">
        <h1 className="text-3xl lg:text-4xl font-medium w-10/12 lg:w-1/2 text-center mx-auto">
          Ops, it seems that you have not participated in our airdrop.
        </h1>
        <div className="z-20 mx-auto w-10/12 lg:w-1/2 justify-center flex">
          <div className="flex flex-wrap lg:flex-row z-20 mt-8">
            <p className="text-2xl font-light text-center">
              Follow our
              <a
                className="font-normal cursor-pointer ml-2"
                href="https://discord.gg/RN4VGqPDwX"
                target="_blank"
              >
                Discord
              </a>{" "}
              and
              <a
                className="font-normal cursor-pointer ml-1"
                href="https://twitter.com/popcorn_DAO"
                target="_blank"
              >
                Twitter
              </a>{" "}
              for the next drop!
            </p>
          </div>
        </div>
      </div>
      <img
        src="/images/errorBackground.svg"
        alt="bgError"
        className="hidden md:flex absolute bottom-0 -z-10"
      />
      <img
        src="/images/mobileErrorBg.svg"
        alt="bgError"
        className="absolute md:hidden bottom-0 -z-10"
      />
    </div>
  );
};

export default ErrorPage;
