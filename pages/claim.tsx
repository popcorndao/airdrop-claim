import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Navbar from "components/NavBar";
import { ContractContext } from "context/Web3/contracts";
import { promises as fs } from "fs";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import generateProof from "utils/generateProof";

const ClaimPage = ({ airdrops }) => {
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
    if (Object.keys(airdrops[0]).includes(account)) {
      router.push("/claim");
    } else {
      router.push("/error");
    }
  }, [account]);

  async function claimAirdrop(): Promise<void> {
    const proof = generateProof(airdrops[0], account);
    // await merkleOrchard.claimDistributions(
    //   account,
    //   [
    //     {
    //       distributionId: 0,
    //       balance: airdrops[0][account],
    //       distributor: "distributor",
    //       tokenIndex: 0,
    //       merkleProof: proof,
    //     },
    //   ],
    //   ["popAddress"]
    // );
  }

  return (
    <div className="w-full h-screen bg-primaryLight overflow-hidden">
      <Navbar />
      <div className="w-full text-center mt-14 md:mt-48 lg:mt-96 xl:mt-14 2xl:mt-80 z-20">
        <h1 className="text-4xl md:text-5xl 2xl:text-6xl font-medium w-full lg:w-1/2 text-center mx-auto">
          Congratulations!
        </h1>
        <div className="mx-auto w-full lg:w-1/2 justify-center flex">
          <div className="z-20">
            <p className="mt-8 text-2xl md:text-3xl 2xl:text-3xl font-light z-10">
              You are eligible to claim:
            </p>
            <div className="w-full mx-auto mt-4 px-8 py-4 border border-gray-800 rounded-lg bg-primaryLight">
              <p className="text-4xl md:text-6xl 2xl:text-7xl font-medium">
                {airdrops[0][account]} POP
              </p>
            </div>
            <button
              className="w-full mt-4 lg:mt-8 py-3 px-3 z-20 flex flex-row items-center justify-center rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-700"
              onClick={claimAirdrop}
              disabled={!account}
            >
              <p className="text-xl font-medium text-white">Claim</p>
            </button>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center">
        <img
          src="/images/popcorn.svg"
          alt="popcorn"
          className="absolute -top-40 lg:-top-100 z-10"
        />
        <img
          src="/images/astronautCat.svg"
          alt="astronautCat"
          className="absolute top-0 z-20 2xl:top-10"
        />
      </div>
      <img
        src="/images/moonDetails.svg"
        alt="moonDetails"
        className="absolute bottom-0 z-10 w-full"
      />
      <img
        src="/images/moon.svg"
        alt="moon"
        className="absolute bottom-0 -z-10 w-full"
      />
    </div>
  );
};

export async function getStaticProps() {
  const AIRDROP_DIR = "./public/airdrops/";
  const filenames = await fs.readdir(AIRDROP_DIR);
  const airdrops = await Promise.all(
    filenames.map(async (filename) => {
      const file = await fs.readFile(AIRDROP_DIR + filename, "utf8");
      return JSON.parse(file);
    })
  );
  return { props: { airdrops: airdrops } };
}

export default ClaimPage;
