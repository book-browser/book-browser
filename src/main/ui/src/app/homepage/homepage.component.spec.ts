import { TestBed, ComponentFixture, fakeAsync, tick } from "@angular/core/testing";
import { HomepageComponent } from './homepage.component';
import { UserService } from '../services/user.service';
import { Principal } from '../entities/principal';
import { of } from 'rxjs';
import { BookService } from '../services/book.service';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutofocusFixModule } from 'ngx-autofocus-fix';

describe('HomepageComponent', () => {
    let component: HomepageComponent;
    let fixture: ComponentFixture<HomepageComponent>;
    let userServiceSpy;
    let bookServiceSpy;
    let principal: Principal;

    beforeEach(() => {
        userServiceSpy = jasmine.createSpyObj('UserService', ['login', 'getPrincipal']);
        bookServiceSpy = jasmine.createSpyObj('BookService', ['findByTitleContaining']);
        
        TestBed.configureTestingModule({
            declarations: [HomepageComponent],
            providers: [
                { provide: UserService, useValue: userServiceSpy },
                { provide: BookService, useValue: bookServiceSpy }
            ],
            imports: [
                NgbModule,
                FormsModule,
                AutofocusFixModule.forRoot(),
            ]
        });
        fixture = TestBed.createComponent(HomepageComponent);
        component = fixture.componentInstance;
        principal = require('../../fixtures/principal.json');
    });

    it('should initialize', fakeAsync(() => {
        userServiceSpy.getPrincipal.and.returnValue(of(principal));

        fixture.detectChanges();
        tick();

        expect(component.principal).toEqual(principal);
    }));
})