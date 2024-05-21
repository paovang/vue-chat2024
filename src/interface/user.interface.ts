export interface UserInterface {
    getOne(id: number): Promise<void>;

    getAll(id: number): Promise<void>;
}