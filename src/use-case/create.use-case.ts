import { singleton } from 'tsyringe';
import { IGUseCase } from './../interface/use-case.interface';

@singleton()
export class CreateUserUseCase implements IGUseCase {
    async execute(input: any): Promise<any> {
        console.log('data1: ', input);
    }
}