import type { ObjectId } from "../mongodb";


export type Hobby = {
_id?: ObjectId;
ownerId: number;
message: string;
}