import { ConnectButton } from "@rainbow-me/rainbowkit";
import Layout from "@/components/Utilities/Layout";
import { useState, useEffect } from "react";
import { useContractWrite, useAccount, useNetwork } from "wagmi";
import { parseEther } from "viem";
import { ERC20 } from "@/components/Utilities/contract";
import { Address, Contract } from "@/components/Utilities/contract";
const assets = [
  "aUSDC",
  "wAXL",
  "axl-wstETH",
  "CELO",
  "axlWETH",
  "WMATIC",
  "WAVAX",
  "WFTM",
  "WBNB",
  "WDEV",
];

const chainOptions = [
  "Ethereum Goerli",
  "BNB Chain",
  "Polygon",
  "Avalanche",
  "Fantom",
  "Moonbase",
  "Celo",
  "Arbitrum",
  "Optimism",
  "Base",
  "Linea",
  "Polygon zkEVM",
  "Filecoin",
  "Kava",
];

const Form = () => {
  const { address } = useAccount();
  const [selectedAsset, setselectedAsset] = useState(assets[0]);
  const [selectedChain, setSelectedChain] = useState(chainOptions[0]);
  const [amount, setAmount] = useState("0");
  const { chain } = useNetwork();

  const network: any = chain?.network || "celo-alfajores";
  let contractAddresses: any = ERC20.address;

  const {
    write: approve,
    isLoading,
    isError,
    isSuccess,
  } = useContractWrite({
    address: contractAddresses[network],
    functionName: "approve",
    abi: ERC20.abi,
  });

  const handleApprove = async () => {
    await approve({
      args: ["0x3933C2024998Eb96400638B51600309cFfB3196A", parseInt(amount)],
    });
  };

  useEffect(() => {
    console.log(chain);
  }, [chain]);

  return (
    <Layout>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-2 sm:py-32 lg:px-8">
          <div className="flex justify-center">
            <ConnectButton />
          </div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Approve your wallet for token transfers
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                {/* <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Choose the destination chain
                  </label>
                  <div className="mt-2">
                    <select
                      onChange={(e) => setSelectedChain(e.target.value)}
                      className="h-10 w-full text-lg rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-900 focus:outline-none ring-2 ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                      {chainOptions.map((chain: any) => (
                        <option key={chain} value={chain}>
                          {chain}
                        </option>
                      ))}
                    </select>
                  </div>
                </div> */}

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Choose the asset
                    </label>
                  </div>

                  <div className="mt-2">
                    <select
                      onChange={(e) => setselectedAsset(e.target.value)}
                      className="h-10 w-full text-lg rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-900 focus:outline-none ring-2 ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                      {assets.map((asset: any) => (
                        <option key={asset} value={asset}>
                          {asset}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Amount
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      required
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleApprove}
                    type="button"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {isLoading
                      ? "Approving..."
                      : isError
                      ? "Error"
                      : isSuccess
                      ? "Approved"
                      : "Approve"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Form;
