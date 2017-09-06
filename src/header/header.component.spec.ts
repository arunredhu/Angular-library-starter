import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppHeaderComponent } from './header.component';

describe(`AppHeaderComponent`, () => {

    let headerComponent: AppHeaderComponent;
    let fixture: ComponentFixture<AppHeaderComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppHeaderComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppHeaderComponent);
        headerComponent = fixture.componentInstance;

    }));

    it('should create the AppHeaderComponent', async(() => {
        expect(headerComponent).toBeTruthy();
    }));

    it('should display the App Header', async(() => {
        de = fixture.debugElement.query(By.css('.header'));
        el = de.nativeElement;
        expect(el.textContent).toContain('App Header');
    }));

});
