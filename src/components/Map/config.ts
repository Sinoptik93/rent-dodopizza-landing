import type { CSSProperties } from 'react';

import type { CityLocaleCoordinate } from '@components/Map/types';


export const style: google.maps.MapTypeStyle[] = [
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f6f5f5'
            },
            {
                lightness: 17
            }
        ]
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                color: '#dadada'
            },
            {
                lightness: 20
            }
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff'
            },
            {
                lightness: 17
            }
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#ffffff'
            },
            {
                lightness: 29
            },
            {
                weight: 0.2
            }
        ]
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff'
            },
            {
                lightness: 18
            }
        ]
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff'
            },
            {
                lightness: 16
            }
        ]
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#dedede'
            },
            {
                lightness: 21
            }
        ]
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on'
            },
            {
                color: '#ffffff'
            },
            {
                lightness: 16
            }
        ]
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                saturation: 36
            },
            {
                color: '#333333'
            },
            {
                lightness: 40
            }
        ]
    },
    {
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f2f2f2'
            },
            {
                lightness: 19
            }
        ]
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#fefefe'
            },
            {
                lightness: 20
            }
        ]
    },
    {
        featureType: 'administrative.country',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'administrative.province',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    // {
    //     featureType: 'administrative.locality',
    //     elementType: 'labels',
    //     stylers: [
    //         {
    //             visibility: 'off'
    //         }
    //     ]
    // },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#d1d1d1'
            },
            {
                lightness: 17
            },
            {
                weight: 1
            }
        ]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    }
];
export const cities: CityLocaleCoordinate[] = [
    {
        name: 'Москва',
        position: {
            lat: 55.751244,
            lng: 37.618423
        }
    },
    {
        name: 'Санкт-Петербург',
        position: {
            lat: 59.934280,
            lng: 30.335099
        }
    },
    {
        name: 'Лондон',
        position: {
            lat: 51.5074,
            lng: -0.1278
        }
    },
    {
        name: 'Париж',
        position: {
            lat: 48.8566,
            lng: 2.3522
        }
    },
    {
        name: 'Берлин',
        position: {
            lat: 52.5200,
            lng: 13.4050
        }
    },
    {
        name: 'Рим',
        position: {
            lat: 41.9028,
            lng: 12.4964
        }
    },
    {
        name: 'Мадрид',
        position: {
            lat: 40.4168,
            lng: -3.7038
        }
    },
    {
        name: 'Афины',
        position: {
            lat: 37.9838,
            lng: 23.7275
        }
    },
    {
        name: 'Амстердам',
        position: {
            lat: 52.3702,
            lng: 4.8952
        }
    },
    {
        name: 'Варшава',
        position: {
            lat: 52.2297,
            lng: 21.0122
        }
    },
    {
        name: 'Вена',
        position: {
            lat: 48.2082,
            lng: 16.3738
        }
    },
    {
        name: 'Прага',
        position: {
            lat: 50.0755,
            lng: 14.4378
        }
    },
    {
        name: 'Стокгольм',
        position: {
            lat: 59.3293,
            lng: 18.0686
        }
    },
    {
        name: 'Киев',
        position: {
            lat: 50.4501,
            lng: 30.5234
        }
    },
    {
        name: 'Минск',
        position: {
            lat: 53.9045,
            lng: 27.5615
        }
    },
    {
        name: 'Хельсинки',
        position: {
            lat: 60.1699,
            lng: 24.9384
        }
    },
    {
        name: 'Осло',
        position: {
            lat: 59.9139,
            lng: 10.7522
        }
    },
    {
        name: 'Копенгаген',
        position: {
            lat: 55.6761,
            lng: 12.5683
        }
    },
    {
        name: 'Загреб',
        position: {
            lat: 45.8150,
            lng: 15.9819
        }
    },
    {
        name: 'София',
        position: {
            lat: 42.6977,
            lng: 23.3219
        }
    },
];

export const containerStyle: CSSProperties = {
    width: '100%',
    height: '100%',
};

export const center: {desktop: google.maps.LatLngLiteral; mobile: google.maps.LatLngLiteral} = {
    desktop: {
        lat: 46.408665342781234,
        lng: 81.4691801631264,
    },
    mobile: {
        lat: 47.80439209494624,
        lng: 57.67672507748628
    }
};

export const mapBounds: google.maps.LatLngBoundsLiteral = {
    north: 80.36,
    south: -30.94,
    east: -130.71,
    west: -70.51,
};
