import { useEffect } from "react";
import { useParams } from "react-router";
import { NODE_ENV } from "../../config";

export default function useDisqus(identifier: string, title?: string) {
    const params = useParams();

    useEffect(() => {
        if (!title) return;

        // @ts-ignore
        window.disqus_config = function () {
            // @ts-ignore
            this.page.url = window.location.href;

            // @ts-ignore
            this.page.identifier = NODE_ENV + params[identifier] + "_0";

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
            console.error('[useDisuq]', error);
        }
    }, [params, identifier, title]);
}
