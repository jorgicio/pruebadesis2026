document.querySelectorAll('[class="required"]').forEach(campo => {
    campo.addEventListener('blur', function() {
        if(this.value.trim() === '' || (this.tagName === 'SELECT' && (this.value === '' || this.value === '0'))) {
            this.classList.add('campo-error');
        } else {
            this.classList.remove('campo-error');
        }
    });
});