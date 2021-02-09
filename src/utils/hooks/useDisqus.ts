import { useEffect } from "react";
import { useParams } from "react-router";

export default function useDisqus(identifier: string) {
    const params = useParams();

    useEffect(() => {
        // @ts-ignore
        window.disqus_config = function () {
            // @ts-ignore
            this.page.url = window.location.href;

            // @ts-ignore
            this.page.identifier = NODE_ENV + params[identifier] + "_0";
        };

        try {
            // @ts-ignore
            DISQUS.reset({
                reload: true,
                // @ts-ignore
                config: window.disqus_config,
            });
        } catch (error) {
            console.error('[useDisuq]', error);
        }
    }, [params, identifier]);
}
