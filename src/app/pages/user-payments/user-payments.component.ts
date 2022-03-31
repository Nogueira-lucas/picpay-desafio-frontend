import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { PaymentService } from 'src/app/services/payments/payment.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Page } from 'src/app/model/util';

@Component({
  selector: 'app-user-payments',
  templateUrl: './user-payments.component.html',
  styleUrls: ['./user-payments.component.scss']
})
export class UserPaymentsComponent implements OnInit {
  isFilterCollapsed: boolean = false;
  loading: boolean = true;
  loadingModal: boolean = false;
  selectedPayment: any;
  submitted: boolean = false;
  modalActionText: string;
  page: Page = new Page();
  rows: any = [];
  filterForm: FormGroup;
  paymentForm: FormGroup;
  openModal?: BsModalRef;
  @ViewChild('mdStickUpCreate') mdStickUpCreate: TemplateRef<any>;
  @ViewChild("modalError") modalError: TemplateRef<any>;
  @ViewChild("mdStickUpDelete") mdStickUpDelete: TemplateRef<any>;
  @ViewChild("mdStickUpFeedback") mdStickUpFeedback: TemplateRef<any>;
  
  
  constructor(public authenticationService: AuthenticationService, private paymentService: PaymentService, private modalService: BsModalService, private formBuilder: FormBuilder) {
    this.page.size = 10;
    this.paymentForm = this.formBuilder.group({
      id: null,
      name: [null, Validators.compose([Validators.required])],
      username: null, 
      title: [null, Validators.compose([Validators.required])],
      value: [null, Validators.compose([Validators.required])],
      date: [new Date(), Validators.compose([Validators.required])],
      image: null,
      isPayed: false
    });
    this.filterForm = this.formBuilder.group({
      name: null,
      title: null,
      dateRange: null,
      minValue: null,
      maxValue: null
    });
  }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.doSearch();
  }

  doSearch() {
    this.loading = true;
    this.paymentService.getListPaginated(this.filterForm.getRawValue(), this.page).subscribe((pagedData: any) => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
      this.loading = false;
    });
  }

  logout() {
    this.authenticationService.logout();
  }

  showModalUpdate(item) {
    this.paymentForm.patchValue({
      id: item.id,
      name: item.name,
      username: item.username,
      title: item.title,
      value: item.value,
      date: new Date(item.date),
      image: item.image,
      isPayed: item.isPayed
    })
    this.openModal = this.modalService.show(this.mdStickUpCreate);
  }
  showModalCreate() {
    this.resetForm();
    this.submitted = false;
    this.openModal = this.modalService.show(this.mdStickUpCreate);
  }

  addUpdatePayment() {
    this.submitted = true;
    if (this.paymentForm.valid) {
      this.paymentForm.disable();
      this.loadingModal = true;
      if(this.paymentForm.value['id'] > 0){
        this.paymentService.updatePayment(this.paymentForm.getRawValue()).subscribe(() => {
          this.submitted = false;
          this.paymentForm.enable();
          this.search();
          this.showFeedback("Pagamento atualizado");
        }, err => {
          this.paymentForm.enable();
          this.showFeedback("Erro ao atualizar pagamento");
        });
        return;
      }
      let randomUserName = this.generateUsername(this.paymentForm.value['name']);
      this.paymentForm.patchValue({
        username: randomUserName,
        image: "https://robohash.org/" + randomUserName + ".png?size=150x150&set=set1"
      })
      this.paymentService.createPayment(this.paymentForm.getRawValue()).subscribe(() => {
        this.submitted = false;
        this.paymentForm.enable();
        this.search();
        this.showFeedback("Pagamento cadastrado");
      }, err => {
        this.paymentForm.enable();
        this.showFeedback("Erro ao cadastrar pagamento");
      });
      
    }
  }

  delete() {
    this.loadingModal = true;
    this.paymentService.deletePayment(this.selectedPayment).subscribe(response => {
      this.search();
      this.showFeedback("Pagamento excluído");
    }, err => {
      this.showFeedback("Erro ao excluir pagamento");
    });
  }

  showModalDelete(item) {
    this.selectedPayment = item;
    this.openModal = this.modalService.show(this.mdStickUpDelete);
  }

  showFeedback(action: string) {
    this.openModal.hide();
    this.loadingModal = false;
    this.modalActionText = action;
    this.openModal = this.modalService.show(this.mdStickUpFeedback);
  }

  resetForm() {
    this.paymentForm.patchValue({
      id: null,
      name: null,
      username: null,
      title: null,
      value: 0,
      date: null,
      image: null,
      isPayed: false
    });
  }

  getFormControl(name) {
    return this.paymentForm.controls[name];
  }

  toggleFilter() { 
    this.isFilterCollapsed = !this.isFilterCollapsed;
  }

  generateUsername(name: string): string {
    let formatted = name.replace(/[&/\\#,+()$~%._@'":*?<>{}]/g, "");
    formatted = formatted.replace(/\s/g, '').toLocaleLowerCase();
    return formatted + Math.random().toString(36).slice(2, 9);
  }

}
