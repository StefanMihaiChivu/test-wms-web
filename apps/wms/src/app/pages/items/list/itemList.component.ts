import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ItemService, UserService } from '../../../core/services';
import { ActivatedRoute } from '@angular/router';
import { Item, User } from '../../../core/models';
import { MenuItem } from 'primeng/api';
import { take } from 'rxjs';
import * as chartUtils from '../../../utils/chartUtils';
import * as utils from '../../../utils/utils';

@Component({
  selector: 'wms-item',
  templateUrl: './itemList.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .item-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
})
export class ItemListComponent implements OnInit {
  itemDialog = false;

  items: Item[] = [];

  filteredItems: Item[] = [];

  workingItem: Item = new Item();

  selectedItems: Item[] = [];

  isItemSubmitted = true;

  isItemTableLoading = false;

  stockValuesFilterRange: number[] = [0, 100];

  layoutPanelRatio = [99, 1];

  toggleVisualiser = false;

  pieChartData: any;
  pieChartOptions: any;
  pieChartLabels: string[] = [];

  userName = '';

  menuItems = [
    {
      label: 'Inventory',
      items: [
        {
          label: 'Update',
          icon: 'pi pi-refresh',
          command: () => {
            // this.update();
          },
        },
        {
          label: 'Delete',
          icon: 'pi pi-times',
          command: () => {
            this.deleteSelectedItems();
          },
        },
      ],
    },
    {
      label: 'Transfer',
      items: [
        {
          label: 'Transfer to ...',
          icon: 'pi pi-upload',
        },
      ],
    },
  ];

  constructor(
    private itemService: ItemService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.userService.initAppSession();
    this.isItemTableLoading = true;
    this.itemService.getItem().subscribe((result) => {
      this.items = result.products;
      this.filteredItems = result.products;
      this.populateChart();
      this.isItemTableLoading = false;
    });
    
  }

  openNewItemDialog() {
    this.workingItem = new Item();
    this.isItemSubmitted = false;
    this.itemDialog = true;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected items?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.filteredItems = this.items.filter(
          (val) => !this.selectedItems.includes(val)
        );
        this.selectedItems = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Items Deleted',
          life: 3000,
        });
      },
    });
  }

  editItem(item: Item) {
    this.workingItem = { ...item };
    this.itemDialog = true;
  }

  deleteItem(item: Item) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + item.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.filteredItems = this.items.filter((val) => val.id !== item.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Item Deleted',
          life: 3000,
        });
      },
    });
  }

  hideItemDialog() {
    this.itemDialog = false;
    this.isItemSubmitted = false;
  }

  saveItem() {
    this.isItemSubmitted = true;

    if (
      this.workingItem.title?.trim() &&
      this.workingItem.description?.trim() &&
      this.workingItem.price &&
      Number.isFinite(this.workingItem.stock)
    ) {
      if (this.workingItem.id) {
        this.items[this.items.findIndex(item => item.id === this.workingItem.id)] = this.workingItem;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Item Updated',
          life: 3000,
        });
      } else {
        this.workingItem.thumbnail = './assets/images/no-image.svg';
        this.workingItem.category = 'dummy';
        this.items.push(this.workingItem);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Item Created',
          life: 3000,
        });
      }

      this.items = [...this.items];
      this.filteredItems = [...this.items];
      this.itemDialog = false;
      this.workingItem = new Item();
    }
  }

  populateChart(data: Item[] = this.filteredItems) {
    
    const chartData: number[] = [];
    this.pieChartLabels = [];

    const groupedKeys = utils.groupItemsByCategory(data);

    Object.entries(groupedKeys).forEach(([key, value]) => {
      chartData.push(value.length);
      this.pieChartLabels.push(key);
    });
    this.pieChartData = chartUtils.populateChart(this.pieChartLabels, chartData);

    this.pieChartOptions = chartUtils.getDefaultPieChartPlugins();
  }

  syncChartWithDataTable(event: any) {
    this.populateChart(event.filteredValue);
  }

  syncDataTableWithChart(event: any) {
    this.isItemTableLoading = true;
    const selectedChartCategory = this.pieChartLabels[event.element.index];
    this.filteredItems = this.items.filter(
      (item) => item.category === selectedChartCategory
    );
    this.isItemTableLoading = false;
  }

  toggleVisualiserPanel() {
    this.toggleVisualiser = !this.toggleVisualiser;
    this.layoutPanelRatio = this.toggleVisualiser ? [75, 25] : [99, 1];
  }
}
