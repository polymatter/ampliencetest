import './App.css';
import { init } from 'dc-extensions-sdk';
import type { ContentFieldExtension } from 'dc-extensions-sdk';
import { useState, useEffect } from 'react';
import { AppWrap, SearchBox, Title, Text, SearchButton, SearchBoxWrap } from './style';

type FieldModel = string;
interface Parameters {
  instance: {};
  installation: {
    configParam: string;
  }
}

type AmplienceSdk = ContentFieldExtension<FieldModel, Parameters>;

const api = (search: string) => `https://dev.poq.io/clients/demo/search/predictive?keyword=${search}`;
// const api = (search: string) => `https://dev.poq.io/clients/demo/search`; //bala said to use this one.

// Note for CORS the response needs a "Access-Control-Allow-Origin" set,
const headers = {
  "Authorization": "Bearer anonymous+1fcac1b5-a3c6-4a62-80c1-62a478186863",
  "Content-Type": "application/json",
  "poq-app-identifier": "ca315772-4803-4b48-ae99-5683133770e6",
  "Poq-Currency-Identifier": "GBP",
  "User-Agent": "com.poq.poqdemoapp-uat/20.0.1 iOS/15.0",
}

interface PoqCategory {
  id: string;
  name: string;
  parentCategoryId?: string;
  imageUrl?: string;
  categories?: PoqCategory[]
}

function getCategories(item : PoqCategory): string[] {
  if (!Array.isArray(item.categories))
    return [item.name];

  return item.categories.map(child => {
    const a = getCategories(child).map(c => `${item.name} > ${c}`);
    return a;
  }).flat();
}

const data : PoqCategory[] = [
  {
    "id": "accessories",
    "name": "Accessories",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100024986_XM?w=1024",
    "categories": [
      {
        "id": "accessories>sunglasses",
        "name": "Sunglasses",
        "parentCategoryId": "accessories",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024851_XM?w=1024"
      },
      {
        "id": "accessories>bags",
        "name": "Bags",
        "parentCategoryId": "accessories",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024889_XM?w=1024"
      },
      {
        "id": "accessories>belts",
        "name": "Belts",
        "parentCategoryId": "accessories",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024841_ZM?w=1024"
      },
      {
        "id": "accessories>jewellery",
        "name": "Jewellery",
        "parentCategoryId": "accessories",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024986_XM?w=1024",
        "categories": [
          {
            "id": "accessories>jewellery>necklaces",
            "name": "Necklaces",
            "parentCategoryId": "accessories>jewellery",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024986_XM?w=1024"
          },
          {
            "id": "accessories>jewellery>bracelets-bangles",
            "name": "Bracelets & Bangles",
            "parentCategoryId": "accessories>jewellery",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024974_XM?w=1024"
          },
          {
            "id": "accessories>jewellery>earrings",
            "name": "Earrings",
            "parentCategoryId": "accessories>jewellery",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024985_XM?w=1024"
          },
          {
            "id": "accessories>jewellery>jewellery-sets",
            "name": "Jewellery Sets",
            "parentCategoryId": "accessories>jewellery",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024971_XM?w=1024"
          }
        ]
      },
      {
        "id": "accessories>capes-ponchos",
        "name": "Capes & Ponchos",
        "parentCategoryId": "accessories",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024714_XM?w=1024"
      },
      {
        "id": "accessories>holiday",
        "name": "Holiday",
        "parentCategoryId": "accessories",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024851_XM?w=1024"
      },
      {
        "id": "accessories>hats",
        "name": "Hats",
        "parentCategoryId": "accessories",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024106_XM?w=1024"
      },
      {
        "id": "accessories>party-accessories",
        "name": "Party Accessories",
        "parentCategoryId": "accessories",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024983_XM?w=1024"
      },
      {
        "id": "accessories>online-exclusive",
        "name": "Online Exclusive",
        "parentCategoryId": "accessories",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024851_XM?w=1024"
      },
      {
        "id": "accessories>wedding-accessories",
        "name": "Wedding Accessories",
        "parentCategoryId": "accessories",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024986_XM?w=1024"
      },
      {
        "id": "accessories>scarves-hats-gloves",
        "name": "Scarves, Hats & Gloves",
        "parentCategoryId": "accessories",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024106_XM?w=1024"
      },
      {
        "id": "accessories>fascinators",
        "name": "Fascinators",
        "parentCategoryId": "accessories",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024868_ZM?w=1024"
      },
      {
        "id": "accessories>hair-and-beauty",
        "name": "Hair Accessories",
        "parentCategoryId": "accessories",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024868_ZM?w=1024"
      },
      {
        "id": "accessories>10-off",
        "name": "£10 Off",
        "parentCategoryId": "accessories",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024104_XM?w=1024"
      }
    ]
  },
  {
    "id": "blogger-hot-list",
    "name": "Blogger Hot List",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100025006_XM?w=1024"
  },
  {
    "id": "clothes",
    "name": "Clothes",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024",
    "categories": [
      {
        "id": "clothes>bodysuits",
        "name": "Bodysuits",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024993_XM?w=1024",
        "categories": [
          {
            "id": "clothes>bodysuits>mesh",
            "name": "Mesh",
            "parentCategoryId": "clothes>bodysuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024993_XM?w=1024"
          },
          {
            "id": "clothes>bodysuits>lace",
            "name": "Lace",
            "parentCategoryId": "clothes>bodysuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024319_XM?w=1024"
          },
          {
            "id": "clothes>bodysuits>backless",
            "name": "Backless",
            "parentCategoryId": "clothes>bodysuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024318_XM?w=1024"
          }
        ]
      },
      {
        "id": "clothes>back-in-stock",
        "name": "Back In Stock",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025037_XM?w=1024"
      },
      {
        "id": "clothes>bardot",
        "name": "Bardot",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024671_XM?w=1024"
      },
      {
        "id": "clothes>casual",
        "name": "Casual",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025007_XM?w=1024"
      },
      {
        "id": "clothes>coordinates",
        "name": "Coordinates",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024857_XM?w=1024"
      },
      {
        "id": "clothes>dresses",
        "name": "Dresses",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024",
        "categories": [
          {
            "id": "clothes>dresses>bardot-dresses",
            "name": "Bardot Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024917_XM?w=1024"
          },
          {
            "id": "clothes>dresses>holiday",
            "name": "Holiday",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024802_XM?w=1024"
          },
          {
            "id": "clothes>dresses>one-shoulder",
            "name": "One shoulder",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100022058_XM?w=1024"
          },
          {
            "id": "clothes>dresses>black-tie-dresses",
            "name": "Black Tie Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024887_XM?w=1024"
          },
          {
            "id": "clothes>dresses>bridesmaid-dresses",
            "name": "Bridesmaid Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024907_XM?w=1024"
          },
          {
            "id": "clothes>dresses>fishtail-dresses",
            "name": "Fishtail Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024198_XM?w=1024"
          },
          {
            "id": "clothes>dresses>gold",
            "name": "Gold",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024092_XM?w=1024"
          },
          {
            "id": "clothes>dresses>embellished",
            "name": "Embellished",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024892_XM?w=1024"
          },
          {
            "id": "clothes>dresses>maxi-dresses",
            "name": "Maxi Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024907_XM?w=1024",
            "categories": [
              {
                "id": "clothes>dresses>maxi-dresses>red",
                "name": "Red",
                "parentCategoryId": "clothes>dresses>maxi-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024084_XM?w=1024"
              },
              {
                "id": "clothes>dresses>maxi-dresses>evening",
                "name": "Evening",
                "parentCategoryId": "clothes>dresses>maxi-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024907_XM?w=1024"
              },
              {
                "id": "clothes>dresses>maxi-dresses>blue-maxi-dresses",
                "name": "Blue",
                "parentCategoryId": "clothes>dresses>maxi-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024871_XM?w=1024"
              },
              {
                "id": "clothes>dresses>maxi-dresses>pink-maxi-dresses",
                "name": "Pink",
                "parentCategoryId": "clothes>dresses>maxi-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024768_XM?w=1024"
              },
              {
                "id": "clothes>dresses>maxi-dresses>black-maxi-dresses",
                "name": "Black",
                "parentCategoryId": "clothes>dresses>maxi-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024887_XM?w=1024"
              }
            ]
          },
          {
            "id": "clothes>dresses>high-neck",
            "name": "High neck",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024990_XM?w=1024"
          },
          {
            "id": "clothes>dresses>dip-hem-dresses",
            "name": "Dip Hem Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025037_XM?w=1024"
          },
          {
            "id": "clothes>dresses>glitter-dresses",
            "name": "Glitter Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024917_XM?w=1024"
          },
          {
            "id": "clothes>dresses>silver",
            "name": "Silver",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024409_XM?w=1024"
          },
          {
            "id": "clothes>dresses>cocktail",
            "name": "Cocktail",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024963_XM?w=1024"
          },
          {
            "id": "clothes>dresses>prom-dresses",
            "name": "Prom Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024907_XM?w=1024"
          },
          {
            "id": "clothes>dresses>sequin-dresses",
            "name": "Sequin Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024892_XM?w=1024",
            "categories": [
              {
                "id": "clothes>dresses>sequin-dresses>gold",
                "name": "Gold",
                "parentCategoryId": "clothes>dresses>sequin-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024090_XM?w=1024"
              },
              {
                "id": "clothes>dresses>sequin-dresses>long",
                "name": "long",
                "parentCategoryId": "clothes>dresses>sequin-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024805_XM?w=1024"
              },
              {
                "id": "clothes>dresses>sequin-dresses>long-sleeve",
                "name": "Long Sleeve",
                "parentCategoryId": "clothes>dresses>sequin-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024193_XM?w=1024"
              },
              {
                "id": "clothes>dresses>sequin-dresses>black",
                "name": "Black",
                "parentCategoryId": "clothes>dresses>sequin-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024193_XM?w=1024"
              },
              {
                "id": "clothes>dresses>sequin-dresses>short",
                "name": "Short",
                "parentCategoryId": "clothes>dresses>sequin-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024634_XM?w=1024"
              },
              {
                "id": "clothes>dresses>sequin-dresses>silver",
                "name": "Silver",
                "parentCategoryId": "clothes>dresses>sequin-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024409_XM?w=1024"
              }
            ]
          },
          {
            "id": "clothes>dresses>skater-dresses",
            "name": "Skater Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
          },
          {
            "id": "clothes>dresses>work-dresses",
            "name": "Work Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024857_XM?w=1024"
          },
          {
            "id": "clothes>dresses>wrap",
            "name": "Wrap",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
          },
          {
            "id": "clothes>dresses>ruched",
            "name": "Ruched",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024897_XM?w=1024",
            "categories": [
              {
                "id": "clothes>dresses>ruched>bodycon",
                "name": "Bodycon",
                "parentCategoryId": "clothes>dresses>ruched",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024897_XM?w=1024"
              }
            ]
          },
          {
            "id": "clothes>dresses>ruffle",
            "name": "Ruffle",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024989_XM?w=1024"
          },
          {
            "id": "clothes>dresses>red",
            "name": "Red",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024322_XM?w=1024"
          },
          {
            "id": "clothes>dresses>velvet",
            "name": "Velvet",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024788_XM?w=1024",
            "categories": [
              {
                "id": "clothes>dresses>velvet>long-sleeve",
                "name": "Long Sleeve",
                "parentCategoryId": "clothes>dresses>velvet",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024788_XM?w=1024"
              }
            ]
          },
          {
            "id": "clothes>dresses>wedding-guest-dresses",
            "name": "Wedding Guest Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
          },
          {
            "id": "clothes>dresses>midi-dresses",
            "name": "Midi Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025037_XM?w=1024",
            "categories": [
              {
                "id": "clothes>dresses>midi-dresses>floral-midi-dresses",
                "name": "Floral",
                "parentCategoryId": "clothes>dresses>midi-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024988_XM?w=1024"
              },
              {
                "id": "clothes>dresses>midi-dresses>pink-midi-dresses",
                "name": "Pink",
                "parentCategoryId": "clothes>dresses>midi-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024866_XM?w=1024"
              },
              {
                "id": "clothes>dresses>midi-dresses>blue-midi-dresses",
                "name": "Blue",
                "parentCategoryId": "clothes>dresses>midi-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024970_XM?w=1024"
              }
            ]
          },
          {
            "id": "clothes>dresses>shirt-dresses",
            "name": "Shirt Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024422_XM?w=1024"
          },
          {
            "id": "clothes>dresses>race-day-dresses",
            "name": "Race Day Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
          },
          {
            "id": "clothes>dresses>new-year-s-eve-dresses",
            "name": "New Year’s Eve Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024917_XM?w=1024"
          },
          {
            "id": "clothes>dresses>occasion-dresses",
            "name": "Occasion Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024961_XM?w=1024"
          },
          {
            "id": "clothes>dresses>little-black-dresses",
            "name": "Little Black Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024990_XM?w=1024"
          },
          {
            "id": "clothes>dresses>summer-dresses",
            "name": "Summer Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
          },
          {
            "id": "clothes>dresses>long-sleeve",
            "name": "Long Sleeve",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
          },
          {
            "id": "clothes>dresses>bodycon-dresses",
            "name": "Bodycon Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025007_XM?w=1024",
            "categories": [
              {
                "id": "clothes>dresses>bodycon-dresses>velvet",
                "name": "Velvet",
                "parentCategoryId": "clothes>dresses>bodycon-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024788_XM?w=1024"
              },
              {
                "id": "clothes>dresses>bodycon-dresses>clothes-dresses-ruched-bodycon",
                "name": "Ruched",
                "parentCategoryId": "clothes>dresses>bodycon-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024975_XM?w=1024"
              }
            ]
          },
          {
            "id": "clothes>dresses>floral-dresses",
            "name": "Floral Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
          },
          {
            "id": "clothes>dresses>going-out-dresses",
            "name": "Going out Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024990_XM?w=1024",
            "categories": [
              {
                "id": "clothes>dresses>going-out-dresses>maxi",
                "name": "Maxi",
                "parentCategoryId": "clothes>dresses>going-out-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100023810_XM?w=1024"
              }
            ]
          },
          {
            "id": "clothes>dresses>crochet",
            "name": "Crochet",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024521_XM?w=1024"
          },
          {
            "id": "clothes>dresses>chiffon",
            "name": "Chiffon",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
          },
          {
            "id": "clothes>dresses>lace-dresses",
            "name": "Lace Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024990_XM?w=1024",
            "categories": [
              {
                "id": "clothes>dresses>lace-dresses>black",
                "name": "Black",
                "parentCategoryId": "clothes>dresses>lace-dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024990_XM?w=1024"
              }
            ]
          },
          {
            "id": "clothes>dresses>evening-dresses",
            "name": "Evening Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024975_XM?w=1024"
          },
          {
            "id": "clothes>dresses>day-dresses",
            "name": "Day Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
          },
          {
            "id": "clothes>dresses>christmas-party-dresses",
            "name": "Christmas Party Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024917_XM?w=1024"
          },
          {
            "id": "clothes>dresses>formal-dresses",
            "name": "Formal Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024975_XM?w=1024"
          },
          {
            "id": "clothes>dresses>v-neck",
            "name": "V neck",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
          },
          {
            "id": "clothes>dresses>scuba",
            "name": "Scuba",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024961_XM?w=1024"
          },
          {
            "id": "clothes>dresses>ball-dresses",
            "name": "Prom And Ball Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024907_XM?w=1024"
          },
          {
            "id": "clothes>dresses>party",
            "name": "Party Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024990_XM?w=1024",
            "categories": [
              {
                "id": "clothes>dresses>party>sparkly",
                "name": "Sparkly",
                "parentCategoryId": "clothes>dresses>party",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024917_XM?w=1024"
              },
              {
                "id": "clothes>dresses>party>maxi",
                "name": "Maxi",
                "parentCategoryId": "clothes>dresses>party",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100023834_XM?w=1024"
              },
              {
                "id": "clothes>dresses>party>long-sleeve",
                "name": "Long Sleeve",
                "parentCategoryId": "clothes>dresses>party",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024990_XM?w=1024"
              },
              {
                "id": "clothes>dresses>party>short",
                "name": "Short",
                "parentCategoryId": "clothes>dresses>party",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024990_XM?w=1024"
              }
            ]
          },
          {
            "id": "clothes>dresses>mother-of-the-bride",
            "name": "Mother Of The Bride Dresses",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024808_XM?w=1024"
          },
          {
            "id": "clothes>dresses>slit",
            "name": "Split",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024892_XM?w=1024"
          },
          {
            "id": "clothes>dresses>tunics",
            "name": "Tunics & Shifts",
            "parentCategoryId": "clothes>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024634_XM?w=1024"
          }
        ]
      },
      {
        "id": "clothes>jeans",
        "name": "Jeans",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024505_XM?w=1024",
        "categories": [
          {
            "id": "clothes>jeans>skinny",
            "name": "Skinny",
            "parentCategoryId": "clothes>jeans",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024505_XM?w=1024"
          }
        ]
      },
      {
        "id": "clothes>skirts",
        "name": "Skirts",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024852_XM?w=1024",
        "categories": [
          {
            "id": "clothes>skirts>midi",
            "name": "Midi",
            "parentCategoryId": "clothes>skirts",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100023913_XM?w=1024"
          },
          {
            "id": "clothes>skirts>mini",
            "name": "Mini",
            "parentCategoryId": "clothes>skirts",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024852_XM?w=1024"
          }
        ]
      },
      {
        "id": "clothes>occasion-wear",
        "name": "Occasion Wear",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025037_XM?w=1024"
      },
      {
        "id": "clothes>jumpsuits",
        "name": "Jumpsuits",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024962_XM?w=1024",
        "categories": [
          {
            "id": "clothes>jumpsuits>wedding-jumpsuits",
            "name": "Wedding Jumpsuits",
            "parentCategoryId": "clothes>jumpsuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024809_XM?w=1024"
          },
          {
            "id": "clothes>jumpsuits>long-sleeved-jumpsuits",
            "name": "Long Sleeved Jumpsuits",
            "parentCategoryId": "clothes>jumpsuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024899_XM?w=1024"
          },
          {
            "id": "clothes>jumpsuits>wide-leg-jumpsuits",
            "name": "Wide Leg Jumpsuits",
            "parentCategoryId": "clothes>jumpsuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024962_XM?w=1024"
          },
          {
            "id": "clothes>jumpsuits>off-shoulder-jumpsuits",
            "name": "Off Shoulder Jumpsuits",
            "parentCategoryId": "clothes>jumpsuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024793_XM?w=1024"
          },
          {
            "id": "clothes>jumpsuits>curve-jumpsuits",
            "name": "Curve Jumpsuits",
            "parentCategoryId": "clothes>jumpsuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024046_XM?w=1024"
          },
          {
            "id": "clothes>jumpsuits>party",
            "name": "Party",
            "parentCategoryId": "clothes>jumpsuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024810_XM?w=1024"
          },
          {
            "id": "clothes>jumpsuits>occasion-jumpsuits",
            "name": "Occasion Jumpsuits",
            "parentCategoryId": "clothes>jumpsuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024962_XM?w=1024"
          },
          {
            "id": "clothes>jumpsuits>evening-jumpsuits",
            "name": "Evening Jumpsuits",
            "parentCategoryId": "clothes>jumpsuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024962_XM?w=1024"
          },
          {
            "id": "clothes>jumpsuits>black-jumpsuits",
            "name": "Black Jumpsuits",
            "parentCategoryId": "clothes>jumpsuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024962_XM?w=1024"
          },
          {
            "id": "clothes>jumpsuits>going-out-jumpsuits",
            "name": "Going Out Jumpsuits",
            "parentCategoryId": "clothes>jumpsuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024810_XM?w=1024"
          },
          {
            "id": "clothes>jumpsuits>casual-jumpsuits",
            "name": "Casual Jumpsuits",
            "parentCategoryId": "clothes>jumpsuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024899_XM?w=1024"
          }
        ]
      },
      {
        "id": "clothes>summer",
        "name": "Summer",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025037_XM?w=1024"
      },
      {
        "id": "clothes>playsuits",
        "name": "Playsuits",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025005_XM?w=1024",
        "categories": [
          {
            "id": "clothes>playsuits>summer-playsuits",
            "name": "Summer Playsuits",
            "parentCategoryId": "clothes>playsuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025005_XM?w=1024"
          },
          {
            "id": "clothes>playsuits>going-out-playsuits",
            "name": "Going Out Playsuits",
            "parentCategoryId": "clothes>playsuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100023971_XM?w=1024"
          },
          {
            "id": "clothes>playsuits>party",
            "name": "Party Playsuits",
            "parentCategoryId": "clothes>playsuits",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100023971_XM?w=1024"
          }
        ]
      },
      {
        "id": "clothes>going-out",
        "name": "Going Out",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024996_XM?w=1024"
      },
      {
        "id": "clothes>jackets-coats",
        "name": "Jackets & Coats",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024856_XM?w=1024",
        "categories": [
          {
            "id": "clothes>jackets-coats>coats",
            "name": "Coats",
            "parentCategoryId": "clothes>jackets-coats",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024266_XM?w=1024"
          },
          {
            "id": "clothes>jackets-coats>blazer",
            "name": "Blazer",
            "parentCategoryId": "clothes>jackets-coats",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024856_XM?w=1024"
          }
        ]
      },
      {
        "id": "clothes>jumpers-cardigans",
        "name": "Jumpers & Cardigans",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024952_XM?w=1024"
      },
      {
        "id": "clothes>leggings",
        "name": "Leggings",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024059_XM?w=1024"
      },
      {
        "id": "clothes>knitwear",
        "name": "Knitwear",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024995_XM?w=1024",
        "categories": [
          {
            "id": "clothes>knitwear>knitted-dresses",
            "name": "Knitted Dresses",
            "parentCategoryId": "clothes>knitwear",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024402_XM?w=1024"
          },
          {
            "id": "clothes>knitwear>jumpers",
            "name": "Jumpers",
            "parentCategoryId": "clothes>knitwear",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024834_XM?w=1024"
          },
          {
            "id": "clothes>knitwear>knitted-tops",
            "name": "Knitted Tops",
            "parentCategoryId": "clothes>knitwear",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024995_XM?w=1024"
          },
          {
            "id": "clothes>knitwear>cardigans",
            "name": "Cardigans",
            "parentCategoryId": "clothes>knitwear",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024458_XM?w=1024"
          },
          {
            "id": "clothes>knitwear>cardigans-shrugs",
            "name": "Cardigans & Shrugs",
            "parentCategoryId": "clothes>knitwear",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024458_XM?w=1024"
          }
        ]
      },
      {
        "id": "clothes>tops",
        "name": "Tops",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025006_XM?w=1024",
        "categories": [
          {
            "id": "clothes>tops>basic-tops",
            "name": "Basic Tops",
            "parentCategoryId": "clothes>tops",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024995_XM?w=1024"
          },
          {
            "id": "clothes>tops>going-out-tops",
            "name": "Going Out Tops",
            "parentCategoryId": "clothes>tops",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024850_XM?w=1024"
          },
          {
            "id": "clothes>tops>party",
            "name": "Party",
            "parentCategoryId": "clothes>tops",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024850_XM?w=1024"
          },
          {
            "id": "clothes>tops>christmas-party-tops",
            "name": "Christmas Party Tops",
            "parentCategoryId": "clothes>tops",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024491_XM?w=1024"
          },
          {
            "id": "clothes>tops>crop-tops",
            "name": "Crop Tops",
            "parentCategoryId": "clothes>tops",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025006_XM?w=1024"
          },
          {
            "id": "clothes>tops>peplum-tops",
            "name": "Peplum Tops",
            "parentCategoryId": "clothes>tops",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024863_XM?w=1024"
          },
          {
            "id": "clothes>tops>evening-tops",
            "name": "Evening Tops",
            "parentCategoryId": "clothes>tops",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024799_XM?w=1024"
          },
          {
            "id": "clothes>tops>bardot-tops",
            "name": "Bardot Tops",
            "parentCategoryId": "clothes>tops",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100021966_XM?w=1024"
          },
          {
            "id": "clothes>tops>day-tops",
            "name": "Day Tops",
            "parentCategoryId": "clothes>tops",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024995_XM?w=1024"
          },
          {
            "id": "clothes>tops>t-shirts",
            "name": "T-Shirts",
            "parentCategoryId": "clothes>tops",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024166_XM?w=1024"
          },
          {
            "id": "clothes>tops>shirts-blouses",
            "name": "Shirts & Blouses",
            "parentCategoryId": "clothes>tops",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024972_XM?w=1024"
          }
        ]
      },
      {
        "id": "clothes>trousers",
        "name": "Trousers",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024781_XM?w=1024"
      },
      {
        "id": "clothes>work",
        "name": "Work",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024972_XM?w=1024"
      },
      {
        "id": "clothes>10-off",
        "name": "£10 Off Clothing",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100023960_XM?w=1024"
      },
      {
        "id": "clothes>party",
        "name": "Partywear",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024990_XM?w=1024"
      },
      {
        "id": "clothes>festival",
        "name": "Festival",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025006_XM?w=1024"
      },
      {
        "id": "clothes>web-exclusive",
        "name": "Exclusive Collection",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
      },
      {
        "id": "clothes>working-from-home",
        "name": "Working From Home",
        "parentCategoryId": "clothes",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
      }
    ]
  },
  {
    "id": "limited-edition",
    "name": "Limited Edition",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100024972_XM?w=1024"
  },
  {
    "id": "plus-size",
    "name": "Plus Size",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100024989_XM?w=1024",
    "categories": [
      {
        "id": "plus-size>jumpers",
        "name": "Jumpers",
        "parentCategoryId": "plus-size",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024642_XM?w=1024"
      },
      {
        "id": "plus-size>tops",
        "name": "Tops",
        "parentCategoryId": "plus-size",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024642_XM?w=1024",
        "categories": [
          {
            "id": "plus-size>tops>party",
            "name": "Party",
            "parentCategoryId": "plus-size>tops",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024044_XM?w=1024"
          },
          {
            "id": "plus-size>tops>going-out",
            "name": "Going Out",
            "parentCategoryId": "plus-size>tops",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024615_XM?w=1024"
          }
        ]
      },
      {
        "id": "plus-size>jackets-coats",
        "name": "Jackets & Coats",
        "parentCategoryId": "plus-size",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024639_XM?w=1024"
      },
      {
        "id": "plus-size>dresses",
        "name": "Dresses",
        "parentCategoryId": "plus-size",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024989_XM?w=1024",
        "categories": [
          {
            "id": "plus-size>dresses>maxi",
            "name": "Maxi",
            "parentCategoryId": "plus-size>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024907_XM?w=1024"
          },
          {
            "id": "plus-size>dresses>party",
            "name": "Party",
            "parentCategoryId": "plus-size>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024664_XM?w=1024"
          },
          {
            "id": "plus-size>dresses>wedding-guest",
            "name": "Wedding Guest",
            "parentCategoryId": "plus-size>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024806_XM?w=1024"
          },
          {
            "id": "plus-size>dresses>prom",
            "name": "Prom",
            "parentCategoryId": "plus-size>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024887_XM?w=1024"
          },
          {
            "id": "plus-size>dresses>midi",
            "name": "Midi",
            "parentCategoryId": "plus-size>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024989_XM?w=1024"
          },
          {
            "id": "plus-size>dresses>evening",
            "name": "Evening",
            "parentCategoryId": "plus-size>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024989_XM?w=1024"
          },
          {
            "id": "plus-size>dresses>going-out",
            "name": "Going Out",
            "parentCategoryId": "plus-size>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024804_XM?w=1024"
          },
          {
            "id": "plus-size>dresses>occasion",
            "name": "Occasion",
            "parentCategoryId": "plus-size>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024989_XM?w=1024"
          },
          {
            "id": "plus-size>dresses>summer",
            "name": "Summer",
            "parentCategoryId": "plus-size>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024988_XM?w=1024"
          }
        ]
      },
      {
        "id": "plus-size>occasionwear",
        "name": "Curve Occasionwear",
        "parentCategoryId": "plus-size",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024989_XM?w=1024"
      },
      {
        "id": "plus-size>jumpsuits",
        "name": "Jumpsuits",
        "parentCategoryId": "plus-size",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024046_XM?w=1024"
      }
    ]
  },
  {
    "id": "jewellery",
    "name": "Jewellery",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100024986_XM?w=1024"
  },
  {
    "id": "footwear",
    "name": "Shoes",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100024997_XM?w=1024",
    "categories": [
      {
        "id": "footwear>platforms",
        "name": "Platforms",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024495_XM?w=1024"
      },
      {
        "id": "footwear>boots",
        "name": "Boots",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024472_XM?w=1024",
        "categories": [
          {
            "id": "footwear>boots>ankle-boots",
            "name": "Ankle Boots",
            "parentCategoryId": "footwear>boots",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024471_XM?w=1024"
          },
          {
            "id": "footwear>boots>platform",
            "name": "Platform Boots",
            "parentCategoryId": "footwear>boots",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100023843_XM?w=1024"
          }
        ]
      },
      {
        "id": "footwear>comfortable-shoes",
        "name": "Comfortable Shoes",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024923_XM?w=1024"
      },
      {
        "id": "footwear>trainers",
        "name": "Trainers",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024286_XM?w=1024"
      },
      {
        "id": "footwear>holiday",
        "name": "Holiday",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024959_XM?w=1024"
      },
      {
        "id": "footwear>wedding-shoes",
        "name": "Wedding Shoes",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024926_XM?w=1024"
      },
      {
        "id": "footwear>wide-fit",
        "name": "Wide Fit",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024645_XM?w=1024"
      },
      {
        "id": "footwear>going-out",
        "name": "Going Out",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024997_XM?w=1024"
      },
      {
        "id": "footwear>shoe-bag-sets",
        "name": "Shoe & Bag Sets",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024925_XM?w=1024"
      },
      {
        "id": "footwear>party-shoes",
        "name": "Party Shoes",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024997_XM?w=1024"
      },
      {
        "id": "footwear>5-off",
        "name": "£5 Off Shoes",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024075_XM?w=1024"
      },
      {
        "id": "footwear>wider-fit-shoes",
        "name": "Wider Fit Shoes",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024551_XM?w=1024"
      },
      {
        "id": "footwear>10-off",
        "name": "£10 Off Shoes",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024292_XM?w=1024"
      },
      {
        "id": "footwear>wedge",
        "name": "Wedges",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024959_XM?w=1024"
      },
      {
        "id": "footwear>web-exclusive",
        "name": "Online Exclusive",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024937_XM?w=1024"
      },
      {
        "id": "footwear>flat-shoes",
        "name": "Flats",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024950_XM?w=1024",
        "categories": [
          {
            "id": "footwear>flat-shoes>trainers-plimsolls",
            "name": "Trainers & Plimsolls",
            "parentCategoryId": "footwear>flat-shoes",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024286_XM?w=1024"
          },
          {
            "id": "footwear>flat-shoes>sandals",
            "name": "Sandals",
            "parentCategoryId": "footwear>flat-shoes",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024950_XM?w=1024"
          },
          {
            "id": "footwear>flat-shoes>flatforms",
            "name": "Flatforms",
            "parentCategoryId": "footwear>flat-shoes",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100023999_XM?w=1024"
          }
        ]
      },
      {
        "id": "footwear>courts",
        "name": "Heels",
        "parentCategoryId": "footwear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024997_XM?w=1024"
      }
    ]
  },
  {
    "id": "clearance",
    "name": "Sale",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100024997_XM?w=1024",
    "categories": [
      {
        "id": "clearance>petite",
        "name": "Petite",
        "parentCategoryId": "clearance",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024898_XM?w=1024"
      },
      {
        "id": "clearance>jewellery",
        "name": "Jewellery",
        "parentCategoryId": "clearance",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024203_XM?w=1024"
      },
      {
        "id": "clearance>winter-warmers",
        "name": "Winter Warmers",
        "parentCategoryId": "clearance",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024556_XM?w=1024"
      },
      {
        "id": "clearance>15-and-under",
        "name": "£15 and under",
        "parentCategoryId": "clearance",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024959_XM?w=1024"
      },
      {
        "id": "clearance>clothing",
        "name": "Clothing",
        "parentCategoryId": "clearance",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025037_XM?w=1024",
        "categories": [
          {
            "id": "clearance>clothing>shirts-blouses",
            "name": "Shirts & Blouses",
            "parentCategoryId": "clearance>clothing",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024085_XM?w=1024"
          },
          {
            "id": "clearance>clothing>jumpers-cardigans",
            "name": "Jumpers & Cardigans",
            "parentCategoryId": "clearance>clothing",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024440_XM?w=1024"
          },
          {
            "id": "clearance>clothing>jumpsuits-playsuits",
            "name": "Jumpsuits & Playsuits",
            "parentCategoryId": "clearance>clothing",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024446_XM?w=1024"
          },
          {
            "id": "clearance>clothing>tops",
            "name": "Tops",
            "parentCategoryId": "clearance>clothing",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025006_XM?w=1024",
            "categories": [
              {
                "id": "clearance>clothing>tops>bodysuits",
                "name": "Bodysuits",
                "parentCategoryId": "clearance>clothing>tops",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024993_XM?w=1024"
              },
              {
                "id": "clearance>clothing>tops>going-out",
                "name": "Going Out",
                "parentCategoryId": "clearance>clothing>tops",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024836_XM?w=1024"
              }
            ]
          },
          {
            "id": "clearance>clothing>jackets-coats",
            "name": "Jackets & Coats",
            "parentCategoryId": "clearance>clothing",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024856_XM?w=1024"
          },
          {
            "id": "clearance>clothing>skirts",
            "name": "Skirts",
            "parentCategoryId": "clearance>clothing",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024852_XM?w=1024"
          },
          {
            "id": "clearance>clothing>trousers",
            "name": "Trousers",
            "parentCategoryId": "clearance>clothing",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024762_XM?w=1024"
          },
          {
            "id": "clearance>clothing>jumpsuits",
            "name": "Jumpsuits",
            "parentCategoryId": "clearance>clothing",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024962_XM?w=1024"
          },
          {
            "id": "clearance>clothing>knitwear",
            "name": "Knitwear",
            "parentCategoryId": "clearance>clothing",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024952_XM?w=1024"
          },
          {
            "id": "clearance>clothing>playsuits",
            "name": "Playsuits",
            "parentCategoryId": "clearance>clothing",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025005_XM?w=1024"
          },
          {
            "id": "clearance>clothing>dresses",
            "name": "Dresses",
            "parentCategoryId": "clearance>clothing",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100025037_XM?w=1024",
            "categories": [
              {
                "id": "clearance>clothing>dresses>party",
                "name": "Party",
                "parentCategoryId": "clearance>clothing>dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100024990_XM?w=1024"
              },
              {
                "id": "clearance>clothing>dresses>sale-dresses-under-20",
                "name": "Sale Dresses Under £20",
                "parentCategoryId": "clearance>clothing>dresses",
                "imageUrl": "https://i8.amplience.net/i/Quiz/00100025037_XM?w=1024"
              }
            ]
          }
        ]
      },
      {
        "id": "clearance>autumn-sale-picks",
        "name": "Autumn Sale Picks",
        "parentCategoryId": "clearance",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024423_XM?w=1024"
      },
      {
        "id": "clearance>15-off",
        "name": "£15 Off",
        "parentCategoryId": "clearance",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024919_XM?w=1024"
      },
      {
        "id": "clearance>occasion-wear",
        "name": "Occasion Wear",
        "parentCategoryId": "clearance",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024926_XM?w=1024"
      },
      {
        "id": "clearance>partywear",
        "name": "Partywear",
        "parentCategoryId": "clearance",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024990_XM?w=1024"
      },
      {
        "id": "clearance>accessories",
        "name": "Accessories",
        "parentCategoryId": "clearance",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024889_XM?w=1024"
      },
      {
        "id": "clearance>plus-size",
        "name": "Curve",
        "parentCategoryId": "clearance",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024989_XM?w=1024"
      },
      {
        "id": "clearance>tenpoundsoff",
        "name": "£10 Off",
        "parentCategoryId": "clearance",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024993_XM?w=1024"
      },
      {
        "id": "clearance>footwear",
        "name": "Shoes",
        "parentCategoryId": "clearance",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024997_XM?w=1024",
        "categories": [
          {
            "id": "clearance>footwear>boots",
            "name": "Boots",
            "parentCategoryId": "clearance>footwear",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024472_XM?w=1024"
          }
        ]
      },
      {
        "id": "clearance>collections",
        "name": "Collections",
        "parentCategoryId": "clearance",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024852_XM?w=1024",
        "categories": [
          {
            "id": "clearance>collections>q-by-quiz",
            "name": "Q By Quiz",
            "parentCategoryId": "clearance>collections",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024852_XM?w=1024"
          }
        ]
      },
      {
        "id": "clearance>summer-sale-picks",
        "name": "Summer Sale Picks Under £25",
        "parentCategoryId": "clearance",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024959_XM?w=1024"
      }
    ]
  },
  {
    "id": "new-season-offers",
    "name": "New Season Offers",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100023826_XM?w=1024",
    "categories": [
      {
        "id": "new-season-offers>clothing",
        "name": "Clothing",
        "parentCategoryId": "new-season-offers",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100023826_XM?w=1024"
      },
      {
        "id": "new-season-offers>core",
        "name": "Core",
        "parentCategoryId": "new-season-offers",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100023826_XM?w=1024"
      }
    ]
  },
  {
    "id": "petite",
    "name": "Petite",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100024899_XM?w=1024",
    "categories": [
      {
        "id": "petite>blazers",
        "name": "Blazers",
        "parentCategoryId": "petite",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024771_XM?w=1024"
      },
      {
        "id": "petite>occasionwear",
        "name": "Occasionwear",
        "parentCategoryId": "petite",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024897_XM?w=1024"
      },
      {
        "id": "petite>jumpsuits",
        "name": "Jumpsuits",
        "parentCategoryId": "petite",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024899_XM?w=1024"
      },
      {
        "id": "petite>jackets-coats",
        "name": "Jackets & Coats",
        "parentCategoryId": "petite",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024771_XM?w=1024"
      },
      {
        "id": "petite>jeans",
        "name": "Jeans",
        "parentCategoryId": "petite",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024505_XM?w=1024"
      },
      {
        "id": "petite>tops",
        "name": "Tops",
        "parentCategoryId": "petite",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024861_XM?w=1024"
      },
      {
        "id": "petite>dresses",
        "name": "Dresses",
        "parentCategoryId": "petite",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024898_XM?w=1024",
        "categories": [
          {
            "id": "petite>dresses>party-dresses",
            "name": "Party Dresses",
            "parentCategoryId": "petite>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024616_XM?w=1024"
          },
          {
            "id": "petite>dresses>skater-dresses",
            "name": "Skater Dresses",
            "parentCategoryId": "petite>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024613_XM?w=1024"
          },
          {
            "id": "petite>dresses>summer-dresses",
            "name": "Summer Dresses",
            "parentCategoryId": "petite>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024898_XM?w=1024"
          },
          {
            "id": "petite>dresses>maxi-dresses",
            "name": "Maxi Dresses",
            "parentCategoryId": "petite>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024768_XM?w=1024"
          },
          {
            "id": "petite>dresses>dip-hem-dresses",
            "name": "Dip Hem Dresses",
            "parentCategoryId": "petite>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024778_XM?w=1024"
          },
          {
            "id": "petite>dresses>midi-dresses",
            "name": "Midi Dresses",
            "parentCategoryId": "petite>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024897_XM?w=1024"
          }
        ]
      },
      {
        "id": "petite>trousers",
        "name": "Trousers",
        "parentCategoryId": "petite",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024781_XM?w=1024"
      }
    ]
  },
  {
    "id": "menswear",
    "name": "Menswear Clothing",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100022912_XM?w=1024",
    "categories": [
      {
        "id": "menswear>jumpers-cardigans",
        "name": "Jumpers & Cardigans",
        "parentCategoryId": "menswear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100022896_XM?w=1024"
      },
      {
        "id": "menswear>gifts",
        "name": "Gifts",
        "parentCategoryId": "menswear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100022332_XM?w=1024"
      },
      {
        "id": "menswear>jackets-coats",
        "name": "Jackets & Coats",
        "parentCategoryId": "menswear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100022909_XM?w=1024"
      },
      {
        "id": "menswear>blazers",
        "name": "Blazers",
        "parentCategoryId": "menswear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100022912_XM?w=1024"
      },
      {
        "id": "menswear>shirts",
        "name": "Shirts",
        "parentCategoryId": "menswear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100022882_XM?w=1024"
      },
      {
        "id": "menswear>winter-warmers",
        "name": "Winter Warmers",
        "parentCategoryId": "menswear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100022896_XM?w=1024"
      },
      {
        "id": "menswear>new-in",
        "name": "New In",
        "parentCategoryId": "menswear",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100022909_XM?w=1024"
      }
    ]
  },
  {
    "id": "shop-by-occasion",
    "name": "Shop By Occasion",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100024997_XM?w=1024",
    "categories": [
      {
        "id": "shop-by-occasion>mother-of-the-bride",
        "name": "Mother of the Bride",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024808_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>airport-ready",
        "name": "Airport Ready",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024776_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>prom-and-ball",
        "name": "Prom And Ball",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024986_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>bride-to-be",
        "name": "Bride to Be",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024980_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>holiday",
        "name": "Holiday",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>date-night",
        "name": "Date Night",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024997_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>spring-essentials",
        "name": "Spring Essentials",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024997_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>races",
        "name": "Races",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024964_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>festival",
        "name": "Festival",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025006_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>bridesmaid",
        "name": "Bridesmaid",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024986_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>autumn-ready",
        "name": "Autumn Ready",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024993_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>occasionwear",
        "name": "Occasionwear",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024986_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>day-glam",
        "name": "Day Glam",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025007_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>going-out-out",
        "name": "Going Out-Out",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024997_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>wedding-guest",
        "name": "Wedding Guest",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>christening-guest",
        "name": "Christening Guest",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>student-style",
        "name": "Student Style",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024896_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>valentines",
        "name": "Valentine's",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024997_XM?w=1024"
      },
      {
        "id": "shop-by-occasion>mothers-day",
        "name": "Mother's Day",
        "parentCategoryId": "shop-by-occasion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024997_XM?w=1024"
      }
    ]
  },
  {
    "id": "collections",
    "name": "Collections",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100024997_XM?w=1024",
    "categories": [
      {
        "id": "collections>q-by-quiz",
        "name": "Q By Quiz",
        "parentCategoryId": "collections",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024997_XM?w=1024",
        "categories": [
          {
            "id": "collections>q-by-quiz>joanna-chimonides",
            "name": "Joanna Chimonides",
            "parentCategoryId": "collections>q-by-quiz",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024889_XM?w=1024"
          }
        ]
      }
    ]
  },
  {
    "id": "promotion",
    "name": "Promotion",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100024967_XM?w=1024",
    "categories": [
      {
        "id": "promotion>20-off-promotion",
        "name": "20% off Promotion",
        "parentCategoryId": "promotion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
      },
      {
        "id": "promotion>30-off",
        "name": "30% off",
        "parentCategoryId": "promotion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100022912_XM?w=1024"
      },
      {
        "id": "promotion>30-off-promotion",
        "name": "30% off Promotion",
        "parentCategoryId": "promotion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024967_XM?w=1024"
      },
      {
        "id": "promotion>dresses",
        "name": "Dresses",
        "parentCategoryId": "promotion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024784_XM?w=1024",
        "categories": [
          {
            "id": "promotion>dresses>40-off-promotion",
            "name": "40% off Promotion",
            "parentCategoryId": "promotion>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024459_XM?w=1024"
          },
          {
            "id": "promotion>dresses>10-off-promotion",
            "name": "10% off Promotion",
            "parentCategoryId": "promotion>dresses",
            "imageUrl": "https://i8.amplience.net/i/Quiz/00100024784_XM?w=1024"
          }
        ]
      },
      {
        "id": "promotion>40-off-promotion",
        "name": "40% off Promotion",
        "parentCategoryId": "promotion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024062_XM?w=1024"
      },
      {
        "id": "promotion>accessories-20-off-promotion",
        "name": "FAJ 20% off Promotion",
        "parentCategoryId": "promotion",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024986_XM?w=1024"
      }
    ]
  },
  {
    "id": "the-christmas-shop",
    "name": "The Christmas Shop",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100024917_XM?w=1024",
    "categories": [
      {
        "id": "the-christmas-shop>the-perfect-gift",
        "name": "The Perfect Gift",
        "parentCategoryId": "the-christmas-shop",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024468_XM?w=1024"
      }
    ]
  },
  {
    "id": "shop-by-trends",
    "name": "Shop By Trend",
    "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024",
    "categories": [
      {
        "id": "shop-by-trends>polka-dots",
        "name": "Polka Dots",
        "parentCategoryId": "shop-by-trends",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024993_XM?w=1024"
      },
      {
        "id": "shop-by-trends>faux-leather",
        "name": "Faux Leather",
        "parentCategoryId": "shop-by-trends",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024842_XM?w=1024"
      },
      {
        "id": "shop-by-trends>pastels",
        "name": "Pastels",
        "parentCategoryId": "shop-by-trends",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024995_XM?w=1024"
      },
      {
        "id": "shop-by-trends>blue-hues",
        "name": "Blue Hues",
        "parentCategoryId": "shop-by-trends",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025007_XM?w=1024"
      },
      {
        "id": "shop-by-trends>glitz-glam",
        "name": "Glitz & Glam",
        "parentCategoryId": "shop-by-trends",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024938_XM?w=1024"
      },
      {
        "id": "shop-by-trends>new-luxe",
        "name": "New Luxe",
        "parentCategoryId": "shop-by-trends",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024907_XM?w=1024"
      },
      {
        "id": "shop-by-trends>layer-up",
        "name": "Layer Up",
        "parentCategoryId": "shop-by-trends",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024896_XM?w=1024"
      },
      {
        "id": "shop-by-trends>animal-print",
        "name": "Animal Print",
        "parentCategoryId": "shop-by-trends",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024972_XM?w=1024"
      },
      {
        "id": "shop-by-trends>florals",
        "name": "Florals",
        "parentCategoryId": "shop-by-trends",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
      },
      {
        "id": "shop-by-trends>summer-brights",
        "name": "Summer Brights",
        "parentCategoryId": "shop-by-trends",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025007_XM?w=1024"
      },
      {
        "id": "shop-by-trends>puff-sleeves",
        "name": "Puff Sleeves",
        "parentCategoryId": "shop-by-trends",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025007_XM?w=1024"
      },
      {
        "id": "shop-by-trends>casual-wear",
        "name": "Casual Wear",
        "parentCategoryId": "shop-by-trends",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025038_XM?w=1024"
      },
      {
        "id": "shop-by-trends>tailoring",
        "name": "Tailoring",
        "parentCategoryId": "shop-by-trends",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100024762_XM?w=1024"
      },
      {
        "id": "shop-by-trends>jeans-a-nice-top",
        "name": "Jeans & a Nice Top",
        "parentCategoryId": "shop-by-trends",
        "imageUrl": "https://i8.amplience.net/i/Quiz/00100025006_XM?w=1024"
      }
    ]
  },
  {
    "id": "TestKrishna",
    "name": "Krishna"
  }
]

function App() {
  const [sdk, setSdk] = useState<AmplienceSdk>();
  const [searchWord, setSearchWord] = useState("") ;
  const [results, setResults] = useState([]);

  useEffect(() => {
    init<AmplienceSdk>().then(setSdk);
  }, []);

  useEffect(() => {
    if (!hasLoadedSdk(sdk))
      return;

    sdk.field.getValue();
  }, [sdk]);

  const hasLoadedSdk = (sdk: AmplienceSdk | undefined): sdk is AmplienceSdk => {
    return !!sdk;
  }

  const searchWordChangeHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setSearchWord(searchWord);
  }

  const fetchSuggestions = () => {
    console.log('click');

    // fetch(api('dr'), { method: 'GET', headers })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //   });
  }

  if (!hasLoadedSdk(sdk))
    return <div className="App">Loading ...</div>

  return (
    <AppWrap  className="App">
      <Title>Product</Title>
      <Text>Enter a product name below, then click Search to find the right product</Text>
      <SearchBoxWrap>
        <SearchBox placeholder="Product name eg. Dress" type="text" className="input" onChange={searchWordChangeHandler} value={searchWord} />
      </SearchBoxWrap>
      <SearchButton onClick={fetchSuggestions} disabled={searchWord.length < 2}>Search</SearchButton>
    </AppWrap>
  );
}

export default App;
