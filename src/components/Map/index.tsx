import {memo, useCallback, useState, useEffect, useRef} from 'react';
import {GoogleMap, Marker, Polygon, useJsApiLoader} from '@react-google-maps/api';
import {twMerge} from "tailwind-merge";

import FeedbackForm from "@components/FeedbackForm";

import {
    containerStyle,
    mapBounds,
    style
} from './config';
import {extractPolygons} from "./utils";
import geoData from './allGeo';


function AutocompleteInput({onAddressSelect, onChange}: {
    onAddressSelect: (e: any) => void;
    onChange: (address: string) => void;
}) {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const autocompleteRef = useRef(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        if (!window.google) return;

        const autocompleteService = new window.google.maps.places.AutocompleteService();

        if (input && autocompleteService) {
            autocompleteService.getPlacePredictions({input}, (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                    setSuggestions(predictions);
                } else {
                    setSuggestions([]);
                }
            });
        } else {
            setSuggestions([]);
        }
    }, [input]);

    return (
        <div className="relative max-w-3xl">
            <input
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                ref={autocompleteRef}
                onFocus={() => {
                    setIsFocus(true)
                }}
                onBlur={() => {
                    setTimeout(() => {
                        setIsFocus(false)
                    }, 200)
                }}
            />
            {isFocus && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white mt-1 max-h-60 overflow-auto border border-gray-300 rounded-md">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onMouseDown={() => {
                                console.log({suggestion})
                                setInput(suggestion.description);
                                onChange(suggestion.description);
                                setSuggestions([]);
                                onAddressSelect(suggestion.place_id);
                            }}
                        >
                            {suggestion.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function Map() {
    const [address, setAddress] = useState('');
    const [map, setMap] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [isIntersected, setIsIntersected] = useState<boolean>(false);
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.PUBLIC_GOOGLE_API_KEY,
        libraries: ["places"],
        region: 'RU',
        language: 'ru'
    });
    const [center, setCenter] = useState({
        lat: 60.94139999315199,
        lng: 76.56837353708667
    });

    // ll=60.94139999315199%2C76.56837353708667

    const handleLoad = useCallback((map) => {
        setMap(map);
    }, []);


    const polygonCoords = extractPolygons(geoData);

    const handleAddressSelect = (placeId) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({placeId: placeId}, (results, status) => {
            if (status === 'OK') {
                const location = results[0].geometry.location;
                setMarkerPosition({lat: location.lat(), lng: location.lng()});

                const point = new google.maps.LatLng(location.lat(), location.lng());
                const polygon = new google.maps.Polygon({paths: polygonCoords});

                if (google.maps.geometry.poly.containsLocation(point, polygon)) {
                    setIsIntersected(true);
                } else {
                    setIsIntersected(false);
                }

                map.zoom = 15;
                setCenter({lat: location.lat(), lng: location.lng()});
            } else {
                setIsIntersected(false)
            }
        });
    };


    if (!isLoaded) return null;

    return (
        <>
            <div className='flex flex-col gap-8'>
                <div className="flex flex-col md:flex-row">
                    <div className="flex flex-col gap-4 flex-1">
                        <h2 className="text-5xl md:text-7xl">Где мы ищем помещения?</h2>
                        <p>По каждому городу у нас составлена карта развития, в первую очередь нас интересуют помещения
                            из
                            выделенных на карте зон. Проверьте, входит ли помещение в зону нашего поиска</p>
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                        <p className="text-3xl md:max-w-sm">Проверьте адрес вашего помещения</p>

                        <div>
                            <p className="text-neutral-300">Введите адрес</p>
                            <AutocompleteInput
                                onAddressSelect={handleAddressSelect}
                                onChange={(address) => {
                                    setAddress(address);
                                }}
                            />
                        </div>

                        <button
                            type="button"
                            className={
                            twMerge(
                                "text-white text-center bg-orange leading-snug whitespace-nowrap transition-colors",
                                "rounded-lg py-2 px-3 text-sm",
                                "md:rounded-xl md:py-3 md:px-4 md:w-fit",
                                "hover:bg-orange-600",
                            )
                        }
                            onClick={(e) => {
                                address && setIsModalOpen(true);
                            }}
                        >
                            Отправить помещение
                        </button>

                    </div>
                </div>


                <div className="h-[35rem]">
                    <GoogleMap
                        mapContainerClassName="h-full w-full rounded-3xl overflow-hidden"
                        center={center}
                        onLoad={handleLoad}
                        mapContainerStyle={containerStyle}
                        zoom={14}
                        options={{
                            disableDefaultUI: true,
                            restriction: {
                                latLngBounds: mapBounds,
                                strictBounds: false,
                            },
                        }}
                        onClick={(e) => {
                            console.log(`Clicked at lat: ${e.latLng.lat()}, lng: ${e.latLng.lng()}`);
                        }}
                    >
                        {markerPosition && <Marker position={markerPosition}/>}

                        {
                            polygonCoords.map((polygon, index) => (
                                <Polygon
                                    key={index}
                                    paths={polygon}
                                    options={{
                                        fillColor: "#ff8800",
                                        fillOpacity: 0.35,
                                        strokeColor: "#ff5900",
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                    }}
                                />
                            ))
                        }
                    </GoogleMap>
                </div>
            </div>

            <FeedbackForm
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
                address={address}
                isValid={isIntersected}
            />
            {/*{*/}
            {/*    isIntersected !== null && (*/}
            {/*        <p*/}
            {/*            className={`pt-10 container text-2xl ${isIntersected ? 'text-green-500' : 'text-red-500'}`}*/}
            {/*        >*/}
            {/*            {*/}
            {/*                isIntersected*/}
            {/*                    ? 'Точка находится внутри выбранной области!'*/}
            {/*                    : 'Точка находится вне выбранной области.'*/}
            {/*            }*/}
            {/*        </p>*/}
            {/*    )*/}
            {/*}*/}
        </>

    );
}


export default memo(Map);
