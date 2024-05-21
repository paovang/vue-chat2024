import { singleton } from 'tsyringe';
import { IGUseCase } from './../interface/use-case.interface';

@singleton()
export class GetAllUserUseCase implements IGUseCase {
    async execute(input: any): Promise<any> {
        console.log('getAll: ', input);
    }
}