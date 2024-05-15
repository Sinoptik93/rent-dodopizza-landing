type Coordinate = [number, number, number];

interface Geometry {
    type: string;
    coordinates: Coordinate[][];
}

interface Feature {
    type: string;
    geometry: Geometry;
    properties: Record<string, any>;
}

interface FeatureCollection {
    type: string;
    features: Feature[];
}

interface Polygon {
    lat: number;
    lng: number;
}

const extractPolygons = (geoJsons: FeatureCollection[]): Polygon[][] => {
    const polygons: Polygon[][] = [];

    geoJsons.forEach(geoJson => {
        geoJson.features.forEach(feature => {
            if (feature.geometry.type === 'Polygon') {
                // @ts-ignore
                const coordinates: Polygon[] = feature.geometry.coordinates[0].map(coord => ({
                    lat: coord[1],
                    lng: coord[0]
                }));
                polygons.push(coordinates);
            }
        });
    });

    return polygons;
};

export {extractPolygons};
