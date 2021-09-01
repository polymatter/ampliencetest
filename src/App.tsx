import { init, VisualizationSDK } from 'dc-visualization-sdk';
import { useEffect, useState } from 'react';
import { useWindowResize } from 'beautiful-react-hooks';

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
type deviceRatioMap = Record<string, { index: number, platform: string, ratio: number }>

const deviceRatios: deviceRatioMap = {
  ios: {
    index: 0,
    platform: 'ios',
    ratio: 375 / 812
  },
  ipad: {
    index: 1,
    platform: 'ios',
    ratio: 834 / 1112
  },
  android: {
    index: 2,
    platform: 'android',
    ratio: 360 / 740
  }
}

export default function App() {
  const deviceType: keyof deviceRatioMap = 'ios'

  useEffect(() => {
    init().then(setSdk);
  }, [])

  const [sdk, setSdk] = useState<VisualizationSDK>();

  useEffect(() => {
    if (!sdk) return;

    sdk.form.get<AmplienceSlot>().then(slot => {
      setBanners(slot.content.banners);
    })
  }, [sdk])

  const [banners, setBanners] = useState<AmplienceBanners>();

  const [windowHeight, setHeight] = useState(window.innerHeight)
  useWindowResize(() => {
    setHeight(window.innerHeight);
  })

  if (!sdk || !banners) {
    return <div>Loading...</div>
  }

  sdk.form.changed((slot: AmplienceSlot) => {
    setBanners(slot.content.banners);
  });

  const getBannerImage = (banner: AmplienceBanner) => {
    const imageData = banner['banner-image'];

    return `https://${imageData.defaultHost}/i/${imageData.endpoint}/${imageData.name}`;
  }

  const { ratio } = deviceRatios[deviceType];
  const deviceWidth = 812 * ratio;
  const deviceHeight = 812;

  let scale = 1;
  // const toolbarHeight = 134;
  const availableHeight = windowHeight - 50;
  if (deviceHeight > availableHeight) {
    scale = availableHeight / deviceHeight;
    if (scale < 0.7) {
      scale = 0.7;
    }
  }

  return <div>
    {banners.map(banner => {
      return <>
          <img
          src={getBannerImage(banner)}
          alt={banner['banner-image'].id}
          style={{
            width: deviceWidth
          }} />
          { banner.isFeatured && <br/> }
        </>
    })}
  </div>
}