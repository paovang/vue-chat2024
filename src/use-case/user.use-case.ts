import { UserInterface } from './../interface/user.interface';
import { axiosConfig } from '../axios/axios.config';

class UserUseCase implements UserInterface {
    async getOne(id: number): Promise<void> {
        console.log(id);
    }

    async getAll(): Promise<void> {
        try {
            const response = await axiosConfig.get('client/home-product/257');
            console.log('Data:', response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

export default new UserUseCase;