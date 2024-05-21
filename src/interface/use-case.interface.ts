export interface IGUseCase {
    execute(input: any): Promise<any>
}