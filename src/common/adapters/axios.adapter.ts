import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios'
import { HttpAdapter } from './../interfaces/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private axios: AxiosInstance = axios;

    /*async post<T>(url: string, data): Promise<T> {
        try {
            const file= await this.axios.post<T>( url, data, {
                headers: {
                  'Content-Typ
                }
            })
            return data;

        } catch (error) {
            
            throw new Error('This is an error - Check logs');
        }
    }*/
   

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>( url );
            return data;

        } catch (error) {
            
            throw new Error('This is an error - Check logs');
        }

    }

}
