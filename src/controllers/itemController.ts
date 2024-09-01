import { Item } from "../models/item";

let items: Item[] = [];
let counter = 1;

export const getAllItems = (): Item[] => {
    return items;
};

export const getItemById = (id: number): Item | undefined => {
    return items.find((item) => item.id === id);
};

export const createItem = (name: string, description: string): Item => {
    const newItem: Item = {
        id: counter++,
        name,
        description,
    };
    items.push(newItem);
    return newItem;
};

export const updateItem = (
    id: number,
    name: string,
    description: string
): Item | undefined => {
    const item = getItemById(id);
    if (item) {
        item.name = name;
        item.description = description;
    }
    return item;
};

export const deleteItem = (id: number): boolean => {
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        return true;
    }
    return false;
};
