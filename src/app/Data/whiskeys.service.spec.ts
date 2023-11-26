import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';
import { Whiskey } from '../entities';
import { NotificationsService } from '../notifications.service';
import { environment as env } from '../../environments/environment';
import { WhiskeysService } from './whiskeys.service';
import { WhiskeyPricesService } from './whiskey-prices.service';
import { Subscription } from 'rxjs';

describe('Whiskeys Service', () => {
  let service: WhiskeysService;
  let httpMock: HttpTestingController;
  let notificationsService: NotificationsService;

  const whiskey1: Whiskey = {
    id: '1',
    name: 'whiskey1',
    distiller: 'distiller1',
    description: 'description',
    updated: new Date(),
    created: new Date(),
    active: true
  };

  const dummyWhiskeys: Whiskey[] = [
    whiskey1,
    {
      id: '2',
      name: 'inactive whiskey',
      distiller: 'distiller1',
      description: 'description',
      updated: new Date(),
      created: new Date(),
      active: false
    },
    {
      id: '3',
      name: 'whiskey3',
      distiller: 'distiller1',
      description: 'description',
      updated: new Date(),
      created: new Date(),
      active: true
    },

  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [WhiskeysService, WhiskeyPricesService, NotificationsService]
    });

    service = TestBed.inject(WhiskeysService);
    httpMock = TestBed.inject(HttpTestingController);

    notificationsService = TestBed.inject(NotificationsService);
    jest.spyOn(notificationsService, "showError");
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('list whiskeys', () => {
    const sub = service.list().subscribe(whiskeys => {
      expect(whiskeys.length).toBe(3);
      expect(whiskeys.filter(w => w.active).length).toBe(2);
    })

    const request = httpMock.expectOne(env.api.serverUrl + "/api/data/whiskeys");
    expect(request.request.method).toBe("GET");
    request.flush(dummyWhiskeys);
    httpMock.verify();
    sub.unsubscribe();
  });

  it('create new ids', () => {
    const results: string[] = [];
    for (var i = 0; i < 100; i++) {
      results.push(service.getNewId());
    }
    results.forEach(id => expect(results.filter(i => i == id).length).toBe(1));
  });

  it('add new whiskey', () => {
    service.list().pipe(take(1)).subscribe(ws => {

      service.new("New whiskey").subscribe(w => {
        expect(w.name).toBe("New whiskey")
        service.list().pipe(take(1)).subscribe(whiskeys => {
          expect(whiskeys.length).toBe(4);
        });
      });
      
    });

    const request = httpMock.expectOne(env.api.serverUrl + "/api/data/whiskeys");
    expect(request.request.method).toBe("GET");
    request.flush(dummyWhiskeys);

    const request2 = httpMock.expectOne(env.api.serverUrl + "/api/data/whiskeys");
    expect(request2.request.method).toBe("PUT");
    request2.flush(request2.request.body);

    httpMock.verify();
  });

  it('name found', () => {
    service.name("1").then(name => {
      console.log(name);
      expect(name).toBe("whiskey1");
    });
    const request = httpMock.expectOne(env.api.serverUrl + "/api/data/whiskeys");
    expect(request.request.method).toBe("GET");
    request.flush(dummyWhiskeys);
    httpMock.verify();
  });

  it('name not found', () => {
    service.name("unknown").then(name => {
      console.log(name);
      expect(name).toBe("");
    });
    const request = httpMock.expectOne(env.api.serverUrl + "/api/data/whiskeys");
    expect(request.request.method).toBe("GET");
    request.flush(dummyWhiskeys);
    httpMock.verify();
  });

  it('get a specific whiskey', () => {
    service.get("1").subscribe(whiskey => {
      expect(JSON.stringify(whiskey)).toBe(JSON.stringify(whiskey1));
    });
    const request = httpMock.expectOne(env.api.serverUrl + "/api/data/whiskeys/1");
    expect(request.request.method).toBe("GET");
    request.flush(dummyWhiskeys);
    httpMock.verify();
  });


  it('delete whiskey', () => {
    const originalJSON: string = JSON.stringify(whiskey1);
    service.delete(whiskey1).subscribe(whiskey => {
      expect(whiskey.active).toBeFalsy();
      whiskey.active = true;
      expect(JSON.stringify(whiskey)).toBe(originalJSON);
    });

    const request2 = httpMock.expectOne(env.api.serverUrl + "/api/data/whiskeys");
    expect(request2.request.method).toBe("PUT");
    request2.flush(request2.request.body);
    httpMock.verify();
  });

  it('get whiskey that doesnt exist', () => {
    const duffId = "unknown-id";
    const url = env.api.serverUrl + "/api/data/whiskeys/" + duffId;

    service.get(duffId).subscribe(response => expect(response).toBeUndefined());
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe("GET");
    const operation = 'get';
    const errorMessage = 'Object not found';
    const statusCode = 404;
    const statusText = 'Not found';
    const notificationMessage = `${operation} failed: Http failure response for ${url}: ${statusCode} ${statusText}`;
    request.flush(errorMessage, { status: statusCode, statusText: statusText});
    httpMock.verify();
    expect(notificationsService.showError).toHaveBeenCalledWith(notificationMessage);
  });

});
