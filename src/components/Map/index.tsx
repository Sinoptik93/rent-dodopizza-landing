import {memo, useCallback, useState, useEffect, useRef} from 'react';
import {GoogleMap, Marker, Polygon, useJsApiLoader} from '@react-google-maps/api';
import SearchIcon from '@assets/icons/search-icon.svg?react';


import {
    containerStyle,
    mapBounds,
    style
} from './config';


function AutocompleteInput({onAddressSelect}: { onAddressSelect: (e: any) => void; }) {
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
            <div className="absolute top-1/2 left-4 -translate-y-1/2 w-6 h-6 text-neutral-500">
                <SearchIcon/>
            </div>

            <input
                className="w-full p-2 pl-14 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                placeholder="Введите адрес"
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
    const [map, setMap] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [isIntersected, setIsIntersected] = useState<null | boolean>(null);
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.PUBLIC_GOOGLE_API_KEY,
        libraries: ["places"],
        region: 'RU',
        language: 'ru'
    });
    const [center, setCenter] = useState({
        lat: 57.1530,
        lng: 65.5343
    });

    const handleLoad = useCallback((map) => {
        setMap(map);
    }, []);


    const polygonCoords = [
        {lat: 57.16049693745573, lng: 65.52352894588996},
        {lat: 57.16147436784866, lng: 65.52541722103645},
        {lat: 57.152816228238386, lng: 65.543527496305},
        {lat: 57.15127989498743, lng: 65.54181088253547},
    ];

    const polygonCoords2 = [
        {lat: 57.17237256905006, lng: 65.55779193883788},
        {lat: 57.170115796544145, lng: 65.55950855260741},
        {lat: 57.17060438784419, lng: 65.5661175156201},
        {lat: 57.173349685536216, lng: 65.5683491135205},
        {lat: 57.17421045723076, lng: 65.56337093358886},
    ];

    const handleAddressSelect = (placeId) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({placeId: placeId}, (results, status) => {
            if (status === 'OK') {
                const location = results[0].geometry.location;
                setMarkerPosition({lat: location.lat(), lng: location.lng()});

                const point = new google.maps.LatLng(location.lat(), location.lng());
                const polygon = new google.maps.Polygon({paths: [polygonCoords, polygonCoords2]});

                if (google.maps.geometry.poly.containsLocation(point, polygon)) {
                    setIsIntersected(true);
                } else {
                    setIsIntersected(false);
                }

                map.zoom = 15;
                setCenter({lat: location.lat(), lng: location.lng()});
            } else {
                setIsIntersected(null)
            }
        });
    };


    if (!isLoaded) return null;

    return (
        <>
            <div className='container h-[50rem] flex flex-col gap-8'>

                <p className="text-5xl">Узнайте, вдходит ли ваше помещение в интересующую область вашего города</p>

                <AutocompleteInput
                    onAddressSelect={handleAddressSelect}
                />
                <GoogleMap
                    mapContainerClassName="h-full w-full rounded-3xl overflow-hidden"
                    center={center}
                    onLoad={handleLoad}
                    mapContainerStyle={containerStyle}
                    zoom={12}
                    options={{
                        styles: style,
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
                    <Polygon
                        paths={polygonCoords}
                        options={{
                            fillColor: "#ff8800",
                            fillOpacity: 0.35,
                            strokeColor: "#ff5900",
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                        }}
                    />

                    <Polygon
                        paths={polygonCoords2}
                        options={{
                            fillColor: "#ff8800",
                            fillOpacity: 0.35,
                            strokeColor: "#ff5900",
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                        }}
                    />
                </GoogleMap>

            </div>
            {
                isIntersected !== null && (
                    <p
                        className={`pt-10 container text-2xl ${isIntersected ? 'text-green-500' : 'text-red-500'}`}
                    >
                        {
                            isIntersected
                                ? 'Точка находится внутри выбранной области!'
                                : 'Точка находится вне выбранной области.'
                        }
                    </p>
                )
            }
        </>

    );
}


export default memo(Map);
