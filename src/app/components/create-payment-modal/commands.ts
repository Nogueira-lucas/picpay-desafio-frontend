export function update() {
    this.service.updateBy(this.data.id, this.form.value)
    .subscribe(res => {
      this.isLoading = true
    }, err => {
      this.isLoading = false
      this.snackBar.open('erro ao atualizar', 'fechar', { duration: 3000})
    }, () => {
      this.isLoading = false
      this.dialogRef.close()
      this.snackBar.open('pagamento atualizado com sucesso', 'fechar', { duration: 3000})
    })
}

export function create() {
    this.service.createPayment(this.form.value)
    .subscribe(res => {
      this.isLoading = true
    }, err => {
      this.isLoading = false
      this.snackBar.open('erro ao salvar', 'fechar', { duration: 3000})
    }, () => {
      this.isLoading = false
      this.dialogRef.close()
      this.snackBar.open('pagamento gravado com sucesso', 'fechar', { duration: 3000})
    })
}