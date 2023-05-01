import type { V2_MetaFunction } from "@remix-run/node";
import Window from "~/components/Window";

export const meta: V2_MetaFunction = () => {
	return [{ title: "New Remix App" }];
};

export default function Index() {
	return <Window title="">Test</Window>;
}
