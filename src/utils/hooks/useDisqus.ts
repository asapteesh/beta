import { useEffect } from "react";
import { useParams } from "react-router";
import { NETWORK, NODE_ENV, PROTOCOL_ACCOUNT_ID } from "../../config";
import { useDarkmode } from "../darkmode";

export default function useDisqus(identifier: string, title?: string) {
    const params = useParams();
    const isDarkmodeActive = useDarkmode();

    useEffect(() => {
        if (!title) return;

        // @ts-ignore
        window.disqus_config = function () {
            // @ts-ignore
            this.page.url = window.location.href;

            // @ts-ignore
            this.page.identifier = NODE_ENV + NETWORK + PROTOCOL_ACCOUNT_ID + params[identifier] + "_0";

            // @ts-ignore
            this.page.title = title;
        };

        try {
            // @ts-ignore
            DISQUS.reset({
                reload: true,
                // @ts-ignore
                config: window.disqus_config,
            });
        } catch (error) {
        }
    }, [params, identifier, title, isDarkmodeActive]);
}
