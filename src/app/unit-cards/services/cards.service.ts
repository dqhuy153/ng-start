import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Card } from "../interfaces";

@Injectable()
export class CardsService {
  constructor(private http: HttpClient) {}

  getCards() {
    return this.http.get<Card[]>("https://61b194e53c954f001722aa1c.mockapi.io/api/cards");
  }
}
