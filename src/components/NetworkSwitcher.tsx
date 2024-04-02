import { FC } from "react";
import dynamic from "next/dynamic";
import { useNetworkConfiguration } from "../contexts/NetworkConfigurationProvider";

const NetworkSwitcher: FC = () => {
  const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();

  return (
    <div className="relative inline-block w-full">
      <select
        value={networkConfiguration}
        onChange={(e) => setNetworkConfiguration(e.target.value || "devnet")}
        className="block appearance-none w-full bg-gray-700 border border-gray-500 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
      >
        <option value="mainnet-beta">Mainnet</option>
        <option value="devnet">Devnet</option>
        <option value="testnet">Testnet</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          {/* Use a path for a traditional dropdown arrow */}
        </svg>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(NetworkSwitcher), {
  ssr: false,
});
