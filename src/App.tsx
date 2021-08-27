import { init, VisualizationSDK } from 'dc-visualization-sdk';
import { useEffect, useState } from 'react';

export default function () {
    useEffect(() => {
        init().then(setSdk);
    }, [])

    const [sdk, setSdk] = useState<VisualizationSDK>();
    const [stuff, setStuff] = useState<string>();

    if (!sdk) {
        return <div>Loading...</div>
    }

    sdk.form.changed((model) => {
        setStuff(JSON.stringify(model));
    })

    return <div>
        <div>Yo my dudes SDK has loaded</div>
        <div>{stuff}</div>
    </div>
}