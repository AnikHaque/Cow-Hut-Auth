import {Breed, Category, Label, Location} from "./cow.interface";

export const location: Location[] = ["Dhaka", "Chattogram", "Barishal", "Rajshahi", "Sylhet", "Comilla", "Rangpur", "Mymensingh"];
//
export const breed: Breed[] = ["Brahman", "Nellore", "Sahiwal", "Gir", "Indigenous", "Tharparkar", "Kankrej"];
//
export const label: Label[] = ["for sale", "sold out"];
export const category: Category[] = ["Dairy", "Beef", "Dual Purpose"];

//
export const cowSearchableFields = ["location", "breed", "category"];
export const cowFilterableFields = ["searchTerm", "minPrice", "maxPrice", "location", "price"];
