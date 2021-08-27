import { init, VisualizationSDK } from 'dc-visualization-sdk';
import { useEffect, useState } from 'react';

interface AmplienceBanner {
    '_meta': {
        name: string,
        schema: string,
        deliveryId: string
    },
    'banner-image': {
        '_meta': {
            schema: string
        },
        id: string,
        name: string,
        endpoint: string,
        defaultHost: string
    },
    isFeatured: boolean,
    'banner-title': string,
    width: number,
    height: number,
    actionType: string,
    actionParameter: string,
    paddingTop: number,
    paddingBottom: number,
    paddingLeft: number,
    paddingRight: number
}

interface AmplienceSlot {
    content: {
        banners: AmplienceBanner[]
        '_meta': {
            name: string,
            schema: string,
            deliveryId: string
        }
    }
}

type AmplienceBanners = AmplienceBanner[];

export default function App() {
    useEffect(() => {
        init().then(setSdk);
    }, [])

    const [sdk, setSdk] = useState<VisualizationSDK>();

    useEffect(() => {
        if (!sdk) return;

        sdk.form.get<AmplienceSlot>().then(slot => {
            setBanners(slot.content.banners);
        })
    },[sdk])

    const [banners, setBanners] = useState<AmplienceBanners>();

    if (!sdk || !banners) {
        return <div>Loading...</div>
    }

    sdk.form.changed((slot: AmplienceSlot) => {
        setBanners(slot.content.banners);
    });

    const getBannerImage = (banner : AmplienceBanner) => {
        const imageData = banner['banner-image'];

        return `https://${imageData.defaultHost}/i/${imageData.endpoint}/${imageData.name}`;
    }

    return <div>
        <div>Yo my dudes SDK has loaded</div>
        <div>There are {banners.length} banners</div>
        { banners.map(banner => {
            return <img src={getBannerImage(banner)} alt={banner['banner-image'].id} />
        })}
    </div>
}