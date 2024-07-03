import { useMemo } from 'react';

interface ListItemProps<T> {
    item: T;
    properties: Array<keyof T>;
    key: string;
}

interface ListProps<T> {
    items: T[] | null | undefined;
    properties: Array<keyof T>;
}

export const ListItem = <T,>({ item, properties, key }: ListItemProps<T>) => {
    const displayProperties: Array<keyof T> = useMemo(() => {
        if (!item) {
            return [];
        }
        if (!properties?.length && typeof item === 'object') {
            return Object.keys(item) as Array<keyof T>;
        }

        return properties;
    }, [properties, item]);
    return (
        <li key={key} className={'pl-20 pb-10'}>
            {displayProperties.map((itemProperty: keyof T) => (
                <p key={`${key}_${itemProperty.toString()}`}>{`${itemProperty
                    ?.toString()
                    ?.toUpperCase()}:  ${
                    item[itemProperty]?.toString() ?? '-'
                }`}</p>
            ))}
        </li>
    );
};

export const List = <T,>({ items, properties }: ListProps<T>) => {
    return (
        <ul className={'list-disc ml-14'}>
            {(items ?? []).map((item: T, index: number) => (
                <ListItem
                    item={item}
                    properties={properties}
                    key={index.toString()}
                />
            ))}
        </ul>
    );
};
