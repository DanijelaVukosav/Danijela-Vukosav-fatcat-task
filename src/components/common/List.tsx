import { useMemo } from 'react';

interface ListItemProps<T> {
    item: T;
    properties: Array<keyof T>;
    itemIndex: number;
}

interface ListProps<T> {
    items: T[] | null | undefined;
    properties: Array<keyof T>;
}

export const ListItem = <T,>({
    item,
    properties,
    itemIndex,
}: ListItemProps<T>) => {
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
        <li className={'pl-20 pb-10'}>
            {displayProperties.map((itemProperty: keyof T) => (
                <p
                    key={`${itemIndex.toString()}_${itemProperty.toString()}`}
                >{`${itemProperty?.toString()?.toUpperCase()}:  ${
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
                    key={index.toString()}
                    itemIndex={index}
                    item={item}
                    properties={properties}
                />
            ))}
        </ul>
    );
};
