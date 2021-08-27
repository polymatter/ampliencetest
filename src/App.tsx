import { init, VisualizationSDK } from 'dc-visualization-sdk';
import { useEffect, useState } from 'react';

export default function () {
    useEffect(() => {
        init().then(setSdk).then();
    }, [])

    const [sdk, setSdk] = useState<VisualizationSDK>();

    if (!sdk) {
        return <div>Loading...</div>
    }

    return <div>Yo my dudes SDK has loaded</div>
}