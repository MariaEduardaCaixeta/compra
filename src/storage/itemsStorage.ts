import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

const ITEMS_STORAGE_KEY = '@comprar:items';

export type ItemStorage = {
    id: string;
    description: string;
    status: FilterStatus;
}

async function get(): Promise<ItemStorage[]> {
    try {
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
        return storage ? JSON.parse(storage) : [];
    } catch (error) {
        throw new Error('ITEMS_GET: ' + error);
    }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
    const allItems = await get();
    return allItems.filter(item => item.status === status);
}

async function save(items: ItemStorage[]): Promise<void> {
    try {
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        throw new Error('ITEMS_SAVE: ' + error);
    }
}

async function add(item: ItemStorage): Promise<ItemStorage[]> {
    const items = await get();
    const updatedItems = [...items, item];
    await save(updatedItems);
    return updatedItems;
}

export const itemsStorage = {
    getByStatus,
    add,
};