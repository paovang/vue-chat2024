import { GetAllUserUseCase } from './../../use-case/get-all.use-case';
import { inject, singleton } from 'tsyringe'
import { CreateUserUseCase } from './../../use-case/create.use-case';

@singleton()
export class UserService {
    private _create: CreateUserUseCase;
    private _getAll: GetAllUserUseCase;

    constructor(
        @inject(CreateUserUseCase) create: CreateUserUseCase,
        @inject(GetAllUserUseCase) getAll: GetAllUserUseCase,
    ) {
        this._create = create;
        this._getAll = getAll;
    }

    async create(input: any) {
        return await this._create.execute(input);
    }

    async getAll(input: any) {
        return await this._getAll.execute(input);
    }
}