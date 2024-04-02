import { useRouter } from "next/router";
import { EndpointTypes } from "../models/types";

export default function useQueryContext() {
  const router = useRouter();
  const cluster = router.query.cluster;
  const endpoint = cluster ? (cluster as EndpointTypes) : "mainnet";

    const hasCluster = endpoint !== "mainnet";
    const fmtUrlWithCluster = (url) => {
    if (hasCluster) {
        const mark = url.includes("?") ? "&" : "?";
        return decodeURIComponent(`${url}${mark}cluster=${endpoint}`);
    }
    return url;
    }

    return {
        fmtUrlWithCluster
    };
}