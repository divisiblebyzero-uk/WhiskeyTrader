import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { environment as env } from '../environments/environment';
import { WhiskeyPositionCalculatorService } from './whiskey-position-calculator.service';
import { Whiskey, WhiskeyTrade, Direction, WhiskeyPrice, WhiskeyPosition } from './entities';
import { WhiskeyTradesService } from './Data/whiskey-trades.service';
import { WhiskeyPricesService } from './Data/whiskey-prices.service';

describe('Whiskey Position Calculator', () => {
  let service: WhiskeyPositionCalculatorService;
  let httpMock: HttpTestingController;

  const whiskeyPrices: WhiskeyPrice[] = [
    { id: 'w1-p0', whiskeyId: 'w1', date: new Date(2020, 2, 1), price: 200, active: true },
    { id: 'w1-p1', whiskeyId: 'w1', date: new Date(2020, 3, 1), price: 100, active: true },
    { id: 'w1-p2', whiskeyId: 'w1', date: new Date(2020, 1, 1), price: 300, active: true },
    { id: 'w1-p3', whiskeyId: 'w1', date: new Date(2020, 0, 1), price: 400, active: true },
  ]

  const oneTrade: WhiskeyTrade[] = [
    {
      id: 'w1-t1',
      whiskeyId: 'w1',
      numberOfBottles: 10,
      pricePerBottle: 100,
      date: new Date(),
      direction: Direction.Buy,
      active: true
    }
  ]

  const twoTrades: WhiskeyTrade[] = [
    oneTrade[0],
    {
      id: 'w1-t2',
      whiskeyId: 'w1',
      numberOfBottles: 5,
      pricePerBottle: 200,
      date: new Date(),
      direction: Direction.Sell,
      active: true
    }
  ]


  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [WhiskeyTradesService, WhiskeyPricesService]
    });

    service = TestBed.inject(WhiskeyPositionCalculatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate position from one trade', () => {
    service.getPositions().then(positions => {
      const expectedPosition: WhiskeyPosition = {
        whiskeyId: oneTrade[0].whiskeyId,
        numberOfBottles: oneTrade[0].numberOfBottles,
        totalPurchases: oneTrade[0].numberOfBottles * oneTrade[0].pricePerBottle,
        totalSales: 0,
        averagePricePerBottle: oneTrade[0].pricePerBottle,
        profit: 0,
        currentMarketPricePerBottle: oneTrade[0].pricePerBottle,
        profitPerBottle: 0,
        returnOnInvestment: 0,
        openPosition: true
      }
      expect(positions).toEqual([expectedPosition]);
    });

    prepareRequest(httpMock, "GET", env.api.serverUrl + "/api/data/whiskeyprices", whiskeyPrices);
    prepareRequest(httpMock, "GET", env.api.serverUrl + "/api/data/whiskeytrades", oneTrade);

    httpMock.verify();
  });

  it('should calculate position from two trades', () => {
    service.getPositions().then(positions => {
      const expectedOpenPosition: WhiskeyPosition = {
        whiskeyId: twoTrades[0].whiskeyId,
        numberOfBottles: twoTrades[0].numberOfBottles - twoTrades[1].numberOfBottles,
        totalPurchases: (twoTrades[0].numberOfBottles - twoTrades[1].numberOfBottles) * twoTrades[0].pricePerBottle,
        totalSales: 0,
        averagePricePerBottle: twoTrades[0].pricePerBottle,
        profit: 0,
        currentMarketPricePerBottle: twoTrades[0].pricePerBottle,
        profitPerBottle: 0,
        returnOnInvestment: 0,
        openPosition: true
      };
      const expectedClosedPosition: WhiskeyPosition = {
        whiskeyId: twoTrades[0].whiskeyId,
        numberOfBottles: twoTrades[1].numberOfBottles,
        totalPurchases: twoTrades[0].pricePerBottle * twoTrades[1].numberOfBottles,
        totalSales: twoTrades[1].pricePerBottle * twoTrades[1].numberOfBottles,
        averagePricePerBottle: (twoTrades[0].pricePerBottle * twoTrades[1].numberOfBottles + twoTrades[1].pricePerBottle * twoTrades[1].numberOfBottles) / (2*twoTrades[1].numberOfBottles),
        profit: twoTrades[1].pricePerBottle * twoTrades[1].numberOfBottles - twoTrades[0].pricePerBottle * twoTrades[1].numberOfBottles,
        currentMarketPricePerBottle: twoTrades[0].pricePerBottle,
        profitPerBottle: (twoTrades[1].pricePerBottle * twoTrades[1].numberOfBottles - twoTrades[0].pricePerBottle * twoTrades[1].numberOfBottles) / twoTrades[1].numberOfBottles,
        returnOnInvestment: (twoTrades[1].pricePerBottle * twoTrades[1].numberOfBottles - twoTrades[0].pricePerBottle * twoTrades[1].numberOfBottles) / (twoTrades[0].pricePerBottle * twoTrades[1].numberOfBottles),
        openPosition: false
      }
      const openPositions = positions.filter(p => p.openPosition);
      const closedPositions = positions.filter(p => !p.openPosition);

      expect(openPositions).toEqual([expectedOpenPosition]);
      expect(closedPositions).toEqual([expectedClosedPosition]);
    });

    prepareRequest(httpMock, "GET", env.api.serverUrl + "/api/data/whiskeyprices", whiskeyPrices);
    prepareRequest(httpMock, "GET", env.api.serverUrl + "/api/data/whiskeytrades", twoTrades);

    httpMock.verify();
  });

  it('should calculate position from no trades', () => {
    service.getPositions().then(positions => {
      expect(positions).toEqual([]);
    });

    prepareRequest(httpMock, "GET", env.api.serverUrl + "/api/data/whiskeyprices", whiskeyPrices);
    prepareRequest(httpMock, "GET", env.api.serverUrl + "/api/data/whiskeytrades", []);

    httpMock.verify();
  });

});

function prepareRequest(httpMock: HttpTestingController, method: string, url: string, output: any): void {
  const request = httpMock.expectOne(url);
  expect(request.request.method).toBe(method);
  request.flush(output);
}