import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ItemService } from '../../../core/services';
import { Item } from '../../../core/models';


@Component({
  selector: 'wms-item-form',
  templateUrl: './item-form.component.html',
})
export class ItemFormComponent {
  editMode = false;
  form: FormGroup;
  isSubmited = false;
  currentItemId = -1;

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.itemService
          .getItemById(params['id'])
          .subscribe((item: Item) => {
            this.currentItemId = params['id'];
            this.itemForm['title'].setValue(item.title);
            this.itemForm['description'].setValue(item.description);
            this.itemForm['price'].setValue(item.price);
            this.itemForm['stock'].setValue(item.stock);
            this.itemForm['category'].setValue(item.category);
            this.itemForm['thumbnail'].setValue(item.thumbnail);
          });
      }
    });
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      category: ['', Validators.required],
      thumbnail: [''],
    });
  }

  get itemForm() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }
    const item: Item = {
      id: this.currentItemId,
      title: this.itemForm['title'].value,
      description: this.itemForm['description'].value,
      price: this.itemForm['price'].value,
      stock: this.itemForm['stock'].value,
      category: this.itemForm['category'].value,
      thumbnail: this.itemForm['thumbnail'].value,
    };
    if (this.editMode) {
      this.itemService.editItem(item).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Item updated succesfully',
        });
        timer(2000)
          .toPromise()
          .then(() => this.location.back());
      });
    } else {
      this.itemService.addItem(item).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'New item was added succesfully',
        });
        timer(1000)
          .toPromise()
          .then(() => this.location.back());
      });
    }
  }
  onCancel() {
    this.location.back();
  }
}
