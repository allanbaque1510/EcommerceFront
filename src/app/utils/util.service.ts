import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
    formatPrice(price: number): string {
        if (isNaN(price) || price === null) return "$0.00"; // Manejo de valores no válidos
        return new Intl.NumberFormat("en-US", { 
            style: "currency", 
            currency: "USD" 
        }).format(price);
    }
}
