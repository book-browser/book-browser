import { UserService } from "./user.service";
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Principal } from '../entities/principal';

describe('UserService', () => {
    let userService: UserService;
    let httpTestingController: HttpTestingController;
    let principal: Principal;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService],
            imports: [
                HttpClientTestingModule
            ],
        });

        userService = TestBed.get(UserService);
        httpTestingController = TestBed.get(HttpTestingController);

        principal = require('../../fixtures/principal.json');
    });

    it('should get principal', () => {
        userService.getPrincipal().subscribe(actualPrincipal => {
            expect(actualPrincipal).toEqual(principal);
        });
        
        const testRequest = httpTestingController.expectOne('/api/principal');
        
        expect(testRequest.request.method).toEqual('GET');
        
        testRequest.flush(principal);
    });

    it('should login', () => {
        const username = "admin";
        const password = "admin";

        userService.login(username, password).subscribe(actualPrincipal => {
            expect(actualPrincipal).toEqual(principal);
        });

        const testRequest = httpTestingController.expectOne('/api/login');

        expect(testRequest.request.method).toEqual('POST');
        expect(testRequest.request.body).toEqual({ username, password });

        testRequest.flush(principal);
    });
});