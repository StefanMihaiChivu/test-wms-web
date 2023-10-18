import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Inventory',
                icon: 'pi pi-box',
                items: [
                    {
                        label: 'Manage Items',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/items']
                    }
                ]
            },
            {
                label: 'User Management',
                icon: 'pi pi-users',
                items: [
                    {
                        label: 'Users ',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/users']
                    }
                ]
            }
        ];
    }
}
